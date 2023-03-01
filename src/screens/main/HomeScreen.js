import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGOUT } from "../../redux/actions";

const HomeScreen = () => {
  const dispatch = useDispatch();

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

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={{ color: "white", textAlign: "center" }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    height: 40,
  },
});
