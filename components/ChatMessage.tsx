import { Timestamp } from "firebase/firestore";
import React from "react";
import { Text, View } from "react-native";
import "../app/global.css";

interface ChatMessageProps {
  text: string;
  isUser: boolean;
  timestamp?: Timestamp;
}

export default function ChatMessage({
  text,
  isUser,
  timestamp,
}: ChatMessageProps) {
  const formatTimestamp = (date?: Date) => {
    if (!date) return "";
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    const options: Intl.DateTimeFormatOptions = isToday
      ? { hour: "numeric", minute: "numeric", hour12: true }
      : {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        };

    const formattedTime = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return isToday ? `Today, ${formattedTime}` : formattedTime;
  };

  return (
    <View
      className={`max-w-[80%] my-2 p-3 rounded-2xl ${
        isUser ? "bg-blue-500 self-end" : "bg-gray-200 self-start"
      }`}
    >
      <Text className={`text-lg ${isUser ? "text-white" : "text-gray-800"}`}>
        {text}
      </Text>
      {timestamp && (
        <Text
          className={`text-xs mt-1 ${
            isUser ? "text-blue-100 self-end" : "text-gray-500 self-end"
          }`}
        >
          {formatTimestamp(timestamp.toDate())}
        </Text>
      )}
    </View>
  );
}
