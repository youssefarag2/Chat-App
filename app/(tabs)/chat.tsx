import { db } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatHeader from "../../components/ChatHeader";
import ChatMessage from "../../components/ChatMessage";
import MessageInput from "../../components/MessageInput";
import "../global.css";

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef<FlatList<any>>(null);

  const conversationId = "emp_olivia_bennett";

  useEffect(() => {
    const messagesRef = collection(
      db,
      "conversations",
      conversationId,
      "messages"
    );
    const q = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const messagesRef = collection(
      db,
      "conversations",
      conversationId,
      "messages"
    );

    const convRef = doc(db, "conversations", conversationId);
    await updateDoc(convRef, {
      lastMessage: message,
      lastMessageTimestamp: serverTimestamp(),
    });

    await addDoc(messagesRef, {
      senderId: conversationId,
      text: message,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Also scroll down when keyboard shows up
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    return () => keyboardDidShow.remove();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ChatHeader name="Sarah (HR)" avatar="https://i.pravatar.cc/150?img=40" />
      <KeyboardAvoidingView
        className="flex-1 bg-gray-50"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatMessage
              text={item.text}
              timestamp={item.timestamp}
              isUser={item.senderId.startsWith("emp")}
            />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        <MessageInput
          message={message}
          setMessage={setMessage}
          onSend={sendMessage}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
