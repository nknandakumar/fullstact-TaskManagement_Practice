import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useBookMarkStore = create((set, get) => ({
  bookmark: [],
  loading: false,
  error: null,
  loaded: false,
  formData: {
    title: "",
    url: "",
    category: "personal"  // Make sure it's lowercase to match select values
  },
  
  setBookMarks: (bookmark) => set({ bookmark }),
  
  setFormData: (formData) => set((state) => ({ 
    formData: { ...state.formData, ...formData } 
  })),
  
  resetForm: () => set({
    formData: {
      title: "",
      url: "",
      category: "personal"  // Make sure it's lowercase to match select values
    }
  }),
  
  // Fetch all BookMarks
  fetchBookMarks: async () => {
    if (get().loaded) {
      console.log('Data already loaded, skipping fetch');
      return;
    }
    
    set({ loading: true, error: null });
    
    try {
      const { data } = await axios.get(`${BASE_URL}/api/bookmarks`);
      // Sort bookmarks by created date (newest first)
      const sortedBookmarks = data.sort((a, b) => 
        new Date(b.created_date) - new Date(a.created_date)
      );
      set({ bookmark: sortedBookmarks, error: null, loaded: true });
    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      set({ 
        error: err.response?.data?.message || "Failed to fetch bookmarks", 
        bookmark: [] 
      });
    } finally {
      set({ loading: false });
    }
  },

  // Add Bookmark
  addBookMark: async (e, updatedFormData = null) => {
    e.preventDefault();
    const formDataToUse = updatedFormData || get().formData;
    
    // Validation
    if (!formDataToUse.title.trim() || !formDataToUse.url.trim()) {
      set({ error: "Title and URL are required" });
      return;
    }
    
    set({ loading: true, error: null });
    
    try {
      const { data } = await axios.post(`${BASE_URL}/api/bookmarks`, formDataToUse);
      
      // Add the new bookmark to the beginning of the array (newest first)
      set((state) => ({
        bookmark: [data, ...state.bookmark],
        error: null
      }));
      
      get().resetForm();
    } catch (err) {
      console.error("Error adding bookmark:", err);
      set({ 
        error: err.response?.data?.message || "Failed to add bookmark" 
      });
    } finally {
      set({ loading: false });
    }
  },
  
  // Delete Bookmark
  deleteBookMark: async (id) => {
    if (!window.confirm("Are you sure you want to delete this bookmark?")) {
      return;
    }
    
    set({ loading: true, error: null });
    
    try {
      await axios.delete(`${BASE_URL}/api/bookmarks/${id}`);
      set((state) => ({
        bookmark: state.bookmark.filter(item => item.id !== id),
        error: null
      }));
    } catch (err) {
      console.error("Error deleting bookmark:", err);
      set({ 
        error: err.response?.data?.message || "Failed to delete bookmark" 
      });
    } finally {
      set({ loading: false });
    }
  }
}));