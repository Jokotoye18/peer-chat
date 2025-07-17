import BareProvider from "./src/context/BareProvider";
import HomeScreen from "./src/screen/HomeScreen";

import { rpcHandler } from "./src/lib/rpc";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/store";

export default function App() {
  return (
    <Provider store={store}>
      <BareProvider rpcHandler={rpcHandler}>
        <SafeAreaProvider>
          <HomeScreen />
        </SafeAreaProvider>
      </BareProvider>
    </Provider>
  );
}
