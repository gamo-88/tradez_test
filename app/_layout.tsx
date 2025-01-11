import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
// import Toast from 'react-native-toast-message';

// import { Toaster, toast } from 'sonner'

import "../global.css";
import { Provider } from 'react-redux';  // Importer le Provider
import { persistor, store } from '../store';

import { useColorScheme } from "@/hooks/useColorScheme";
import { PersistGate } from "redux-persist/integration/react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>

<Provider store={store}>
<PersistGate loading={null} persistor={persistor}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen name="(auth)/sign-in" />
        <Stack.Screen name="(auth)/sign-up" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />

      </PersistGate>

      </Provider>

    </ThemeProvider>
  );
}
