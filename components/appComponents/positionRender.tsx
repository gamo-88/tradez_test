import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

interface Position {
  asset_id: string;
  symbol: string;
  qty: number;
  avg_entry_price: number;
  current_price: number;
  change_today: number;
}
interface PositionProps {
  item: Position;
}

export default function PositionShowRender ({ item }: PositionProps)  {
  return (
    <View key={item.asset_id} className="border-b border-gray-300 p-4">
      <View className="flex flex-row justify-between">
        <Text className="font-bold">{item.symbol}</Text>
        <Text className="font-bold">
          {item.qty} @ {item.avg_entry_price}
        </Text>
      </View>

      <View className="flex flex-row justify-between mt-2">
        <Text>{item.current_price}</Text>
        <Text className="flex-row items-center">
          <Ionicons name="caret-up-outline" size={20} color="green" />
          {item.change_today * 100}%
        </Text>
      </View>
    </View>
  );
};
