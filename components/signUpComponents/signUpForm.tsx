import { View, Text, TouchableOpacity, ToastAndroid, Alert, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useRef, useState } from "react";
import Input from "../common/input";
import Button from "../common/button";
import { router } from "expo-router";
import { toast } from "sonner";
import Toast from "react-native-toast-message";
import axios from 'axios';
// import { User } from "@/store";
import { useDispatch } from 'react-redux';  
import { setCurrentUser, User } from '../../userSlice'; 
import { getApiUrl } from "@/helper/getApiUrl";
import { validateEmail } from "@/helper/validateEmail";
import { useFetchAllUsers } from "@/hooks/useFetchAllUsers";
import { useSignUpFormValidation } from "@/hooks/useSignUpFormValidation";




export default function SignUpForm() {

  const userId = Date.now().toString();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);


  const dispatch = useDispatch();





  const {allUser, loading, error} = useFetchAllUsers()

  const validateForm = useSignUpFormValidation(userName, email, password, allUser)





  // Fonction de soumission du formulaire
  const handleSubmit = async () => {
    if (validateForm()) {
        try {
            const response = await axios.post(`${getApiUrl()}/users`,{
                username: userName,
                email: email,
                password: password
             });
             console.log(response.status)
             if (response.status === 201){
              console.log(response.data)
                            dispatch(setCurrentUser({
                              id: userId,
                              username: userName,
                              email: email,
                              isConnected: true,
                              password: '',
                              phone: '-- define --',
                              address: '-- define --',
                              bio: '-- define --',
                            }));
                router.push("/application");

             }
          } catch (error) {
            console.error(error);
          }
          
    }
  };


  

  return (
    <View className=" flex flex-col w-[90%] md:w-[512px] gap-5 border border-blue-600 rounded pt-8 p-3">
      <Input
        icon={<Ionicons name="person-outline" size={28} />}
        value={userName}
        placeholder="name"
        onChangeText={(value: string) => setUserName(value)}
      />

<Input
        icon={<Ionicons name="mail-outline" size={28} />}
        value={email}
        placeholder="Email"
        onChangeText={(value: string) => setEmail(value)}
      />

      <View className="relative">
        <Input
          icon={<Ionicons name="lock-closed-outline" size={28} />}
          value={password}
          placeholder="Password"
          onChangeText={(value: string) => setPassword(value)}
          secureTextEntry={showPassword}
        />
        <TouchableOpacity
          className="absolute right-3 top-4"
          onPress={() => setShowPassword((prev: any) => !prev)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={28}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Button
        title="Create Account"
        onPress={handleSubmit}
        buttonStyleInTailwind="bg-blue-600  p-3 mt-8 rounded-xl"
        textStyleInTailwind="text-white text-xl text-center font-bold"
      />

      <Text className="text-slate-600">
        Don't have an account?
        <Text
          onPress={() => router.push("/(auth)/sign-in")}
          className="text-blue-600 font-bold"
        >
          {" "}
          Sign In
        </Text>
      </Text>

    </View>
  );
}


