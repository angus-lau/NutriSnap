import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ArrowLeft, ArrowLeftCircle } from "react-native-feather";

import One from "../assets/emoji/1.png";
import Two from "../assets/emoji/2.png";
import Three from "../assets/emoji/3.png";
import Four from "../assets/emoji/4.png";
import Five from "../assets/emoji/5.png";
import BannerBackground from "../assets/banner-background.png";

import Carbohydrates from "../assets/nutrients/carbohydrates.png";
import Energy from "../assets/nutrients/energy.png";
import Fat from "../assets/nutrients/fat.png";
import Fiber from "../assets/nutrients/fiber.png";
import Protein from "../assets/nutrients/protein.png";
import Salt from "../assets/nutrients/salt.png";
import Sodium from "../assets/nutrients/sodium.png";
import Sugar from "../assets/nutrients/sugar.png";

const DAILY_CARBS = 300;
const DAILY_CALORIES = 2000;
const DAILY_FAT = 60;
const DAILY_FIBER = 27;
const DAILY_PROTEIN = 60;
const DAILY_SODIUM = 2300;
const DAILY_SUGAR = 30;
const DAILY_SALT = 2000;

export default function NutritionPage() {
  const route = useRoute();
  const navigation = useNavigation();
  const nutrition = route.params;
  const nutriments = nutrition.nutrition;

  let image;
  if (nutrition.rating > 8) {
    image = Five;
  } else if (nutrition.rating > 6) {
    image = Four;
  } else if (nutrition.rating > 4) {
    image = Three;
  } else if (nutrition.rating > 2) {
    image = Two;
  } else {
    image = One;
  }

  console.log(nutriments);

  return (
    <View className="absolute gap-y-4 px-6 w-screen h-screen top-0 left-0 z-10 flex-1 flex-col justify-start items-center bg-white">
      <View className="flex flex-row w-full pb-1 pt-1 items-center justify-between">
        <ArrowLeftCircle
          onPress={() => navigation.goBack()}
          stroke="#000"
          strokeOpacity={0.3}
          width={32}
          height={32}
          strokeWidth={1.5}
        />
        <Text
          className="font-bold text-2xl tracking-tight"
          style={{ fontFamily: "PlusJakartaSans_800ExtraBold" }}
        >
          Nutrition
        </Text>
        <View className="w-8 h-8 rounded-full" />
      </View>
      <ScrollView
        bounces={false}
        className="flex w-full flex-col"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-col w-full gap-y-2 mb-6">
          <Text className="text-xl font-bold capitalize">{nutrition.name}</Text>
          <View className="relative flex flex-col w-full bg-g-700 rounded-2xl">
            <View className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-2xl">
              <Image
                source={BannerBackground}
                contentFit="cover"
                className="absolute top-0 left-0 w-full h-full"
              />
            </View>
            <View className="gap-y-1 relative flex flex-col p-6">
              <Image
                source={image}
                className="w-20 h-20 absolute right-6 -top-8"
              />
              <Text
                className="text-xl text-white"
                style={{ fontFamily: "PlusJakartaSans_700Bold" }}
              >
                Nutrition Summary
              </Text>
              <Text className="text-white">{nutrition.description}</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-col w-full pb-48">
          <Text className="text-xl font-bold mb-2">Nutritional Facts</Text>
          <Progress
            label="Calories"
            amount={nutriments.energy[0]}
            TOTAL={DAILY_CALORIES}
            color="#dc2626"
            icon={Energy}
          />
          <Progress
            label="Carbohydrates"
            amount={nutriments.carbohydrates[0]}
            TOTAL={DAILY_CARBS}
            color="#eab308"
            icon={Carbohydrates}
          />
          <Progress
            label="Fat"
            amount={nutriments.fat[0]}
            TOTAL={DAILY_FAT}
            color="#ea580c"
            icon={Fat}
          />
          <Progress
            label="Fiber"
            amount={nutriments.fiber[0]}
            TOTAL={DAILY_FIBER}
            color="#16a34a"
            icon={Fiber}
          />
          <Progress
            label="Proteins"
            amount={nutriments.proteins[0]}
            TOTAL={DAILY_PROTEIN}
            color="#16a34a"
            icon={Protein}
          />
          <Progress
            label="Sodium"
            amount={nutriments.sodium[0]}
            TOTAL={DAILY_SODIUM}
            color="#fb7185"
            icon={Sodium}
          />
          <Progress
            label="Sugar"
            amount={nutriments.sugars[0]}
            TOTAL={DAILY_SUGAR}
            color="#0d9488"
            icon={Sugar}
          />
          <Progress
            label="Salt"
            amount={nutriments.salt[0]}
            TOTAL={DAILY_SALT}
            color="#d8b4fe"
            icon={Salt}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function Progress({ label, amount, TOTAL, color, icon }) {
  const percentage = Math.round((amount / TOTAL) * 100) + "%";
  return (
    <View className="flex flex-row gap-x-2 mb-4">
      <View className="w-12 h-12 border flex border-w-300 items-center justify-center rounded-xl">
        <Image source={icon} className="w-8 h-8" />
      </View>
      <View className="flex flex-col flex-1 gap-y-1.5">
        <View className="flex flex-row w-full justify-between">
          <Text className="text-xl font-semibold leading-snug">{label}</Text>
          <Text className="text-xl font-medium text-w-500 le">
            {percentage}
          </Text>
        </View>
        <View className="w-full h-2 flex bg-w-300 justify-start rounded-full overflow-hidden">
          <View
            style={{
              height: "100%",
              backgroundColor: color,
              borderRadius: "100px",
              width: percentage,
            }}
          />
        </View>
      </View>
    </View>
  );
}
