import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CashEase</Text>
        <View style={styles.pointContainer}>
          <Ionicons name="star" size={16} color="#FFA500" />
          <Text style={styles.pointText}>1,972 Points</Text>
        </View>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Your Balance</Text>
        <Text style={styles.balance}>Rp 24.321.900</Text>
      </View>

      <View style={styles.menuRow}>
        {["Transfer", "Top Up", "Withdraw", "More"].map((item, index) => (
          <TouchableOpacity
            style={styles.menuItem}
            key={index}
            onPress={() => {
              if (item === "Transfer") {
                navigation.navigate("Transfer");
              } else {
                alert(`${item} sedang maintenance`);
              }
            }}
          >
            <MaterialIcons
              name="account-balance-wallet"
              size={28}
              color="#6C00FF"
            />
            <Text style={styles.menuText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Send Again</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.avatarContainer}>
            <Ionicons name="add-circle-outline" size={40} color="#6C00FF" />
            <Text style={styles.avatarName}>Add New</Text>
          </TouchableOpacity>
          {["Alexandria", "Immanuel", "Kayshania", "Ibrahim"].map(
            (name, index) => (
              <TouchableOpacity style={styles.avatarContainer} key={index}>
                <Image
                  source={{
                    uri: `https://i.pravatar.cc/150?img=${index + 10}`,
                  }}
                  style={styles.avatar}
                />
                <Text style={styles.avatarName}>{name}</Text>
              </TouchableOpacity>
            )
          )}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lastest Transaction</Text>
        <View style={styles.transactionItem}>
          <Ionicons name="swap-horizontal-outline" size={24} color="#6C00FF" />
          <View style={styles.transactionInfo}>
            <Text>Transfer</Text>
            <Text style={styles.timeText}>Yesterday · 19:12</Text>
          </View>
          <Text style={styles.negativeAmount}>-Rp 600.000</Text>
        </View>

        <View style={styles.transactionItem}>
          <Ionicons name="arrow-up-circle-outline" size={24} color="#6C00FF" />
          <View style={styles.transactionInfo}>
            <Text>Top Up</Text>
            <Text style={styles.timeText}>May 29, 2023 · 19:12</Text>
          </View>
          <Text style={styles.positiveAmount}>+Rp 260.000</Text>
        </View>

        <View style={styles.transactionItem}>
          <Ionicons name="wifi-outline" size={24} color="#6C00FF" />
          <View style={styles.transactionInfo}>
            <Text>Internet</Text>
            <Text style={styles.timeText}>May 16, 2023 · 17:34</Text>
          </View>
          <Text style={styles.negativeAmount}>-Rp 350.000</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", flex: 1, paddingTop: 40 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  logo: { fontSize: 22, fontWeight: "bold", color: "#6C00FF" },
  pointContainer: { flexDirection: "row", alignItems: "center" },
  pointText: { marginLeft: 5, color: "#333" },

  balanceCard: {
    backgroundColor: "#6C00FF",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  balanceTitle: { color: "#fff", fontSize: 16 },
  balance: { color: "#fff", fontSize: 28, fontWeight: "bold", marginTop: 10 },

  menuRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  menuItem: { alignItems: "center" },
  menuText: { marginTop: 8, color: "#333" },

  section: { marginHorizontal: 20, marginVertical: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  avatarContainer: { alignItems: "center", marginRight: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  avatarName: { fontSize: 12, marginTop: 5 },

  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  transactionInfo: { flex: 1, marginLeft: 10 },
  timeText: { color: "gray", fontSize: 12 },
  negativeAmount: { color: "red", fontWeight: "bold" },
  positiveAmount: { color: "green", fontWeight: "bold" },
});
