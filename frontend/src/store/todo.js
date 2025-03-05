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
    }
}));
