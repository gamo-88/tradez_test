import React, { useCallback, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { setCurrentUser, User } from "@/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import axios from "axios";
import { router } from "expo-router";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (
    username: string,
    email: string,
    phone: string,
    address: string,
    bio: string
  ) => void;
}

export default function EditProfileModal({
  visible,
  onClose,
  onSave,
}: EditProfileModalProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedPhone, setEditedPhone] = useState(user.phone);
  const [editedAddress, setEditedAddress] = useState(user.address);
  const [editedBio, setEditedBio] = useState(user.bio);
  const [allUser, setAllUser] = useState<User[]>([]);

  // const handleSave = () => {
  //   // Save the edited data, including the profile picture URI
  //   onSave(editedUsername, editedEmail, editedPhone, editedAddress, editedBio);
  //   onClose(); // Close the modal
  // };

  const getApiUrl = () => {
    if (Platform.OS === "web") {
      // Utilisation de localhost pour le web
      return "http://localhost:3000";
    }

    return process.env.EXPO_PUBLIC_IP_API_URL;
  };

  async function getAllUsername() {
    try {
      const response = await axios.get(`${getApiUrl()}/users`);
      console.log(response.data);
      setAllUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  let currentUserData = allUser.find(
    (userData) => userData.username === user.username
  );
  console.log(currentUserData?.id);

  const updateProfileData = async () => {
    try {
      const response = await axios.patch(
        `${getApiUrl()}/users/${currentUserData?.id}`,
        {
          username: editedUsername,
          email: editedEmail,
          phone: editedPhone,
          address: editedAddress,
          bio: editedBio,
        }
      );
      console.log(response.status);
      if (response.status === 200) {
        dispatch(
          setCurrentUser({
            id: user.id,
            username: editedUsername,
            email: editedEmail,
            isConnected: true,
            password: user.password,
            phone: editedPhone,
            address: editedAddress,
            bio: editedBio,
          })
        );
        onSave(
          editedUsername,
          editedEmail,
          editedPhone,
          editedAddress,
          editedBio
        );
        onClose();
        router.push("/application");
      }
    } catch (error) {
      alert(`Transaction error: ${error}`);
      Alert.alert(`Transaction error: ${error}`);
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (visible) {
        getAllUsername();
      }
    }, [visible])
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
          <Text className="text-xl font-bold mb-4">Edit Profile</Text>

          {/* Edition du nom */}
          <Text className="mb-2">Username</Text>
          <TextInput
            value={editedUsername}
            onChangeText={setEditedUsername}
            className="border border-gray-400 p-3 rounded-lg mb-4"
          />

          {/* Edition de l'email */}
          <Text className="mb-2">Email</Text>
          <TextInput
            value={editedEmail}
            onChangeText={setEditedEmail}
            className="border border-gray-400 p-3 rounded-lg mb-4"
          />

          {/* Edition du téléphone */}
          <Text className="mb-2">Phone</Text>
          <TextInput
            value={editedPhone}
            onChangeText={setEditedPhone}
            className="border border-gray-400 p-3 rounded-lg mb-4"
          />

          {/* Edition de l'adresse */}
          <Text className="mb-2">Address</Text>
          <TextInput
            value={editedAddress}
            onChangeText={setEditedAddress}
            className="border border-gray-400 p-3 rounded-lg mb-4"
          />

          {/* Edition du bio */}
          <Text className="mb-2">Bio</Text>
          <TextInput
            value={editedBio}
            onChangeText={setEditedBio}
            className="border border-gray-400 p-3 rounded-lg mb-4"
          />

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={updateProfileData}
              className="bg-blue-500 p-3 rounded-xl w-1/2 mr-2"
            >
              <Text className="text-white text-center">Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-700 p-3 rounded-xl w-1/2"
            >
              <Text className="text-white text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
