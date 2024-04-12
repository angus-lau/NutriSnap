import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "../navigation/Tabs";
import {
  AccountScreen,
  CreateAccount,
  GetInfoScreen,
  LoginScreen,
  OnboardingScreen,
} from "../screens";

export default function MainNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: true,
        unmountOnBlur: true,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
      {/* <Stack.Screen 
            name="Login"
            component={LoginScreen}
        /> */}
      {/* <Stack.Screen name="Create Account" component={CreateAccount} /> */}
      {/* <Stack.Screen name="Account" component={AccountScreen} /> */}
      <Stack.Screen name="Get Info" component={GetInfoScreen} />
    </Stack.Navigator>
  );
}
