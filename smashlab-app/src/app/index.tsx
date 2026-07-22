import ProductCard from "@/components/main/ProductCard";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { logScreenView } from "../../lib/analytics";

export default function Home() {
  useEffect(() => {
    logScreenView({ screen_name: "Home", screen_class: "Home" });
  }, []);

  return (
    <ScrollView className="flex-1 bg-primary">
      <ProductCard />
    </ScrollView>
  );
}
