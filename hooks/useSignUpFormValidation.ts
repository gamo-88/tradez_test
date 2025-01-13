import { Alert } from "react-native";
import { User } from "@/userSlice";
import { validateEmail } from "@/helper/validateEmail";

export const useSignUpFormValidation = (userName: string, email: string, password: string, allUser: User[]) => {
  const validateForm = () => {
    if (!userName) {
      Alert.alert("Validation Error", "Please enter your name.");
      alert("Validation Error:-Please enter your name.")
      return false;
    }

    if (!email || !validateEmail(email)) {
      Alert.alert("Validation Error", "Please enter a valid email.");
      alert("Validation Error:-Please enter a valid email.")
      return false;
    }

    if (!password || password.length < 6) {
      Alert.alert("Validation Error", "Password must be at least 6 characters.");
      alert("Validation Error:-Password must be at least 6 characters.")
      return false;
    }

    const nameUsed = allUser.find(user => user.username === userName);
    if (nameUsed) {
      Alert.alert("Username Taken", "This username is already taken.");
      alert("Username Taken:-This username is already taken.")
      return false;
    }

    return true;
  }


  return validateForm;
}