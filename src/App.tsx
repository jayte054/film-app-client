import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserProvider } from "./authcontext/authContext";
import { AdminFilmPage } from "./pages/adminPage/adminFilmPage";
import { AdminPage } from "./pages/adminPage/adminPage";
import { AdminReportsPage } from "./pages/adminPage/adminReportsPage";
import { AuthPage } from "./pages/authpage/authPage";
import { HomePage } from "./pages/filmPage/homePage";
import { PurchasePage } from "./pages/purchasePage/purchasePage";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/adminPage" element={<AdminPage />} />
            <Route path="/purchasePage" element={<PurchasePage />} />
            <Route path="/adminFilmPage" element={<AdminFilmPage />} />
            <Route path="/adminReportsPage" element={<AdminReportsPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
