import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Platform, TextInput, Modal } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import ScreenWrapper from "@/components/common/screenWrapper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import SeeProfileModal from "@/components/profileComponents/SeeProfileModal";
import EditProfileModal from "@/components/profileComponents/EditProfileModal";

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigation();





    // États pour gérer l'affichage des modales
    const [isProfileModalVisible, setProfileModalVisible] = useState(false);
    const [isEditModalVisible, setEditModalVisible] = useState(false);
  
    // États pour gérer l'édition des informations
    const [editedUsername, setEditedUsername] = useState(user.username);
    const [editedEmail, setEditedEmail] = useState(user.email);
  
    const handleLogout = () => {
      console.log("Déconnexion...");
    };
  
    // Fonction pour gérer l'ouverture/fermeture de la modal de profil
    const toggleProfileModal = () => setProfileModalVisible(!isProfileModalVisible);
  
    // Fonction pour gérer l'ouverture/fermeture de la modal d'édition
    const toggleEditModal = () => setEditModalVisible(!isEditModalVisible);
  
    const handleSaveEdits = () => {
      // Sauvegarder les modifications de l'utilisateur ici (vous pouvez ajouter une action Redux ou appeler une API)
      console.log("Informations modifiées", { username: editedUsername, email: editedEmail });
      setEditModalVisible(false);
    };









  return (
    <ScreenWrapper>
      <View className="flex-1 items-center justify-center bg-gray-100 px-4 py-8">
        {/* Image de profil */}
        <View className="mb-5 h-[150px] w-[150px] bg-slate-400 rounded-full">
          <Image
            source={{
              uri: "https://via.placeholder.com/150", // Remplacer par l'URL de l'image de profil
            }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
            }}
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
                <Text className="text-white font-semibold text-lg">Edit Profile</Text>
                <Ionicons name="pencil" size={24} color="white" />
              </TouchableOpacity>

                            {/* mettre les user details */}
                            <TouchableOpacity
                            onPress={toggleProfileModal}
                className="flex-row items-center justify-between bg-blue-500 p-4 rounded-xl mb-4"
              >
                <Text className="text-white font-semibold text-lg">See Profile</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="white" />
              </TouchableOpacity>


                            {/* les preferences en trading */}
                            <TouchableOpacity
                className="flex-row items-center justify-between bg-blue-500 p-4 rounded-xl mb-4"
              >
                <Text className="text-white font-semibold text-lg">Preferences</Text>
                <Ionicons name="chevron-forward-outline" size={24} color="white" />
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



      {/* Modal: Voir le Profil */}
      <SeeProfileModal
        visible={isProfileModalVisible}
        onClose={toggleProfileModal}
        username={user.username}
        email={user.email}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        visible={isEditModalVisible}
        onClose={toggleEditModal}
        onSave={handleSaveEdits}
        currentUsername={user.username}
        currentEmail={user.email}
      />




    </ScreenWrapper>
  );
}
