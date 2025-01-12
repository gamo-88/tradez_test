import React, { useState, useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useFocusEffect } from "expo-router";
import ScreenWrapper from "@/components/common/screenWrapper";
import alpacaApi from "../../services/alpaca"; 
import { Ionicons } from "@expo/vector-icons";
import PositionShowRender from "@/components/appComponents/positionRender";



interface Position {
  asset_id: string;
  symbol: string;
  qty: number;
  avg_entry_price: number;
  current_price: number;
  change_today: number;
}

export default function AppScreen() {
  const [buyingPower, setBuyingPower] = useState<number>(0);
  const [cash, setCash] = useState<number>(0);
  const [longMarketValue, setLongMarketValue] = useState<number>(0);
  const [portfolioValue, setPortfolioValue] = useState<number>(0);

  const [positions, setPositions] = useState<Position[]>([]); 

  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 

  useFocusEffect(
    useCallback(() => {
      const api = alpacaApi();

      setLoading(true);
      setError(null); 

      // fetch du compte
      api
        .getAccount()
        .then((res) => {
          if (res.ok) {
            setBuyingPower(res.data.buying_power);
            setCash(res.data.cash);
            setLongMarketValue(res.data.long_market_value);
            setPortfolioValue(res.data.portfolio_value);
          } else {
            setError("Failed to fetch account data.");
          }
        })
        .catch(() => {
          setError("An error occurred while fetching the account data.");
        });

      // fetch des positions
      api
        .getPositions()
        .then((res) => {
          if (res.ok) {
            setPositions(res.data);
            console.log(res.data);
          } else {
            setError("Failed to fetch positions.");
          }
        })
        .catch(() => {
          setError("An error occurred while fetching positions.");
        })
        .finally(() => {
          setLoading(false);
        });

      // Fonction qui est appelée lorsque l'écran devient non visible (focus perdu)
      return () => {
        console.log("This route is now unfocused.");
      };
    }, [])
  );

 
  return (
    <ScreenWrapper>
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text className="text-red-500 text-center">{error}</Text>
        ) : (
          <View className="w-full max-w-lg">
            <Text className="text-xl font-bold mb-4">Account Information</Text>
            <View className="flex flex-row flex-wrap gap-x-2 text-xl">
              <View className="flex flex-col flex-1">
                <Text className="mb-2 h-16">Buying Power: </Text>
                <Text className="mb-2 font-bold pl-2"> ${buyingPower}</Text>
              </View>
              <View className="flex flex-col flex-1">
                <Text className="mb-2 h-16">Cash: </Text>
                <Text className="mb-2 font-bold pl-2">${cash}</Text>
              </View>
              <View className="flex flex-col flex-1">
                <Text className="mb-2 h-16">Long Market Value:</Text>
                <Text className="mb-2 font-bold pl-2">${longMarketValue}</Text>
              </View>
              <View className="flex flex-col flex-1">
                <Text className="mb-2 h-16">Portfolio Value</Text>
                <Text className="mb-2 font-bold pl-2">${portfolioValue}</Text>
              </View>
            </View>


            <Text className="text-xl font-bold mt-4 border-t">My Positions</Text>

            {/* Positions */}
            {positions.length > 0 && (
              <View className="mt-4">
                <Text className="text-xl font-bold">Positions</Text>
                {positions.map((item) => (
                  <PositionShowRender key={item.asset_id} item={item} />
                ))}
              </View>
            )}
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
}
