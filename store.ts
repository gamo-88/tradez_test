// import { create } from 'zustand'
// import { createJSONStorage,persist } from 'zustand/middleware'


// export interface User {
//     username: string;
//     email: string;
//     password: string;
//   }

 
// export const userStore = create(persist((set) => ({
//     USER: {},
//     setCurrentUser: (user: User)=>set(({  USERS:{...user, isConnected: true}})),
//     logOutCurrentUser: (user: User)=>set({USERS:{ isConnected: false}})
//   }),
//   {
//     name: "utilisateur",
//     storage: createJSONStorage(()=>sessionStorage)
//   }
//   ))

  
//   export const userListStorage = create((set) => ({
//     USERLIST: [], // Liste vide au départ
//     removeAllUsers: () => set({ USERLIST: [] }), // Supprimer tous les utilisateurs de la liste
//     addUserOnList: (user: User) => set((state: { USERLIST: any; }) => ({ USERLIST: [...state.USERLIST, user] })), // Ajouter un utilisateur à la liste
//     setUserList: (newUserList: User[]) => set({ USERLIST: newUserList }),
    
//   })
//   )





import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; 
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import storage from 'redux-persist/lib/storage'; 
import { Platform } from 'react-native';

// Détection de l'environnement (React Native ou Web)
const isWeb = Platform.OS === "web";


// Configuration de la persistance avec redux-persist
const persistConfig = {
  key: 'root', // Clé principale de persistance
  storage: isWeb ? storage : AsyncStorage , // Utilisation d'AsyncStorage pour React Native et localStorage pour le web
  whitelist: ['user'], // Indiquer que seule la slice 'user' doit être persistée
};

// Créer un reducer persistant pour la slice utilisateur
const persistedUserReducer = persistReducer(persistConfig, userReducer);

// Créer le store avec la slice persistée
export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // Utiliser le reducer persisté pour la slice 'user'
  },
});

// Créer un persistor pour gérer la persistance
export const persistor = persistStore(store);

// Types pour l'état et les dispatchs
export type RootState = ReturnType<typeof store.getState>; // Type pour l'état global
export type AppDispatch = typeof store.dispatch; // Type pour la fonction dispatch


