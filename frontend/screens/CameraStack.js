import CameraScreen from "./CameraScreen";
import NutritionPage from "./NutritionPage";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function CameraStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        detachPreviousScreen: true,
        unmountOnBlur: true,
      }}
      detachInactiveScreens={true}
    >
      <Stack.Screen name="Camera Screen" component={CameraScreen} />
      <Stack.Screen
        name="Nutrition Page"
        component={NutritionPage}
        options={({ navigation }) => ({
          title: "",
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}
