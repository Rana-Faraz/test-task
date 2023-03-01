import {
  ActivityIndicator,
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
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { Alert } from "react-native";
import { Vibration } from "react-native";

const { height, width } = Dimensions.get("window");

const AllCarsScreen = ({ navigation, route }) => {
  const [cars, setCars] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [car, setCar] = useState("");
  const [carName, setCarName] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carColor, setCarColor] = useState("");
  const [carRegistartion, setCarRegistartion] = useState("");
  const [carID, setCarID] = useState(0);

  const handleSelection = (itemValue) => {
    setSelectedValue(itemValue);
    cars.map((car) => {
      if (car.carName === itemValue) {
        setCarName(car.carName);
        setCarYear(car.carYear);
        setCarColor(car.carColor);
        setCarRegistartion(car.carRegistartion);
        setCarID(car.id);
      }
    });
  };

  const handleUpdate = () => {
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
    const docRef = doc(db, "cars", carID);

    updateDoc(docRef, {
      carName: carName,
      carYear: carYear,
      carColor: carColor,
      carRegistartion: carRegistartion,
    })
      .then(() => {
        setSelectedValue("");
        setCarName("");
        setCarYear("");
        setCarColor("");
        setCarRegistartion("");
        Alert.alert("Car Updated");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleDelete = () => {
    setLoading(true);

    const docRef = doc(db, "cars", carID);

    deleteDoc(docRef)
      .then(() => {
        setSelectedValue("");
        setCarName("");
        setCarYear("");
        setCarColor("");
        setCarRegistartion("");
        Alert.alert("Car Deleted");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      })
      .finally(() => {
        setLoading(false);
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
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#2c2c2c" />
          <Text
            style={{ color: "#2c2c2c", textAlign: "center", marginTop: 10 }}
          >
            Loading...
          </Text>
        </View>
      ) : (
        <KeyboardAwareScrollView>
          <View style={styles.container}>
            <Text>Select Car</Text>
            <TouchableOpacity
              disabled={loading}
              style={styles.inputField}
              onPress={() => setModalVisible(true)}
            >
              <Text>
                {selectedValue.length === 0 ? "Select Car" : selectedValue}
              </Text>
            </TouchableOpacity>
            {selectedValue.length > 0 && (
              <>
                <View
                  style={{
                    backgroundColor: "#2c2c2c",
                    width: width * 0.9,
                    height: 1,
                    marginVertical: 10,
                  }}
                />
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
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={styles.button(loading)}
                    onPress={handleUpdate}
                    disabled={loading}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Update Car
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonDelete(loading)}
                    onPress={handleDelete}
                    disabled={loading}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Delete Car
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
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
                      onValueChange={(itemValue) => handleSelection(itemValue)}
                      mode="dropdown"
                    >
                      <Picker.Item color="grey" label="Select Car" value="" />
                      {/* Mapping cars from JSON file in ./src/data/ */}
                      {cars?.map((car, index) => (
                        <Picker.Item
                          key={index}
                          label={car.carName}
                          value={car.carName}
                        />
                      ))}
                    </Picker>
                  </View>
                </>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
};

export default AllCarsScreen;

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
  buttonView: {
    flexDirection: "row",
    position: "absolute",
    bottom: 40,
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  button: (loading) => ({
    width: width * 0.4,
    bottom: 40,
    backgroundColor: "#2c2c2c",
    padding: 10,
    borderRadius: 10,
    height: 40,
    opacity: loading ? 0.5 : 1,
  }),
  buttonDelete: (loading) => ({
    width: width * 0.4,
    bottom: 40,
    backgroundColor: "#cb3220",
    padding: 10,
    borderRadius: 10,
    height: 40,
    opacity: loading ? 0.5 : 1,
  }),
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
