import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface SeeProfileModalProps {
  visible: boolean;
  onClose: () => void;
  username: string;
  email: string;
}

export default function SeeProfileModal({
  visible,
  onClose,
  username,
  email,
}: SeeProfileModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-[#000000bb] bg-opacity-70">
        <View className="bg-white w-4/5 p-6 rounded-xl">
          <Text className="text-xl font-bold mb-4">Profile Details</Text>
          <Text className="mb-2">Username: {username}</Text>
          <Text className="mb-2">Email: {email}</Text>
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
