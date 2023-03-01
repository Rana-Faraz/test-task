import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddCarScreen from "../screens/main/AddCarScreen";
import AllCarsScreen from "../screens/main/AllCarsScreen";
import HomeScreen from "../screens/main/HomeScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Add Car" component={AddCarScreen} />
      <Stack.Screen name="All Cars" component={AllCarsScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
