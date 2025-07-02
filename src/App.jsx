import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Navbar, Hero, Stats, Billing, Business, OurTests } from "./components";
import styles from "./style";
import DyslexiaTests from "./components/DyslexiaTests";
import Test1 from "./components/Test1";
import Test2 from "./components/Test2";
import Test3 from "./components/Test3";
import Test4 from "./components/Test4";
import Auth from "./components/auth"; // Keep the import, but we'll comment out its usage

const App = () => (
  <Router>
    <MainContent />
  </Router>
);

const MainContent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const [isAuthenticated, setIsAuthenticated] = useState(
  //   localStorage.getItem("isAuthenticated") === "true"
  // );
  // Temporarily force isAuthenticated to true to bypass auth
  const [isAuthenticated, setIsAuthenticated] = useState(true);


  const hideNavbar = ['/tests', '/test1', '/test2', '/test3', '/test4'].includes(location.pathname);

  // const handleAuthSuccess = () => {
  //   localStorage.setItem("isAuthenticated", "true");
  //   setIsAuthenticated(true);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("isAuthenticated");
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   setIsAuthenticated(false);
  //   navigate("/"); // Redirect to login page
  // };

  return (
    <div className="bg-primary ">
      {/* Conditionally render Navbar based on hideNavbar and isAuthenticated */}
      {/* We are forcing isAuthenticated to true, so Navbar will always show unless hideNavbar is true */}
      {!hideNavbar && isAuthenticated && (
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            {/* Pass an empty function for onLogout if you don't want it to do anything */}
            <Navbar onLogout={() => { /* console.log("Logout functionality commented out."); */ }} />
          </div>
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            // isAuthenticated ? ( // Original conditional rendering based on authentication
            <div> {/* Always render the main content */}
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
            // ) : (
            //   <Auth onAuthSuccess={handleAuthSuccess} /> // Commented out Auth component
            // )
          }
        />

        {/* Since isAuthenticated is forced to true, these routes will always be accessible */}
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