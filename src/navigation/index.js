import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import HomeStack from "./HomeStack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../redux/actions";

const NavigationRoutes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      if (user) {
        dispatch(setUser(user));
      }
    });
  }, []);
  const { user } = useSelector((state) => state.reducer);
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default NavigationRoutes;
