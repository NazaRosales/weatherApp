import "./App.css";
import GlobalProvider from "./components/GlobalProvider/GlobalProvider";
import MainView from "./components/MainView/mainView";
import NextDays from "./components/NextDays/nextDays";

function App() {
  return (
    <GlobalProvider>
      <MainView />
      <NextDays />
    </GlobalProvider>
  );
}

export default App;
