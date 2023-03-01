import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../firebase";
import { setUser } from "../../redux/actions";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
        <View>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => setPassword(text)}
            value={password}
            editable={!loading}
            secureTextEntry={!passwordVisible}
            keyboardType="default"
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 10,
              top: 12,
            }}
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Text>{passwordVisible ? "Hide" : "Show"}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button(loading)}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Don't have an account?{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() => navigation.navigate("Register")}
          >
            Register
          </Text>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
