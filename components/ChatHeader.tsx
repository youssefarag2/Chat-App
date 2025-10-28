import React from "react";
import { Image, Text, View } from "react-native";
import "../app/global.css";

interface ChatHeaderProps {
  name: string;
  avatar?: string;
}

export default function ChatHeader({ name, avatar }: ChatHeaderProps) {
  return (
    <View className="flex-row items-center p-4 border-b border-gray-200">
      {avatar && (
        <Image
          source={{ uri: avatar }}
          className="w-10 h-10 rounded-full mr-3"
        />
      )}
      <Text className="text-lg font-semibold text-gray-800">{name}</Text>
    </View>
  );
}
