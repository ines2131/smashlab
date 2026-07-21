import ProductCard from "@/components/main/ProductCart";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-orange-200">
      <Text className="text-xl font-bold text-gray-700">smashlab</Text>
      <ProductCard />
    </View>
  );
}
