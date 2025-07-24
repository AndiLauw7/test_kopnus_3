import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const formatRupiah = (numberString) => {
  const number = parseInt(numberString, 10);
  if (isNaN(number)) return "Rp 0";

  return "Rp " + number.toLocaleString("id-ID");
};

const generateRefNumber = () => {
  const part1 = Math.random().toString(36).substring(2, 6).toUpperCase();
  const part2 = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ALKS-${part1}-${part2}`;
};

export default function TransferScreen({ navigation }) {
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [amountFormatted, setAmountFormatted] = useState("");

  const [notes, setNotes] = useState("");
  const isFormValid = bank && parseInt(amount) > 0;
  const route = useRoute();

  useEffect(() => {
    if (route.params?.selectedBank && route.params?.accountNumber) {
      const selected = route.params.selectedBank;
      const accountNum = route.params.accountNumber;

      setBank(`${selected.name} - ${accountNum}`);
    }
  }, [route.params]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerIcon}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfer to Bank</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="help-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceSection}>
        <View>
          <Text style={styles.balanceText}>Your Balance</Text>
          <Text style={styles.balanceAmount}>Rp 24.321.900</Text>
        </View>
        <TouchableOpacity style={styles.topUpBtn}>
          <AntDesign name="pluscircleo" size={16} color="#6C00FF" />
          <Text style={styles.topUpText}>Top Up</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.handleBar} />

        <ScrollView contentContainerStyle={styles.scrollInner}>
          <TouchableOpacity
            style={[
              styles.dropdown,
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                borderWidth: bank ? 0 : 1,
              },
            ]}
            onPress={() => navigation.navigate("Transfer2BankList")}
          >
            {bank ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <View>
                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                      KAROLINA MCMILLAN
                    </Text>
                    <Text style={{ color: "#888", fontSize: 13 }}>
                      {bank ? `•••••• ${bank.slice(-5)}` : ""}
                    </Text>
                  </View>
                </View>

                <Ionicons name="create-outline" size={20} color="#6C00FF" />
              </>
            ) : (
              <>
                <Text style={styles.dropdownText}>Select bank destination</Text>
                <Entypo name="chevron-down" size={20} color="#999" />
              </>
            )}
          </TouchableOpacity>

          {/* <Text style={styles.amountText}>Rp {amount || 0}</Text> */}
          {/* <Text style={styles.amountLabel}>Set Amount</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Rp 0"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => {
              const numeric = text.replace(/[^0-9]/g, "");
              setAmount(numeric);
            }}
          /> */}
          <Text style={styles.amountLabel}>Set Amount</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="Rp 0"
            keyboardType="numeric"
            value={amountFormatted}
            onChangeText={(text) => {
              const numeric = text.replace(/[^0-9]/g, "");
              setAmount(numeric);
              setAmountFormatted(formatRupiah(numeric));
            }}
          />

          <Text style={styles.notesLabel}>
            Notes <Text style={{ color: "#aaa" }}>(Optional)</Text>
          </Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Write your notes here"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          <TouchableOpacity
            disabled={!isFormValid}
            style={[
              styles.transferBtn,
              { backgroundColor: isFormValid ? "#6C00FF" : "#ccc" },
            ]}
            // onPress={() => alert("Transfer Proceeded!")}
            onPress={() => {
              const numericAmount = parseInt(amount, 10);
              if (numericAmount <= 10000) {
                Toast.show({
                  type: "error",
                  text1: "Transfer Failed",
                  text2: "Minimum transfer Rp 10.000",
                  position: "bottom",
                });

                return;
              }
              const fee = 2500;
              const total = parseInt(amount) + fee;

              navigation.navigate("TransferSuccess", {
                name: "Karolina McMillan",
                bank: bank,
                accountNumber: route.params?.accountNumber || "80901",
                amount: amount,
                fee: fee,
                total: total,
                date: new Date().toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                time: new Date().toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                reference: generateRefNumber(),
              });
            }}
          >
            <Text style={styles.transferText}>Proceed to Transfer</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C00FF",
  },
  header: {
    paddingTop: Platform.OS === "android" ? 40 : 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#6C00FF",
  },
  headerIcon: {
    width: 30,
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  balanceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#6C00FF",
  },
  balanceText: {
    color: "#fff",
    fontSize: 14,
  },
  balanceAmount: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
  },
  topUpBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "center",
  },
  topUpText: {
    marginLeft: 6,
    color: "#6C00FF",
    fontWeight: "bold",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  handleBar: {
    width: 50,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#ccc",
    alignSelf: "center",
    marginBottom: 20,
  },
  scrollInner: {
    paddingBottom: 30,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  amountLabel: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  amountText: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 30,
  },
  amountInput: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 30,
  },

  notesLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  notesInput: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 12,
    minHeight: 80,
    marginBottom: 30,
    textAlignVertical: "top",
  },
  transferBtn: {
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
  },
  transferText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
