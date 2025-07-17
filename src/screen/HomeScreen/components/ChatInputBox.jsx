import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { memo } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatInputBox = ({ value, onChangeText, onSend, disabled }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.inputContainer, { paddingBottom: bottom }]}>
      <TextInput
        style={styles.msgInput}
        placeholder="Say something"
        placeholderTextColor="#b0bec5"
        textAlignVertical="auto"
        value={value}
        onChangeText={onChangeText}
        multiline
        maxHeight={120}
      />
      <TouchableOpacity
        style={[styles.sendButton, disabled && styles.sendButtonDisabled]}
        disabled={disabled}
        onPress={onSend}
      >
        <MaterialIcons name="send" size={16} color="#e0f7fa" />
      </TouchableOpacity>
    </View>
  );
};

export default memo(ChatInputBox);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "rgba(24,26,27,0.98)", // deep dark
    borderTopWidth: 1,
    borderTopColor: "#232526",
  },
  msgInput: {
    flex: 1,
    paddingVertical: 12,
    maxHeight: 120,
    borderColor: "#232526",
    borderWidth: 1.5,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: "#232526",
    color: "#e0f7fa",
    fontSize: 16,
    textAlignVertical: "center",
  },
  sendButton: {
    backgroundColor: "#232526",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1de9b6",
  },
  sendButtonDisabled: {
    backgroundColor: "#333",
    borderColor: "#444",
  },
});
