import React, { useState } from "react";
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
  const [showBalance, setShowBalance] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          {/* <Text style={styles.logo}>CashEase</Text> */}
          <Image
            source={require("../../assets/case.png")}
            style={styles.logoImage}
          />

          <View style={styles.pointContainer}>
            {/* <Ionicons name="star" size={16} color="#FFA500" /> */}
            <Image
              source={require("../../assets/star.png")}
              style={styles.customIcon}
            />

            <Text style={styles.pointText}>1.972 Points</Text>
          </View>
        </View>

        <Text style={styles.balanceTitle}>Your Balance</Text>
        <View style={styles.balanceRow}>
          <Text style={styles.balance}>
            {showBalance ? "Rp 24.321.900" : "Rp ****"}
          </Text>
          <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
            <Ionicons
              name={showBalance ? "eye-off" : "eye"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.menuWrapper}>
        <View style={styles.menuRow}>
          {[
            {
              label: "Transfer",
              icon: require("../../assets/transfer.png"),
            },
            { label: "Top Up", icon: require("../../assets/toupup.png") },
            {
              label: "Withdraw",
              icon: require("../../assets/wd.png"),
            },
            { label: "More", icon: require("../../assets/more.png") },
          ].map((item, index) => (
            <TouchableOpacity
              style={styles.menuItem}
              key={index}
              onPress={() => {
                if (item.label === "Transfer") {
                  navigation.navigate("Transfer");
                } else {
                  alert(`${item.label} sedang maintenance`);
                }
              }}
            >
              <View style={styles.iconCircle}>
                <Image source={item.icon} style={styles.iconImage} />
              </View>
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Send Again</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>
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
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Lastest Transaction</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

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
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  headerBackground: {
    backgroundColor: "#6C00FF",
    paddingTop: 50,
    paddingBottom: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  logoImage: {
    width: 120,
    height: 30,
    resizeMode: "contain",
  },
  customIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  eyeIcon: {
    marginLeft: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  pointContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  pointText: {
    marginLeft: 5,
    color: "#6C00FF",
    fontWeight: "600",
    fontSize: 13,
  },

  balanceTitle: {
    color: "#fff",
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
  },
  balance: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 4,
  },

  menuCard: {
    backgroundColor: "#fff",
    marginHorizontal: 0,
    padding: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 10,
  },

  menuWrapper: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginTop: -40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

  menuRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  iconCircle: {
    width: 35,
    height: 35,
    borderRadius: 25,
    backgroundColor: "#f1edff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  iconImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },

  menuItem: { alignItems: "center" },
  menuText: { marginTop: 8, color: "#333", fontSize: 13, fontWeight: "600" },

  section: {
    marginHorizontal: 20,
    marginTop: 30,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold" },
  seeAll: { color: "#6C00FF", fontSize: 13, fontWeight: "600" },

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
