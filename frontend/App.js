import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { GlobalProvider } from "./context/GlobalState";
import { NavigationContainer } from "@react-navigation/native";

import {
  useFonts,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import MainNavigator from "./navigation/MainNavigator";

export default function App() {
  let [fontsLoaded, fontError] = useFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  return (
    <GlobalProvider>
      <SafeAreaView className="flex-1">
      <StatusBar barStyle="dark-content" />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
