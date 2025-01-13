import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/common/screenWrapper";
import Button from "@/components/common/button";
import GoBackButton from "@/components/common/goBackButton";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const logoUrl = require("../assets/images/tradePic4.webp");
  const bannerUrl = require("../assets/images/tradePict2.png");

  const router = useRouter();
  return (
    <ScreenWrapper>
      {/* entete */}
      <View className="md:flex md:flex-row md:justify-between px-4">
        {/* logo avec text */}
        <View className=" flex-col items-center">
          <Pressable onPress={() => router.push("/")}>
            <Image
              source={logoUrl}
              resizeMode="cover"
              className="h-20 w-20 md:h-7 md:w-7"
            />
            <Text className="text-3xl font-bold text-blue-600  text-center">
              TRADEZ
            </Text>
          </Pressable>
        </View>
        {/* bouton pour aller a la page de connexion */}
        <View className="flex-row gap-4 items-baseline justify-start mt-2">
          <Button
            title="Sign In"
            onPress={() => router.push("/(auth)/sign-in")}
            buttonStyleInTailwind="hover:bg-blue-600  w-[40%]  border border-blue-600  rounded md:w-fit md:h-fit"
            textStyleInTailwind="text-blue-600 p-3  text-xl text-center font-bold hover:text-white"
          />
          <Button
            title="Sign-Up"
            onPress={() => router.push("/(auth)/sign-up")}
            buttonStyleInTailwind="bg-blue-600 hidden sm:block p-3 w-[40%]  my-2  rounded md:w-fit md:h-fit"
            textStyleInTailwind="text-white text-xl text-center font-bold"
          />
        </View>
      </View>

      {/* banner and litle text */}
      <View className="px-4  mt-4 flex flex-col items-center">
        <Image
          source={bannerUrl}
          className="w-[300px] h-[200px] object-cover"
        />
        <View>
          <Text className="text-2xl font-medium text-center text-slate-600">
            Tradez is a trading web application, which is good, save, secure and
            more.
          </Text>
        </View>
        <View className="flex flex-col items-center">
          <Text className="text-center text-lg">So let's earn more..</Text>
          <Button
            title="Start Now"
            onPress={() => router.push("/(auth)/sign-up")}
            buttonStyleInTailwind="bg-blue-600  p-3 w-[40%] my-2  rounded md:w-fit md:h-fit"
            textStyleInTailwind="text-white text-xl text-center font-bold"
          />
          <Text className="text-center font-bold text-lg mt-6">
            You are Welcome.
          </Text>
        </View>
      </View>
    </ScreenWrapper>
  );
}
