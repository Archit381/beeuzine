import AppNavigation from './app/navigation/appNavigation';
import { LogBox } from "react-native"

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <AppNavigation/>
  );
}
