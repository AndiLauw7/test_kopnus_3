import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreens";
import TransferScreen from "./src/screens/TransferScreen";
import Transfer2BankList from "./src/screens/transferScreen2";
import TransferSuccess from "./src/screens/TransferSucces";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home-outline";
          else if (route.name === "Report") iconName = "document-text-outline";
          else if (route.name === "QR") iconName = "qr-code-outline";
          else if (route.name === "History") iconName = "time-outline";
          else if (route.name === "Profile") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6C00FF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Report" component={DummyScreen} />
      <Tab.Screen name="QR" component={DummyScreen} />
      <Tab.Screen name="History" component={DummyScreen} />
      <Tab.Screen name="Profile" component={DummyScreen} />
    </Tab.Navigator>
  );
}

function DummyScreen() {
  return null;
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeTabs} />
        <Stack.Screen name="Transfer" component={TransferScreen} />
        <Stack.Screen name="Transfer2BankList" component={Transfer2BankList} />
        <Stack.Screen name="TransferSuccess" component={TransferSuccess} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
