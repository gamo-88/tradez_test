import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import Input from "../common/input";
import Button from "../common/button";
import { router } from "expo-router";
import axios from "axios";

import { useDispatch } from "react-redux"; // Importer useDispatch
import { setCurrentUser } from "../../userSlice"; // Importer l'action
import { validateForm } from "@/helper/validatorSignIn";
import { getApiUrl } from "@/helper/getApiUrl";

export default function SignInForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch(); // Initialiser le dispatch

  // Fonction pour obtenir l'URL API en fonction de la plateforme

  // Fonction de soumission du formulaire
  const handleSubmit = async () => {
    if (validateForm(userName, password)) {
      try {
        const response = await axios.get(
          `${getApiUrl()}/users?username=${userName}`
        );
        console.log(response.status);
        if (response.data.length === 0) {
          Alert.alert("Wrong credentials", "No user found with this username.");
        } else {
          const user = response.data[0];

          // verifi le mot de passe

          if (user.password === password) {
            // le mot de passe  correct
            dispatch(
              setCurrentUser({
                id: user.id,
                username: user.username,
                email: user.email,
                password: "",
                phone: "Not define yet",
                address: "Not define yet",
                bio: "Not define yet",
                isConnected: true,
              })
            );
            router.push("/application");
          } else {
            Alert.alert("Wrong credentials", "Incorrect password.");
          }
        }
      } catch (error) {
        console.log(error);
        Alert.alert(
          "Error",
          "An error occurred while processing your request."
        );
      }
    }
  };

  return (
    <View className="flex flex-col w-[90%] md:w-[512px] gap-5 border border-blue-600 rounded pt-8 p-5">
      <Input
        icon={<Ionicons name="person-outline" size={28} />}
        value={userName}
        placeholder="Name"
        onChangeText={(value: string) => setUserName(value)}
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
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={28}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Button
        title="Connect"
        onPress={handleSubmit}
        buttonStyleInTailwind="bg-blue-600  p-3 mt-8 rounded-xl"
        textStyleInTailwind="text-white text-xl text-center font-bold"
      />

      <Text className="text-slate-600">
        Don't have an account?{" "}
        <Text
          onPress={() => router.push("/(auth)/sign-up")}
          className="text-blue-600 font-bold"
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
}
