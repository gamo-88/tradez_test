import { Platform } from "react-native";

 export const getApiUrl = () => {
    if (Platform.OS === "web") {
      return "http://localhost:3000"; 
    }
    // Pour mobile, utilisez l'IP locale de votre machine
    return process.env.EXPO_PUBLIC_IP_API_URL; 
  };