import React, { useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const bankList = [
  {
    id: "bca",
    name: "Bank Central Asia (BCA)",
    logo: require("../../assets/bca-logo.png"),
  },
  {
    id: "bni",
    name: "Bank Negara Indonesia (BNI)",
    logo: require("../../assets/bni-logo.png"),
  },
  {
    id: "bri",
    name: "Bank Rakyat Indonesia (BRI)",
    logo: require("../../assets/bri-logo.png"),
  },
];

const Transfer2BankList = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBank, setSelectedBank] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [isSecure, setSecure] = useState(true);

  const filteredBanks = bankList.filter((bank) =>
    bank.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setAccountNumber("");
    setModalVisible(true);
  };

  const handleContinue = () => {
    setModalVisible(false);
    navigation.navigate("Transfer", {
      selectedBank,
      accountNumber,
    });
  };

  const renderBankItem = ({ item }) => (
    <TouchableOpacity
      style={styles.bankItem}
      onPress={() => handleBankSelect(item)}
    >
      <Image source={item.logo} style={styles.logo} />
      <Text style={styles.bankName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transfer to Bank</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={18}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Bank"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <Text style={styles.sectionTitle}>All Banks</Text>
        <FlatList
          data={filteredBanks}
          keyExtractor={(item) => item.id}
          renderItem={renderBankItem}
        />
      </View>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
            <View style={styles.modalHandle} />

            <Text style={styles.modalLabel}>Destination Bank</Text>
            <View style={styles.bankInfo}>
              {selectedBank?.logo && (
                <Image source={selectedBank.logo} style={styles.logo} />
              )}
              <Text style={styles.bankName}>{selectedBank?.name}</Text>
            </View>

            <Text style={styles.modalLabel}>Destination Account Number</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.accountInput}
                placeholder="Enter account number"
                keyboardType="numeric"
                secureTextEntry={isSecure}
                value={accountNumber}
                onChangeText={setAccountNumber}
              />
              <TouchableOpacity onPress={() => setSecure(!isSecure)}>
                <Ionicons
                  name={isSecure ? "eye-off" : "eye"}
                  size={20}
                  color="#333"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.continueBtn,
                { backgroundColor: accountNumber ? "#6C3EFF" : "#ccc" },
              ]}
              disabled={!accountNumber}
              onPress={handleContinue}
            >
              <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                styles.continueBtn,
                { backgroundColor: "#eee", marginTop: 10 },
              ]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={[styles.continueText, { color: "#6C3EFF" }]}>
                Cancel
              </Text>
            </TouchableOpacity> */}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#6C3EFF" },
  headerContainer: {
    paddingTop: Platform.OS === "android" ? 40 : 50,
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#6C3EFF",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: Platform.OS === "android" ? 40 : 50,
  },
  headerTitle: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  contentContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F1F1",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, fontSize: 16, paddingVertical: 10 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
  bankItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  logo: { width: 32, height: 32, resizeMode: "contain", marginRight: 12 },
  bankName: { flex: 1, fontSize: 16 },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalLabel: { fontSize: 14, fontWeight: "500", marginBottom: 6 },
  bankInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#6C3EFF",
    marginBottom: 30,
  },
  accountInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  continueBtn: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  continueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Transfer2BankList;
