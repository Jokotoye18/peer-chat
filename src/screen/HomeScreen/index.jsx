import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from "react-native";

import {} from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../../worklet/api";
import { useBackend } from "../../context/BareProvider";
import uiEvent, { CONNECTIONS_UI, RECEIVE_MESSAGE_UI } from "../../lib/uiEvent";
import { addMessage } from "../../store";
import { getChatDataWithSeparators } from "../../utils/roomMessages.js";
import { ChatHeader } from "./components/ChatHeader";
import ChatInputBox from "./components/ChatInputBox.jsx";
import { ChatMessageItem } from "./components/ChatMessageItem";
import { RoomEntryCard } from "./components/RoomEntryCard";
import { styles } from "./style";

export const HomeScreen = () => {
  const backend = useBackend();

  const messages = useSelector((state) => state.messages);
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [roomTopic, setRoomTopic] = useState("");
  const [roomTopicIn, setRoomTopicIn] = useState("");
  const [peersCount, setPeersCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);

  const formattedMessages = useMemo(
    () => getChatDataWithSeparators(messages),
    [messages]
  );

  useEffect(() => {
    const messageListener = uiEvent.on(
      RECEIVE_MESSAGE_UI,
      ({ memberId, message }) => {
        dispatch(addMessage({ ...message, local: false, memberId }));
      }
    );
    const peerCountListener = uiEvent.on(CONNECTIONS_UI, (count) => {
      setPeersCount(count);
    });
    return () => {
      messageListener.off();
      peerCountListener.off();
    };
  }, [dispatch]);

  const appendMessage = (msg, local = false) => {
    if (msg.trim()) {
      dispatch(addMessage(createMessage(msg, local)));
    }
  };

  const handleTopic = useCallback((topic) => setRoomTopic(topic), []);

  const handleCreate = useCallback(async () => {
    setLoading(true);
    try {
      await backend.createRoom(handleTopic);
      await new Promise((res) => setTimeout(res, 4000)); // artificial delay for UX
    } finally {
      setLoading(false);
    }
  }, [backend]);

  const handleJoin = useCallback(async () => {
    setJoinLoading(true);
    try {
      const topic = roomTopicIn.replace("Topic: ", "");
      handleTopic(topic);
      await backend.joinRoom(topic, handleTopic);
      await new Promise((res) => setTimeout(res, 4000)); // artificial delay for UX
    } finally {
      setJoinLoading(false);
    }
  }, [backend, roomTopicIn]);

  const handleSend = () => {
    if (inputText.trim()) {
      backend.sendMessage(inputText, appendMessage);
      setInputText("");
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.wrapper]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar style="light" />
      <ImageBackground
        source={require("../../../assets/background.jpg")}
        style={[
          styles.container,
          {
            justifyContent: roomTopic ? "flex-start" : "center",
          },
        ]}
      >
        {roomTopic ? (
          <>
            <ChatHeader topic={roomTopic} peersCount={peersCount} />
            <FlatList
              data={formattedMessages}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
              keyExtractor={(item, index) => {
                if (item.type === "date")
                  return `date-${item.date.toISOString()}`;
                return item.id ? String(item.id) : String(index);
              }}
              contentContainerStyle={{
                flexGrow: 1,
                paddingVertical: 16,
              }}
              renderItem={({ item }) => <ChatMessageItem item={item} />}
              inverted
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              windowSize={10}
              removeClippedSubviews={true}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    No messages yet. Start the conversation!
                  </Text>
                </View>
              }
            />
            <ChatInputBox
              value={inputText}
              onChangeText={setInputText}
              onSend={handleSend}
              disabled={!inputText}
            />
          </>
        ) : (
          <RoomEntryCard
            roomTopicIn={roomTopicIn}
            setRoomTopicIn={setRoomTopicIn}
            handleCreate={handleCreate}
            handleJoin={handleJoin}
            loading={loading}
            joinLoading={joinLoading}
          />
        )}
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
