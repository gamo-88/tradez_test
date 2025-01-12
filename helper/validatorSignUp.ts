import { User } from "@/userSlice";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { getApiUrl } from "./getApiUrl";

  const [allUser, setAllUser] = useState<User[]>([]);


 export async function getAllUsername() {
    try {
      const response = await axios.get(`${getApiUrl()}/users`,);
      console.log(response.data);
      setAllUser(response.data)
    } catch (error) {
      console.error(error);
    }
  }
   export const validateFormSignUp = (userName: string, email: string, password: string) => {
        if (!userName) {
          Alert.alert("Validation Error: ", "Please enter your name.");
          alert("Validation Error: Please enter your name.")
          return false;
        }

        if (!email || !validateEmail(email)) {
          Alert.alert("Validation Error: ", "Please enter a valid email.");
          alert("Validation Error: Please enter a valid email.");
          return false;
        }

        if (!password || password.length < 6) {
          Alert.alert("Validation Error", "Password must be at least 6 characters.");
          alert("Validation Error: Password must be at least 6 characters.");
          return false;
        }

        let nameUsed = allUser.find( user => user.username === userName )
        if (nameUsed) {
            Alert.alert("No luck", "This username is taken");
            alert("The user name is already taken");
            return false;
        }


        return true;
      };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };