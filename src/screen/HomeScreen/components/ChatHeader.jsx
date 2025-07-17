import FontAwesome from "@expo/vector-icons/FontAwesome";
import { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ChatHeader = memo(({ topic, peersCount }) => {
  const avatarText = topic ? topic.slice(0, 2).toUpperCase() : "?";
  const { top } = useSafeAreaInsets();
  return (
    <View style={[styles.headerContainer, { paddingTop: top }]}>
      <FontAwesome name="user" size={30} color="#e0f7fa" />
      <View style={styles.centerContainer}>
        <Text
          style={styles.headerTitle}
          numberOfLines={2}
          ellipsizeMode="middle"
        >
          {topic}
        </Text>
      </View>
      <View style={styles.peersContainer}>
        <Text style={styles.peersCount}>
          <Text style={styles.greenDot}>● </Text>
          {peersCount}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#181A1B",
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderColor: "#232526",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#e0f7fa", //
    letterSpacing: 0.5,
    textAlign: "center",
  },
  peersContainer: {
    minWidth: 40,
    alignItems: "flex-end",
  },
  peersCount: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2ecc40",
    textAlign: "right",
  },
  greenDot: {
    color: "#2ecc40",
    fontSize: 18,
    fontWeight: "bold",
  },
});
