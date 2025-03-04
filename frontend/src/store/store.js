import {create} from 'zustand';
const tab = localStorage.getItem('activeTab') || 'task';
export const useStore = create((set) => ({
    activeTab: tab ,
    setActiveTab:(tab)=>{
         localStorage.setItem('activeTab',tab)
        set({activeTab:tab})
    },
}));