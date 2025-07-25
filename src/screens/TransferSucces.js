import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

export default function TransferSuccess() {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    name,
    bank,
    accountNumber,
    amount,
    fee,
    total,
    date,
    time,
    reference,
  } = route.params;

  const formatRupiah = (num) => "Rp " + parseInt(num).toLocaleString("id-ID");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.checkCircle}>
          <Text style={styles.checkIcon}>✓</Text>
        </View>

        <Text style={styles.success}>Transfer Successful</Text>
        <Text style={styles.desc}>Your transaction was successful</Text>

        <Text style={styles.amount}>{formatRupiah(amount)}</Text>

        <Text style={styles.sendLabel}>Send to</Text>
        <View style={styles.bankInfo}>
          {bank?.logo && <Image source={bank.logo} style={styles.logo} />}
          <View>
            <Text style={styles.bankName}>{name}</Text>
            <Text style={styles.account}>•••••• {accountNumber.slice(-5)}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.row}>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.value}>{formatRupiah(amount)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{date}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Time</Text>
            <Text style={styles.value}>{time}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Reference Number</Text>
            <Text style={styles.value}>{reference}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fee</Text>
            <Text style={styles.value}>{formatRupiah(fee)}</Text>
          </View>

          <View style={styles.rowTotal}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.total}>{formatRupiah(total)}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.shareBtn}>
          <Text style={styles.shareText}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.backText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C00FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  checkCircle: {
    backgroundColor: "#00C566",
    borderRadius: 50,
    padding: 10,
    marginTop: -40,
    marginBottom: 10,
  },
  checkIcon: {
    color: "#fff",
    fontSize: 24,
  },
  success: {
    color: "#00C566",
    fontWeight: "bold",
    fontSize: 16,
  },
  desc: {
    color: "#888",
    marginBottom: 10,
  },
  amount: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  sendLabel: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
  },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    gap: 10,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginRight: 10,
  },
  bankName: {
    fontWeight: "bold",
  },
  account: {
    color: "#888",
  },
  details: {
    width: "100%",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  rowTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 8,
  },
  label: {
    color: "#777",
  },
  value: {
    fontWeight: "bold",
  },
  totalLabel: {
    fontWeight: "bold",
    color: "#6C00FF",
  },
  total: {
    fontWeight: "bold",
    color: "#6C00FF",
  },
  shareBtn: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: "#6C00FF",
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
  },
  shareText: {
    color: "#6C00FF",
    fontWeight: "bold",
  },
  backBtn: {
    marginTop: 10,
    padding: 12,
    borderRadius: 30,
    backgroundColor: "#6C00FF",
    width: "100%",
    alignItems: "center",
  },
  backText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
