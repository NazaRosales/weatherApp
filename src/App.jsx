import "./App.css";
import MainView from "./components/MainView/mainView";
import NextDays from "./components/NextDays/nextDays";
import StoreProvider from "./store/storeProvider";

function App() {
  return (
    <StoreProvider>
      <MainView />
      <NextDays />
    </StoreProvider>
  );
}

export default App;
