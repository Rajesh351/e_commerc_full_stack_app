// src/store.js
import { create } from 'zustand';

const useProductStore = create((set) => ({
  products:[],
  user:[],
  setProducts: (newProducts) => set({ products: newProducts }),
  setUser:(newUser)=>set({ user:newUser}),
}));

export default useProductStore;
