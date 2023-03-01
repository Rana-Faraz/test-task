import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Modal } from "react-native";
import { TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dimensions } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import { Alert } from "react-native";
import { Vibration } from "react-native";
import Cars from "../../data/cars";
const { height } = Dimensions.get("window");

const AddCarScreen = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [carName, setCarName] = useState("");

  const [carYear, setCarYear] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carRegistartion, setCarRegistartion] = useState("");

  const handleAddCar = () => {
    if (selectedValue === "") {
      Vibration.vibrate([0, 500]);
      Alert.alert("Error", "Please select car");
      return;
    } else if (carName === "") {
      Vibration.vibrate([0, 500]);

      Alert.alert("Error", "Please enter car name");
      return;
    } else if (carYear === "") {
      Vibration.vibrate([0, 500]);

      Alert.alert("Error", "Please enter car year");
      return;
    } else if (carColor === "") {
      Vibration.vibrate([0, 500]);

      Alert.alert("Error", "Please enter car color");
      return;
    } else if (carRegistartion === "") {
      Vibration.vibrate([0, 500]);

      Alert.alert("Error", "Please enter car registration");
      return;
    }

    setLoading(true);
    const collectionRef = collection(db, "cars");
    addDoc(collectionRef, {
      carName: selectedValue + " " + carName,
      carYear,
      carColor,
      carRegistartion,
    })
      .then(() => {
        Alert.alert("Car Added", "Your car has been added successfully", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={loading}
          style={styles.inputField}
          onPress={() => setModalVisible(true)}
        >
          <Text>
            {selectedValue.length === 0 ? "Select Car" : selectedValue}
          </Text>
        </TouchableOpacity>
        <TextInput
          editable={!loading}
          style={styles.inputField}
          placeholder="Enter Car Name"
          placeholderTextColor="#2c2c2c"
          value={carName}
          onChangeText={(text) => setCarName(text)}
        />
        <TextInput
          editable={!loading}
          style={styles.inputField}
          placeholder="Enter Car Year"
          placeholderTextColor="#2c2c2c"
          value={carYear}
          onChangeText={(text) => setCarYear(text)}
          keyboardType="numeric"
        />
        <TextInput
          editable={!loading}
          style={styles.inputField}
          placeholder="Enter Car Color"
          placeholderTextColor="#2c2c2c"
          value={carColor}
          onChangeText={(text) => setCarColor(text)}
        />
        <TextInput
          editable={!loading}
          style={styles.inputField}
          placeholder="Enter Car Registration Number"
          placeholderTextColor="#2c2c2c"
          value={carRegistartion}
          onChangeText={(text) => setCarRegistartion(text)}
          autoCapitalize="characters"
        />
        <TouchableOpacity
          style={styles.button(loading)}
          onPress={handleAddCar}
          disabled={loading}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Add Car</Text>
        </TouchableOpacity>

        {/*  Modal Screen for selecting car */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback>
            <>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={{
                  backgroundColor: "#2c2c2c",
                  opacity: 0.5,
                  flex: 1,
                }}
              />
              <View
                style={{
                  backgroundColor: "white",
                }}
              >
                <View style={styles.actionsBar}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedValue("");
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={{ color: "blue" }}>Cancel</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    Select Car
                  </Text>
                  <TouchableOpacity
                    disabled={selectedValue.length === 0}
                    activeOpacity={1}
                    style={{
                      opacity: selectedValue.length === 0 ? 0.5 : 1,
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                  >
                    <Text style={{ color: "blue" }}>Done</Text>
                  </TouchableOpacity>
                </View>

                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                  mode="dropdown"
                >
                  <Picker.Item color="grey" label="Select Car" value="" />
                  {/* Mapping cars from JSON file in ./src/data/ */}
                  {Cars.map((car, index) => (
                    <Picker.Item
                      key={index}
                      label={car.name}
                      value={car.name}
                    />
                  ))}
                </Picker>
              </View>
            </>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AddCarScreen;

const styles = StyleSheet.create({
  container: {
    height: height * 0.9,
    padding: 20,
  },
  inputField: {
    backgroundColor: "white",
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  actionsBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  button: (loading) => ({
    position: "absolute",
    bottom: 40,
    width: "100%",
    marginHorizontal: 20,
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 10,
    height: 40,
    opacity: loading ? 0.5 : 1,
  }),
});
