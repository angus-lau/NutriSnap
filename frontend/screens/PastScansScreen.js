import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { GlobalContext } from "../context/GlobalState";

import One from "../assets/emoji/1.png";
import Two from "../assets/emoji/2.png";
import Three from "../assets/emoji/3.png";
import Four from "../assets/emoji/4.png";
import Five from "../assets/emoji/5.png";

import Carbohydrates from "../assets/nutrients/carbohydrates.png";
import Energy from "../assets/nutrients/energy.png";
import Fat from "../assets/nutrients/fat.png";
import Fiber from "../assets/nutrients/fiber.png";
import Protein from "../assets/nutrients/protein.png";
import Salt from "../assets/nutrients/salt.png";
import Sodium from "../assets/nutrients/sodium.png";
import Sugar from "../assets/nutrients/sugar.png";

export default function PastScanScreen() {
  const { pastScans, calorieTarget } = useContext(GlobalContext);

  const DAILY_CARBS = 300;
  const DAILY_CALORIES = 2000;
  const DAILY_FAT = 60;
  const DAILY_FIBER = 27;
  const DAILY_PROTEIN = 60;
  const DAILY_SODIUM = 2300;
  const DAILY_SUGAR = 30;
  const DAILY_SALT = 2000;

  const renderItem = ({ item }) => {
    let image;
    if (item.rating > 4) {
      image = Five;
    } else if (item.rating > 3) {
      image = Four;
    } else if (item.rating > 2) {
      image = Three;
    } else if (item.rating > 1) {
      image = Two;
    } else {
      image = One;
    }

    return (
      <View style={styles.itemContainer}>
        <Image source={image} style={styles.emoji} />
        <Text style={styles.itemTitle}>{item.name}</Text>
      </View>
    );
  };

  const renderProgressBar = (label, value, total, unit) => {
    const percentage = Math.min(100, (value / total) * 100).toFixed(0);
    return (
      <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
        <Text>
          {label}: {value} {unit} ({percentage}%)
        </Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex items-center mb-4 justify-center">
        <Text
          className="font-bold text-2xl tracking-tight"
          style={{ fontFamily: "PlusJakartaSans_700Bold" }}
        >
          Past Scans
        </Text>
      </View>
      <ScrollView
        bounces={false}
        className="flex w-full flex-col px-6"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        {pastScans.map((scan, i) => (
          <Scan key={i} {...scan} />
        ))}
      </ScrollView>
    </View>
  );

  function Scan(props) {
    let image;
    if (props.nutrition.rating > 8) {
      image = Five;
    } else if (props.nutrition.rating > 6) {
      image = Four;
    } else if (props.nutrition.rating > 4) {
      image = Three;
    } else if (props.nutrition.rating > 2) {
      image = Two;
    } else {
      image = One;
    }
    return (
      <View className="border border-w-400 bg-w-200 rounded-xl mb-4 p-4">
        <View className="flex flex-row w-full items-center justify-between">
          <Text
            className="text-lg font-semibold capitalize"
            style={{ fontFamily: "PlusJakartaSans_600SemiBold" }}
          >
            {props.name}
          </Text>
          <Image source={image} className="w-8 h-8" />
        </View>
        <View className="flex flex-row mt-1 justify-between w-full">
          <Progress
            label="Carbohydrates"
            amount={props.nutrition.carbohydrates[0]}
            TOTAL={DAILY_CARBS}
            color="#eab308"
            icon={Carbohydrates}
          />
          <Progress
            label="Fat"
            amount={props.nutrition.fat[0]}
            TOTAL={DAILY_FAT}
            color="#ea580c"
            icon={Fat}
          />
          <Progress
            label="Proteins"
            amount={props.nutrition.proteins[0]}
            TOTAL={DAILY_PROTEIN}
            color="#16a34a"
            icon={Protein}
          />
        </View>
      </View>
    );
  }

  function Progress({ label, amount, TOTAL, color }) {
    const percentage = Math.round((amount / TOTAL) * 100) + "%";
    console.log(percentage);
    return (
      <View className="flex flex-row items-end flex-1">
        <View className="h-14 mb-1 mr-2 w-2 flex flex-col justify-end bg-w-400 rounded-full overflow-hidden">
          <View
            style={{
              height: percentage,
              backgroundColor: color,
              borderRadius: "100px",
              width: "100%",
            }}
          />
        </View>
        <View className="flex flex-col flex-1">
          <Text className="text-sm font-medium leading-0">{percentage}</Text>
          <Text className="text-sm font-semibold leading-0 text-w-600">
            {label == "Carbohydrates" ? "Carbs" : label}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginTop: 10,
    marginBottom: 10,
  },
  emptyContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  emptyText: {
    fontStyle: "italic",
  },
  progressBarBackground: {
    height: 20,
    backgroundColor: "#ddd",
    borderRadius: 10,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4cbc80",
    borderRadius: 10,
  },
  emoji: {
    position: "absolute",
    top: -25,
    right: 25,
    width: 75,
    height: 75,
  },
});
