import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGOUT } from "../../redux/actions";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
import { ActivityIndicator } from "react-native";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // Logout Function
  const handleLogout = () => {
    console.log("Logout");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        AsyncStorage.removeItem("user");
        dispatch({ type: LOGOUT });
      })
      .catch((error) => {
        console.log("An error happened.", error);
      });
  };

  const getCars = () => {
    setLoading(true);
    const collectionRef = collection(db, "cars");

    onSnapshot(collectionRef, (querySnapshot) => {
      const car = [];
      querySnapshot.forEach((doc) => {
        car.push({ ...doc.data(), id: doc.id });
      });
      setCars(car);
      setLoading(false);
    });
  };

  useEffect(() => {
    getCars();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating={true} color="#2c2c2c" />
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
            }}
          >
            Loading...
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={{ textAlign: "center" }}>
            Available Cars: {cars.length}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Add Car")}
            style={styles.listItem}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Feather name="plus" size={24} color="black" />
              <Text
                variant="titleMedium"
                style={{
                  marginLeft: 34,
                }}
              >
                Add Cars
              </Text>
            </View>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("All Cars", { cars })}
            style={styles.listItem}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="layers-outline" size={24} color="black" />
              <Text
                variant="titleMedium"
                style={{
                  marginLeft: 34,
                }}
              >
                All Cars
              </Text>
            </View>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={{ color: "white", textAlign: "center" }}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    marginHorizontal: 20,
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 10,
    height: 40,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ececec",
    marginTop: 20,
  },
});
