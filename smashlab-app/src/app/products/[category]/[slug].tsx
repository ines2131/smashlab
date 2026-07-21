import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ProductDetail() {
  const { category, slug } = useLocalSearchParams();

  return (
    <View>
      <Text>Category : {category}</Text>
      <Text>Slug:{slug}</Text>
    </View>
  );
}
