import { create } from 'zustand'
import { createJSONStorage,persist } from 'zustand/middleware'


export interface User {
    username: string;
    email: string;
    password: string;
  }

 
export const userStore = create(persist((set) => ({
    USER: {},
    setCurrentUser: (user: User)=>set(({  USERS:{...user, isConnected: true}})),
    logOutCurrentUser: (user: User)=>set({USERS:{ isConnected: false}})
  }),
  {
    name: "utilisateur",
    storage: createJSONStorage(()=>sessionStorage)
  }
  ))

  
  export const userListStorage = create((set) => ({
    USERLIST: [], // Liste vide au départ
    removeAllUsers: () => set({ USERLIST: [] }), // Supprimer tous les utilisateurs de la liste
    addUserOnList: (user: User) => set((state: { USERLIST: any; }) => ({ USERLIST: [...state.USERLIST, user] })), // Ajouter un utilisateur à la liste
    setUserList: (newUserList: User[]) => set({ USERLIST: newUserList }),
    
  })
  )