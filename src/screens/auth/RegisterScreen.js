import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { setUser } from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    if (password !== confirmPassword) {
      setLoading(false);
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user.uid;
        // Storing User ID in AsyncStorage
        AsyncStorage.setItem("user", user);
        // Updating Global State with User ID
        dispatch(setUser(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        Alert.alert("Error", errorCode);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Text
        style={{
          marginVertical: 10,
        }}
      >
        Email
      </Text>
      <TextInput
        style={styles.inputField}
        editable={!loading}
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
      />
      <Text
        style={{
          marginVertical: 10,
        }}
      >
        Password
      </Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => setPassword(text)}
        value={password}
        editable={!loading}
        secureTextEntry={true}
        keyboardType="default"
      />
      <Text
        style={{
          marginVertical: 10,
        }}
      >
        Confirm Password
      </Text>
      <TextInput
        style={styles.inputField}
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        editable={!loading}
        secureTextEntry={true}
        keyboardType="default"
      />
      <TouchableOpacity
        style={styles.button(loading)}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Sign Up</Text>
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "center",
          marginTop: 20,
        }}
      >
        Already have an accout?{" "}
        <Text style={{ color: "blue" }} onPress={() => navigation.goBack()}>
          Login
        </Text>
      </Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputField: {
    height: 40,
    borderColor: "#2c2c2c",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  button: (loading) => ({
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 10,
    opacity: loading ? 0.5 : 1,
    marginTop: 20,
    height: 40,
  }),
});
