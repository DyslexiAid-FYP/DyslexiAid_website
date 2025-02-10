import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Hero, Stats, Billing, Business, OurTests } from "./components";
import styles from "./style";
import DyslexiaTests from "./components/DyslexiaTests";
import Test1 from "./components/Test1";
import Test2 from "./components/Test2";
import Test3 from "./components/Test3";
import Test4 from "./components/Test4";
import Auth from "./components/auth";

const App = () => (
  <Router>
    <MainContent />
  </Router>
);

const MainContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // Hide navbar on test pages
  const hideNavbar = ['/tests', '/test1', '/test2', '/test3', '/test4'].includes(location.pathname);

  // Login Success Handler
  const handleAuthSuccess = () => {
    localStorage.setItem("isAuthenticated", "true"); // Save login state
    setIsAuthenticated(true);
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="bg-primary ">
      {!hideNavbar && isAuthenticated && (
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar onLogout={handleLogout} /> {/* Pass logout function to Navbar */}
          </div>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <div>
                <div className={`bg-primary ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Hero />
                    <Stats />
                    <Business />
                    <Billing />
                    <OurTests />
                  </div>
                </div>
              </div>
            ) : (
              <Auth onAuthSuccess={handleAuthSuccess} />
            )
          }
        />

        {isAuthenticated && (
          <>
            <Route path="/tests" element={<DyslexiaTests />} />
            <Route path="/test1" element={<Test1 />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/test4" element={<Test4 />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
