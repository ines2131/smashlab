import { Link } from "expo-router";
import {
  View,
  Text,
  Image,
  Pressable,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useProducts } from "../../../hooks/useProducts";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48 - 16) / 2; // 좌우 패딩 24*2 + 카드 사이 gap 16

export default function ProductCard() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading)
    return (
      <View className="flex items-center justify-center min-h-[300px]">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );

  if (error)
    return (
      <View className="flex items-center justify-center min-h-[300px]">
        <Text className="text-red-500">Failed to load products</Text>
      </View>
    );

  return (
    <View className="flex-row flex-wrap justify-between px-6 pt-2 pb-8 gap-y-4">
      {products?.map((product) => (
        <Link
          key={product._id}
          href={`/products/${product.category}/${product.slug}`}
          asChild
        >
          <Pressable
            style={{ width: CARD_WIDTH }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
          >
            <View style={{ width: "100%", height: 160 }} className="bg-gray-50">
              <Image
                source={{
                  uri: `${process.env.EXPO_PUBLIC_API_URL}${product.image}`,
                }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>

            <View className="p-3">
              <Text
                numberOfLines={1}
                className="text-sm font-semibold text-gray-800"
              >
                {product.name}
              </Text>
              <Text className="text-base font-bold text-orange-500 mt-1">
                ${product.price}
              </Text>
            </View>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
