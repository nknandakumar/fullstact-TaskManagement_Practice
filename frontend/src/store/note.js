import {create} from 'zustand';
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const useNoteStore = create((set,get) => ({
    note :[],
    loading : false,
    error : null,
    loaded :false ,
    setNotes : (note) => set({note}),
    fetchNotes : async () => {
        if (get().loaded) {
            console.log('Data already loaded, skipping fetch');
            return;
          }
        set({loading:true});
        try {
            const {data} = await axios.get(`${BASE_URL}/api/notes`);
            set({note:data,error:null,loaded: true});
        } catch (err) {
            console.log(err);
            set({error:"Something went wrong",note:[]});
        }finally{
            set({loading:false});
        }
    },
}));