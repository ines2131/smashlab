import "../../global.css";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import AppTabs from "@/components/app-tabs";
import ReactQueryProvider from "../../providers/ReactQueryProvider";
import Navbar from "@/components/layout/Navbar";

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ReactQueryProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Navbar />
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}
