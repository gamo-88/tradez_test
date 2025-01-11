import React, { useState } from "react";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (username: string, email: string) => void;
  currentUsername: string;
  currentEmail: string;
}

export default function EditProfileModal({
  visible,
  onClose,
  onSave,
  currentUsername,
  currentEmail,
}: EditProfileModalProps) {
  const [editedUsername, setEditedUsername] = useState(currentUsername);
  const [editedEmail, setEditedEmail] = useState(currentEmail);

  const handleSave = () => {
    onSave(editedUsername, editedEmail);
    onClose(); 
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-[#000000bb] bg-opacity-70">
        <View className="bg-white w-4/5 p-6 rounded-xl">
          <Text className="text-xl font-bold mb-4">Edit Profile</Text>

          {/* Champ d'édition du nom */}
          <Text className="mb-2">Username</Text>
          <TextInput
            value={editedUsername}
            onChangeText={setEditedUsername}
            className="border border-gray-400 p-3 rounded-lg mb-4"
          />

          {/* Champ d'édition de l'email */}
          <Text className="mb-2">Email</Text>
          <TextInput
            value={editedEmail}
            onChangeText={setEditedEmail}
            className="border border-gray-400 p-3 rounded-lg mb-4"
          />

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={handleSave}
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
