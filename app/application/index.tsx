import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Pressable,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import ScreenWrapper from "@/components/common/screenWrapper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import SeeProfileModal from "@/components/profileComponents/SeeProfileModal";
import * as ImagePicker from "expo-image-picker";
import EditProfileModal from "@/components/profileComponents/EditProfileModal";
import { logOutCurrentUser } from "@/userSlice";
import SeePreferencesModal from "@/components/profileComponents/PrefferencesModal";
import { usePickImage } from "@/hooks/usePickImage";

export default function ProfileScreen() {
  const logoUrl = require("../../assets/images/tradePic4.webp");
  
  
  
  
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // États pour gérer l'affichage des modales
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isPreferencesModalVisible, setPreferencesModalVisible] = useState(false);

  const handleLogout = () => {
    if (Platform.OS === "web") {
      const askLogout = confirm("DO YOU REALY WANT TO LOGOUT?");
      if (askLogout) {
        dispatch(logOutCurrentUser());

        // aller a signIn
        router.push("/(auth)/sign-in");
      }
    }else{
    Alert.alert(
      "LOGOUT",
      "DO YOU REALY WANT TO LOGOUT?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Log Out",
          onPress: () => {
            dispatch(logOutCurrentUser());

            // aller a signIn
            router.push("/(auth)/sign-in");
          },
        },
      ],
      { cancelable: false }
    );

  }
    // router.push("/(auth)/sign-in")
  };

  // ouverture/fermeture de la modal de profil
  const toggleProfileModal = () =>
    setProfileModalVisible(!isProfileModalVisible);

  // ouverture/fermeture de la modal edition
  const toggleEditModal = () => setEditModalVisible(!isEditModalVisible);
  const togglePrefferencesModal = () => setPreferencesModalVisible(!isPreferencesModalVisible);

  const handleSaveEdits = () => {
    console.log("Informations modifiées");
    setEditModalVisible(false);
  };

  const {pickImage, profilePicture} = usePickImage()

  return (
    <ScreenWrapper>

        {/* logo avec text */}
        <View className=" flex-col items-center">
          <Pressable onPress={() => router.push("/")}>
            <Text className="text-3xl font-bold text-blue-600  text-center">
              TRADEZ
            </Text>
          </Pressable>
        </View>


      <View className="flex-1 items-center justify-center bg-gray-100 px-4 py-2">
        {/* Image de profil */}
        <View className="mb-5 h-[12rem] w-full bg-blue-600 md:pt-12 pt-4 pl-4">
          <TouchableOpacity
            onPress={pickImage}
            className="bg-blue-500 p-2 md:p-4 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none flex justify-center items-center md:w-full w-[80%] max-w-[350px] mb-2"
          >
            <Text className="text-white text-lg sm:text-xl md:text-2xl font-semibold">
              Update Profile picture
            </Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: profilePicture
                ? profilePicture
                : "https://placekitten.com/200/200",
            }}
            className=" h-[150px] w-[150px] md:w-[300px] md:h-[300px] bg-slate-400 rounded-full"
          />
        </View>

        {/* Nom d'utilisateur */}
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          {user.isConnected ? user.username : "Invité"}
        </Text>

        {/* Email */}

        <Text className="text-gray-600 mb-5">{user.email}</Text>

        {/* Boutons */}
        <View className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 px-4">
          <>
            {/* Modifier le profil */}
            <TouchableOpacity
              onPress={toggleEditModal}
              className="flex-row items-center justify-between bg-blue-500 p-4 rounded-xl mb-4"
            >
              <Text className="text-white font-semibold text-lg">
                Edit Profile
              </Text>
              <Ionicons name="pencil" size={24} color="white" />
            </TouchableOpacity>

            {/* mettre les user details */}
            <TouchableOpacity
              onPress={toggleProfileModal}
              className="flex-row items-center justify-between bg-blue-500 p-4 rounded-xl mb-4"
            >
              <Text className="text-white font-semibold text-lg">
                See Profile
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="white"
              />
            </TouchableOpacity>

            {/* les preferences en trading */}
            <TouchableOpacity 
              onPress={togglePrefferencesModal}
            
            className="flex-row items-center justify-between bg-blue-500 p-4 rounded-xl mb-4">
              <Text className="text-white font-semibold text-lg">
                Preferences
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="white"
              />
            </TouchableOpacity>

            {/* Déconnexion */}
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center justify-between bg-red-500 p-4 rounded-xl"
            >
              <Text className="text-white font-semibold text-lg">Logout</Text>
              <Ionicons name="log-out-outline" size={24} color="white" />
            </TouchableOpacity>
          </>
        </View>
      </View>

      {/* modal voir le profil */}
      <SeeProfileModal
        visible={isProfileModalVisible}
        onClose={toggleProfileModal}
      />

      {/* modal editer le profil */}
      <EditProfileModal
        visible={isEditModalVisible}
        onClose={toggleEditModal}
        onSave={handleSaveEdits}
      />

      {/* modal voir les prefferences () */}

<SeePreferencesModal
        visible={isPreferencesModalVisible}
        onClose={togglePrefferencesModal}
      />

      
    </ScreenWrapper>
  );
}
