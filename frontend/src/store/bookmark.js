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
  
//update Form
updateData: {
  title: "",
  url: "",
  category: "personal"  // Make sure it's lowercase to match select values
},
setUpdateData: (updateData) => set((state) => ({ 
  updateData: { ...state.updateData, ...updateData } 
})),

  resetForm: () => set({
    formData: {
      title: "",
      url: "",
      category: ""  // Make sure it's lowercase to match select values
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
      set({ bookmark: data, error: null, loaded: true });
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

  fetchBookMark: async (id) => {    
    set({ loading: true, error: null });
    
    try {
      const { data } = await axios.get(`${BASE_URL}/api/bookmarks/${id}`);
      set({ updateData :data });

    } catch (err) {
      console.error("Error fetching bookmarks:", err);
      set({ 
        error: err.response?.data?.message || "Failed to fetch bookmarks", 
      
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

  //update 
  updateBookMark: async (id)=>{
      const {updateData , bookmark} = get()
      set({loading:true})
      try {
        const {data} = await axios.put(`${BASE_URL}/api/bookmarks/${id}`,updateData);
        set({bookmark:bookmark.map((b)=> (b.id === id ? data : b )),    updateData: { title: "", url: "", category: "personal" }})
     
      } catch (err) {
        console.log(err,"Error in update")
        set({error:"Failed to Update Bookmark"})
      }finally{
        set({loading:false, error:null})
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