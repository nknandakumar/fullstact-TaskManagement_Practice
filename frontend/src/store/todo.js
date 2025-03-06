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
            set({ todos: [...get().todos, data], error: null });
            get().resetFormData();
        } catch (err) {
            console.log(err);
            set({ error: "Something went wrong" });
        } finally {
            set({ loading: false });
        }
    },

    // Update Todo
    updateTodo: async (id) => {
        const todo = get().formData;
        set({ loading: true });

        try {
            const { data } = await axios.put(`${BASE_URL}/api/todos/${id}`, todo);
            set({ todos: get().todos.map((todo) => (todo.id === id ? data : todo)), error: null });
        } catch (err) {
            console.log(err);
            set({ error: "Something went wrong" });
        } finally {
            set({ loading: false });
        }
    }
}));



/**

 // Create - Add a new bookmark
  addBookMark: async () => {
    const { formData } = get();
    
    // Start loading
    set({ loading: true, error: null });
    
    try {
      // Prepare new bookmark data
  
      
      // Send to API
      const { data } = await axios.post(`${BASE_URL}/api/bookmarks`, formData);
      
      // Update state with new bookmark
      set((state) => ({ 
        bookmark: [...state.bookmark, data],
        error: null 
      }));
      
      // Reset form
      get().resetForm();
      
    } catch (err) {
      console.log(err);
      set({ error: "Failed to add bookmark" });
    } finally {
      set({ loading: false });
    }
  },





 // Delete - Remove a bookmark
  deleteBookMark: async (id) => {
    // Start loading
    set({ loading: true, error: null });
    
    try {
      // Send delete request to API
      await axios.delete(`${BASE_URL}/api/bookmarks/${id}`);
      
      // Update state by removing deleted bookmark
      set((state) => ({
        bookmark: state.bookmark.filter(b => b.id !== id),
        error: null
      }));
      
    } catch (err) {
      console.log(err);
      set({ error: "Failed to delete bookmark" });
    } finally {
      set({ loading: false });
    }
  }
}));

 */