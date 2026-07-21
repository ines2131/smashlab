import { useState } from "react";
import { Link } from "expo-router";
import { View, Text, Pressable, Image, SafeAreaView } from "react-native";
import { ShoppingCart, Mail, User, Menu, X } from "lucide-react-native";

export default function Navbar() {
  const categories = ["rackets", "apparel", "footwear", "gear"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SafeAreaView className="bg-white border-b border-gray-200">
      <View className="flex-row justify-between items-center px-4 py-3">
        {/* 버거 메뉴 */}
        <Pressable onPress={() => setIsOpen(!isOpen)} hitSlop={10}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Pressable>

        {/* 로고 */}
        <Link href="/" asChild>
          <Pressable className="flex-row items-center gap-2">
            <Image
              source={require("../../../assets/images/logo-orange.png")}
              style={{ width: 140, height: 35 }}
              resizeMode="contain"
            />
          </Pressable>
        </Link>

        {/* 우측 아이콘 */}
        <View className="flex-row items-center gap-4">
          <Link href="/cart" asChild>
            <Pressable hitSlop={10}>
              <ShoppingCart size={22} />
            </Pressable>
          </Link>
        </View>
      </View>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <View className="px-4 pb-4 pt-2 border-t border-gray-100 gap-1">
          {categories.map((category) => (
            <Link
              key={category}
              href={{
                pathname: "/products/[category]",
                params: { category },
              }}
              asChild
            >
              <Pressable className="py-2.5" onPress={() => setIsOpen(false)}>
                <Text className="capitalize text-base text-gray-700">
                  {category}
                </Text>
              </Pressable>
            </Link>
          ))}

          <View className="border-t border-gray-100 mt-2 pt-3 gap-1">
            <Link href="/contact-us" asChild>
              <Pressable
                className="py-2.5 flex-row items-center gap-2"
                onPress={() => setIsOpen(false)}
              >
                <Mail size={18} color="#374151" />
                <Text className="text-base text-gray-700">Contact Us</Text>
              </Pressable>
            </Link>
            <Link href="/login" asChild>
              <Pressable
                className="py-2.5 flex-row items-center gap-2"
                onPress={() => setIsOpen(false)}
              >
                <User size={18} color="#374151" />
                <Text className="text-base text-gray-700">
                  Login / Register
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
