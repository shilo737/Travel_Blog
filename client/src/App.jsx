import AppRouters from "./routes/AppRouters";
import { Provider } from "react-redux";
import myStore from "./redux/store";

function App() {
  return (
    <Provider store={myStore}>
      <AppRouters />
    </Provider>
  );
}

export default App;
