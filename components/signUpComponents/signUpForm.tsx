import { View, Text, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useRef, useState } from "react";
import Input from "../common/input";
import Button from "../common/button";
import { router } from "expo-router";
import { toast } from "sonner";
import Toast from "react-native-toast-message";

export default function SignUpForm() {
  const userNameRef = useRef<string>("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);


    const validateForm = () => {
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
        return true;
      };



  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  // Fonction de soumission du formulaire
  const handleSubmit = () => {
    if (validateForm()) {
      // Formulaire valide, redirection vers la page suivante
      router.push("/application");
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

      <Text>{password}</Text>
    </View>
  );
}


