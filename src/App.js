import "./App.css";
import Input from "./components/Input";
import TopButtons from "./components/TopButtons";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperaturDetails from "./components/TemperaturDetails";
import Forecast from "./components/Forecast";

function App() {
  return (
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons />
      <Input />
      <TimeAndLocation />
      <TemperaturDetails />
      <Forecast title="Hourly Forecast" />
    </div>
  );
}

export default App;
