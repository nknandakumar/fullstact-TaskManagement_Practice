import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const useTodoStore = create((set, get) => ({
    todos: [],
    loading: false,
    error: null,
    loaded: false,
    
    formData: {
        task: '',
        priority: '',
        category: ''
    },

    setFormData: (formData) => set((state) => ({ formData: { ...state.formData, ...formData } })),

    resetFormData: () => set({ formData: { task: '', priority: '', category: '' } }),

    setTodos: (todos) => set({ todos }),

    updateData: {
        task: "",
        priority: "mid",
        category: "personal"
    },
    
    setUpdateData: (updateData) => set((state) => ({
        updateData: {...state.updateData, ...updateData}
    })),

    resetUpdateData: () => set({
        updateData: {
            task: "",
            priority: "mid",
            category: "other"
        }
    }),

    toggleTodo: async(id, completed) => {
        try {
            await axios.put(`${BASE_URL}/api/todos/${id}`, {completed})
            set((state) => ({
                todos: state.todos.map((todo) => (todo.id === id ? {...todo, completed} : todo))
            }))
        } catch (err) {
            console.log("Error in toggle method  - " + err)
        }
    },

    // Fetch all todos
    fetchTodos: async () => {
        if (get().loaded) {
            console.log('Data already loaded, skipping fetch');
            return;
        }
        set({ loading: true });
        try {
            const { data } = await axios.get(`${BASE_URL}/api/todos`);
            set({ todos: data, error: null, loaded: true });
        } catch (err) {
            console.log(err);
            set({ error: "Something went wrong", todos: [] });
        } finally {
            set({ loading: false });
        }
    },

    // Create Todo
    addTodo: async (e) => {
        e.preventDefault();
        console.log('Form data:', get().formData);

        const { task, priority, category } = get().formData;
        if (!task || !priority || !category) {
            set({ error: "All fields are required" });
            return;
        }

        const newTodo = {
            task,
            priority,
            category
        };

        set({ loading: true });

        try {
            const { data } = await axios.post(`${BASE_URL}/api/todos`, newTodo);
            set({ todos: [data, ...get().todos], error: null });
            get().resetFormData();
        } catch (err) {
            console.log(err);
            set({ error: "Something went wrong" });
        } finally {
            set({ loading: false });
        }
    },

    ModifyTodo: async (id) => {
        const todo = get().todos.find((t) => t.id === id);
        console.log("store == ", todo);
    
        if (!todo) {
            console.log("Todo not found!");
            return;
        }
    
        // Use setUpdateData to update the state
          set({updateData:todo})
    },
    
    // Update Todo
    updateTodo: async (id) => {
        const { updateData } = get();
        
        if (!updateData.task) {
            set({ error: "Task should be not empty" });
            return;
        }
        
        set({ loading: true });

        try {
            // Map the fields to what the API expects
            const { data } = await axios.put(`${BASE_URL}/api/todos/update/${id}`, {
                task: updateData.task,
                priority_category: updateData.priority,
                type_category: updateData.category
            });
            console.log("up = "+data)
            set({ 
                todos: get().todos.map((todo) => (todo.id === id ? data : todo)), 
                error: null 
            });
            get().resetUpdateData();
            get().fetchTodos()
        } catch (err) {
            console.log(err);
            set({ error: "Something went wrong" });
        } finally {
            set({ loading: false });
        }
    },

    deleteTodo: async (id) => {
        if (!window.confirm("Are you sure want to delete this bookmark?")) {
            return;
        }
        set({
            loading: true,
            error: null
        });
        try {
            await axios.delete(`${BASE_URL}/api/todos/${id}`);
            set((state) => ({
                todos: state.todos.filter(t => t.id !== id),
                error: null
            }));
        } catch (err) {
            console.log(err + "error in deleting todo");
            set({error: "something went wrong"});
        } finally {
            set({loading: false});
        }
    }
}));