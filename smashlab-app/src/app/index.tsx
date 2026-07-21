import ProductCard from "@/components/main/ProductCart";
import { View, Text, ScrollView } from "react-native";

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-primary">
      <ProductCard />
    </ScrollView>
  );
}
