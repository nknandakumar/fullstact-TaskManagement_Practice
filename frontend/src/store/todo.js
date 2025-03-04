import {create} from 'zustand';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';
export const useTodoStore = create((set)=>({
todos:[],
loading :false,
error:null,
setTodos:(todos)=>set({todos}),
//Fetch all todos
fetchTodos:async()=>{
    set({loading:true});
    try {
        const {data} = await axios.get(`${BASE_URL}/api/todos`);
        set({todos:data,error:null});
    } catch (err) {
        console.log(err);
        set({ error: "Something went wrong", products: [] });
    }finally{
        set({loading:false});
    }
}
}))