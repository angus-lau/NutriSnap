import { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../context/GlobalState";
import { SelectList } from "react-native-dropdown-select-list";

export default function CreateAccount() {
  const navigation = useNavigation();
  const {
    weight,
    age,
    setAge,
    setDietaryRestrictions,
    setWeight,
    setCalorieTarget,
  } = useContext(GlobalContext);

  const dietaryOptions = [
    { key: "1", value: "Vegetarian" },
    { key: "2", value: "Vegan" },
    { key: "3", value: "Gluten Free" },
    { key: "4", value: "Low-Carb" },
    { key: "5", value: "Low-Sodium" },
    { key: "6", value: "Lactose-Free" },
  ];

  const handleAgeChange = () => {
    (event) => {
      const ageValue = parseInt(event.nativeEvent.text, 10);
      if (!isNaN(ageValue)) {
        setAge(ageValue);
      }
      console.log(age);
    };
  };

  const handleWeightChange = () => {
    (event) => {
      const weightValue = parseInt(event.nativeEvent.text, 10);
      if (!isNaN(weightValue)) {
        setWeight(weightValue);
      }
      console.log(weight);
    };
  };

  const handleCalorieTarget = () => {
    (event) => {
      const calorieTargetValue = parseInt(event.nativeEvent.text, 10);
      if (!isNaN(calorieTargetValue)) {
        setCalorieTarget(calorieTargetValue);
      }
    };
  };

  const handleDietarySelection = (selectedItem) => {
    setDietaryRestrictions(selectedItem);
  };

  const handleContinue = () => {
    navigation.navigate("Tabs");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="flex-1 px-6 bg-white">
        <View className="flex items-center mb-4 justify-center">
          <Text
            className="font-bold text-2xl tracking-tight"
            style={{ fontFamily: "PlusJakartaSans_700Bold" }}
          >
            Account Settings
          </Text>
        </View>
        <View className="flex flex-col gap-y-0">
          <View className="flex flex-col">
            <Text className="text-lg font-medium mb-1">Age</Text>
            <View className="rounded-lg overflow-hidden bg-w-300">
              <TextInput
                className="py-4 px-4 w-full"
                placeholder="Enter your age"
                keyboardType="numeric"
                onChange={handleAgeChange}
              />
            </View>
          </View>
          <View className="flex flex-col gap-y-3">
          <View className="flex flex-col">
            <Text className="text-lg font-medium mb-1">Gender</Text>
            <View className="rounded-lg overflow-hidden bg-w-300">
              <TextInput
                className="py-4 px-4 w-full"
                placeholder="Enter your gender"

                onChange={handleAgeChange}
              />
            </View>
          </View>
          <View className="flex flex-col">
            <Text className="text-lg font-medium mb-1">Weight</Text>
            <View className="rounded-lg overflow-hidden bg-w-300">
              <TextInput
                className="py-4 px-4 w-full"
                placeholder="Enter your current weight"
                keyboardType="numeric"
                onChange={handleWeightChange}
              />
            </View>
          </View>
          <View className="flex flex-col">
            <Text className="text-lg font-medium mb-1">Calorie Target</Text>
            <View className="rounded-lg overflow-hidden bg-w-300">
              <TextInput
                className="py-4 px-4 w-full"
                placeholder="Enter your daily calorie target"
                keyboardType="numeric"
                onChange={handleCalorieTarget}
              />
            </View>
          </View>
          <View className="flex flex-col">
            <Text className="text-lg font-medium mb-1">
              Dietary Restrictions
            </Text>
            <View className="rounded-lg flex overflow-hidden bg-w-300">
              <SelectList
                setSelected={handleDietarySelection}
                data={dietaryOptions}
                placeholder="Select Dietary Restriction"
                className="flex justify-between"
                searchPlaceholder="Search"
              />
            </View>
          </View>
        </View>
        <View className="flex items-end mt-3">
          <Text className="text-g-600 font-medium">Automatically Saved</Text>
        </View>
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
