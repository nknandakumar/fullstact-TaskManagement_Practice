import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const useBookMarkStore = create((set)=>({
      bookmark : [],
      loading : false,
      error : null,
      setBookMarks :(bookmark) => set({bookmark}),

      //fetch all BookMarks
        fetchBookMarks : async () => {
            set({loading:true});
            try {
                const {data} = await axios.get(`${BASE_URL}/api/bookmarks`);
                console.log(" Bookmarks  -  "+data)
                set({bookmark:data,error:null});
            } catch (err) {
                console.log(err);
                set({error:"Something went wrong",bookmark:[]});
            }finally{
                set({loading:false});
            }
        },
}))