import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <Router>
      <div className="App">
        <AppRoutes />
        <ToastContainer />
      </div>
    </Router>
  );
}
