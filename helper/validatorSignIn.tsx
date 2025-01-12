import { Alert } from "react-native";

  // Validation du formulaire
export  const validateForm = (userName: string, password: string) => {
    if (!userName) {
      Alert.alert("Validation Error: ", "Please enter your name.");
      return false;
    }

    if (!password || password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters.");
      return false;
    }
    return true;
  };