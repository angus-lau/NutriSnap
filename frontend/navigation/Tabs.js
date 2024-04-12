import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CameraStack, GetInfoScreen, PastScansScreen } from "../screens";
import { Image, View, TouchableOpacity } from "react-native";

import User from "../assets/icons/user.png";
import UserActive from "../assets/icons/user-active.png";
import History from "../assets/icons/history.png";
import HistoryActive from "../assets/icons/history-active.png";
import Camera from "../assets/icons/camera.png";

const CustomTabBarButton = ({ children, onPress, focused }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: "center",
      alignItems: "center",
    }}
    onPress={() => {
      if (focused) {
        onPress("double");
      } else {
        onPress();
      }
    }}
  >
    <View
      style={{
        width: 80,
        height: 80,
        borderRadius: 80,
        backgroundColor: focused ? "#059669" : "#748c94",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default function Tabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          elevation: 0,
          backgroundColor: "#ffffff",
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
          height: 72,
        },
      }}
    >
      <Tab.Screen
        name="Past Scans"
        component={PastScansScreen}
        options={{
          title: "Past Scans",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={focused ? HistoryActive : History}
                style={{ width: 40, height: 40 }}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Scan"
        component={CameraStack}
        options={({ navigation, route }) => ({
          tabBarIcon: ({ focused }) => (
            <Image
              source={Camera}
              resizeMode="contain"
              style={{
                width: 40,
                height: 40,
              }}
            />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton
              {...props}
              focused={props.accessibilityState.selected}
              onPress={(action) => {
                if (action == "double") {
                  navigation.navigate("Scan", {
                    screen: "Camera Screen",
                    params: { takePhoto: true },
                  });
                } else {
                  navigation.navigate("Scan", {
                    screen: "Camera Screen",
                    params: { takePhoto: false },
                  });
                }
              }}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Account"
        component={GetInfoScreen}
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={focused ? UserActive : User}
                style={{ width: 40, height: 40 }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
