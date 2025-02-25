import {create} from 'zustand';

export const useStore = create((set) => ({

    activeTab:'task',
    setActiveTab:(tab)=>set({activeTab:tab}),
}));