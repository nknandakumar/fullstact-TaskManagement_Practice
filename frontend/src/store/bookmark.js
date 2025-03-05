import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useBookMarkStore = create((set,get)=>({
      bookmark : [],
      loading : false,
      error : null,
      loaded :false ,
      setBookMarks :(bookmark) => set({bookmark}),

      //fetch all BookMarks
        fetchBookMarks : async () => {
            if (get().loaded) {
                console.log('Data already loaded, skipping fetch');
                return;
              }
            set({loading:true});
            try {
                const {data} = await axios.get(`${BASE_URL}/api/bookmarks`);
                console.log(" Bookmarks  -  "+data)
                set({bookmark:data,error:null,loaded: true});
            } catch (err) {
                console.log(err);
                set({error:"Something went wrong",bookmark:[]});
            }finally{
                set({loading:false});
            }
        },
}))