import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatDateSeparator, formatTime } from "../../../utils/roomMessages";

export const ChatMessageItem = ({ item }) => {
  if (item.type === "date") {
    return (
      <Text style={styles.dateSeparator}>{formatDateSeparator(item.date)}</Text>
    );
  }
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        marginVertical: item.isFirstInGroup ? 8 : 2,
        justifyContent: item.local ? "flex-end" : "flex-start",
        paddingHorizontal: 16,
      }}
    >
      <View
        style={[
          styles.bubble,
          item.local ? styles.myBubble : styles.otherBubble,
        ]}
      >
        <Text selectable style={styles.messageText}>
          {item.message}
        </Text>
        <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "80%",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 2,
    backgroundColor: "rgba(30,30,30,0.85)",
    shadowColor: "#000",
  },
  myBubble: {
    backgroundColor: "rgba(0, 180, 200, 0.85)", // deep teal/blue
    borderColor: "#1de9b6",
    alignSelf: "flex-end",
  },
  otherBubble: {
    backgroundColor: "rgba(30,30,30,0.85)",
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: "#222",
  },
  timestamp: {
    fontSize: 10,
    color: "#b2ebf2",
    alignSelf: "flex-end",
    marginTop: 2,
    marginBottom: 4,
    marginHorizontal: 4,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1de9b6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 1,
  },
  avatarText: {
    color: "#222",
    fontWeight: "bold",
  },
  dateSeparator: {
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#1de9b6",
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginVertical: 8,
    overflow: "hidden",
  },
  messageText: {
    color: "#e0f7fa",
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
});
