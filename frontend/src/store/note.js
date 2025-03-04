import {create} from 'zustand';
import axios from 'axios';
const BASE_URL = "http://localhost:3000";

export const useNoteStore = create((set) => ({
    note :[],
    loading : false,
    error : null,
    setNotes : (note) => set({note}),
    fetchNotes : async () => {
        set({loading:true});
        try {
            const {data} = await axios.get(`${BASE_URL}/api/notes`);
            set({note:data,error:null});
        } catch (err) {
            console.log(err);
            set({error:"Something went wrong",note:[]});
        }finally{
            set({loading:false});
        }
    },
}));