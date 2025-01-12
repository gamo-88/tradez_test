import { RootState } from "@/store";
import { User } from "@/userSlice";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import React, { useState, useCallback } from "react";
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import { useSelector } from "react-redux";

interface SeeProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

const getApiUrl = () => {
  // Simplification de la gestion de l'URL de l'API
  if (Platform.OS === "web") {
    return "http://localhost:3000"; // Changez-le selon votre environnement
  }
  return process.env.EXPO_PUBLIC_IP_API_URL ?? "http://localhost:3000"; // API mobile
};

export default function SeeProfileModal({ visible, onClose }: SeeProfileModalProps) {
  const user = useSelector((state: RootState) => state.user);

  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les données du profil
  const fetchProfile = useCallback(async () => {
    if (!user.username) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${getApiUrl()}/users?username=${user.username}`);
      if (response.data.length === 0) {
        setError("No user data found.");
        setUserProfile(null);
      } else {
        setUserProfile(response.data[0]); // On suppose qu'il y a un seul utilisateur avec ce nom
      }
    } catch (error) {
      setError("An error occurred while fetching the profile.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [user.username]);

  // Utilisation de useFocusEffect pour récupérer les données à l'ouverture de la modal
  useFocusEffect(
    useCallback(() => {
      if (visible) {
        fetchProfile();
      }
    }, [visible, fetchProfile])
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-[#000000bb] bg-opacity-70">
        <View className="bg-white w-4/5 md:max-w-[500px] p-6 rounded-xl">
          <Text className="text-xl font-bold mb-4">Profile Details</Text>

          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

          {error && !isLoading && (
            <Text className="text-red-500 text-center mb-4">{error}</Text>
          )}

          {!isLoading && !error && userProfile && (
            <>
              <Text className="mb-2 capitalize">Username: {userProfile.username || user.username}</Text>
              <Text className="mb-2">Email: {userProfile.email || "No email available"}</Text>
              <Text className="mb-2">Phone: {userProfile.phone || "No phone available"}</Text>
              <Text className="mb-2 capitalize">Address: {userProfile.address || "No address available"}</Text>
              <Text className="mb-2">Bio: {userProfile.bio || "No bio available"}</Text>
            </>
          )}

          <TouchableOpacity
            onPress={onClose}
            className="bg-gray-700 p-3 rounded-xl mt-4"
          >
            <Text className="text-white text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
