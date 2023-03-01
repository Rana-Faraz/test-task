import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import NavigationRoutes from "./src/navigation";
import Store from "./src/redux/store";

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationRoutes />
      <StatusBar
        style="dark"
        hidden={false}
        backgroundColor="#fff"
        translucent={false}
        animated={true}
      />
    </Provider>
  );
}
