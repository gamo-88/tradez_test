import alpacaApi from "@/services/alpaca";
import { useState, useCallback } from "react";
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";

interface Activity {
  id: string;
  symbol: string;
  side: string;
  qty: number;
  price: number;
  transaction_time: string;
}

interface PrefferencesModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SeePreferencesModal({ visible, onClose }: PrefferencesModalProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const api = alpacaApi();

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const res = await api.getActivities();
      if (res.ok) {
        setActivities(res.data); 
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  // effectuer le fetch lorsque la modale s'ouvre
  useFocusEffect(
    useCallback(() => {
      if (visible) {
        fetchActivities(); 
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
          <Text className="text-xl font-bold mb-4">My Activities</Text>

          {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

          {!isLoading && activities.length === 0 && (
            <Text className="text-center text-gray-500">No activities found.</Text>
          )}

          {activities.map((activity) => (
            <View key={activity.id} className="mb-4 p-4 border-b border-gray-300">
              <Text className="font-semibold text-lg">{activity.symbol}</Text>
              <Text>{activity.side} {activity.qty} @ ${activity.price}</Text>
              <Text className="text-sm text-gray-600">{activity.transaction_time}</Text>
            </View>
          ))}

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
