import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import "../app/global.css";

interface MessageInputProps {
  message: string;
  setMessage: (text: string) => void;
  onSend: () => void;
}

export default function MessageInput({
  message,
  setMessage,
  onSend,
}: MessageInputProps) {
  return (
    <View className="flex-row items-center p-3 border-t border-gray-200 bg-white">
      <TextInput
        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-gray-800"
        placeholder="Message HR..."
        placeholderTextColor="#9ca3af"
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity
        onPress={onSend}
        className="ml-2 bg-blue-500 rounded-full p-2"
      >
        <Ionicons name="send" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
