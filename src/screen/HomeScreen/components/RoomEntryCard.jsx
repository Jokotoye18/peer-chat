import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const RoomEntryCard = ({
  roomTitle = "Welcome to PearBare Chat",
  roomSubtitle = "Create a new chat room or join an existing one with a topic hash.",
  roomTopicIn,
  setRoomTopicIn,
  handleCreate,
  handleJoin,
  loading,
  joinLoading,
}) => (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.roomCard}>
      <Text style={styles.roomTitle}>{roomTitle}</Text>
      <Text style={styles.roomSubtitle}>{roomSubtitle}</Text>
      <TouchableOpacity
        style={[styles.roomButton, loading && styles.roomButtonDisabled]}
        onPress={handleCreate}
        activeOpacity={0.7}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#e0f7fa" />
        ) : (
          <Text style={styles.roomButtonText}>Create Room</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.roomOr}>OR</Text>
      <View style={styles.roomInputGroup}>
        <TextInput
          value={roomTopicIn}
          onChangeText={setRoomTopicIn}
          style={styles.roomTextInput}
          placeholder="Enter topic hash..."
          placeholderTextColor="#b0bec5"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[
            styles.roomJoinButtonFull,
            (!roomTopicIn || joinLoading) && styles.roomJoinButtonDisabled,
          ]}
          onPress={handleJoin}
          activeOpacity={0.7}
          disabled={!roomTopicIn || joinLoading}
        >
          {joinLoading ? (
            <ActivityIndicator color="#e0f7fa" />
          ) : (
            <Text style={styles.roomButtonText}>Join</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  roomCard: {
    backgroundColor: "rgba(24,26,27,0.98)", // deep dark
    borderRadius: 18,
    padding: 24,
    marginHorizontal: 8,
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    textAlign: "center",
    borderWidth: 1.5,
    borderColor: "#232526",
  },
  roomTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#e0f7fa",
    letterSpacing: 1,
    textAlign: "center",
  },
  roomSubtitle: {
    fontSize: 15,
    color: "#b0bec5",
    marginBottom: 20,
    textAlign: "center",
  },
  roomButton: {
    backgroundColor: "#232526",
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: "center",
    shadowColor: "#1de9b6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: "#1de9b6",
  },
  roomButtonDisabled: {
    backgroundColor: "#333",
    borderColor: "#444",
  },
  roomButtonText: {
    color: "#e0f7fa",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  roomOr: {
    marginVertical: 10,
    color: "#b0bec5",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  roomInputGroup: {
    marginTop: 8,
  },
  roomTextInput: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "#232526",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#232526",
    color: "#e0f7fa",
    fontSize: 15,
    marginBottom: 16,
  },
  roomJoinButtonFull: {
    backgroundColor: "#232526",
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#1de9b6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: "#1de9b6",
  },
  roomJoinButtonDisabled: {
    backgroundColor: "#333",
    borderColor: "#444",
  },
});
