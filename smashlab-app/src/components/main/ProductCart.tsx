import { Link } from "expo-router";
import { View, Text, Image, Pressable, ActivityIndicator } from "react-native";
import { useProducts } from "../../../hooks/useProducts";

export default function ProductCard() {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading)
    return (
      <View className="flex items-center justify-center min-h-[300px]">
        <ActivityIndicator size="large" />
      </View>
    );

  if (error) return <Text>Failed to load products</Text>;

  return (
    <View className="flex-row flex-wrap gap-4 p-6">
      {products?.map((product) => (
        <Link
          key={product._id}
          href={`/products/${product.category}/${product.slug}`}
          asChild
        >
          <Pressable className="border p-4 rounded-md items-center w-[45%]">
            <Image
              source={{ uri: product.image }}
              className="h-[180px] w-full bg-gray-200 mb-2"
              resizeMode="cover"
            />
            <Text className="text-md font-bold text-gray-500">
              {product.name}
            </Text>
            <Text className="text-sm font-medium">${product.price}</Text>
          </Pressable>
        </Link>
      ))}
    </View>
  );
}
