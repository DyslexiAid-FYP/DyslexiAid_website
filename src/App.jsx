import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, Hero, Stats, Billing, CardDeal, Business, OurTests, Footer, Testimonials, CTA } from "./components";
import styles from "./style";
import DyslexiaTests from "./components/DyslexiaTests"; // Import your test page
import Test1 from "./components/Test1"; // Import Test1 page
//import Test2 from "./components/Test2"; // Import Test2 page
//import Test3 from "./components/Test3"; // Import Test3 page
//import Test4 from "./components/Test4"; // Import Test4 page

const App = () => (
  <Router>
    <MainContent />
  </Router>
);

const MainContent = () => {
  const location = useLocation(); // Get the current location (route)

  // Hide Navbar only for the /tests route and individual test routes
  const hideNavbar = ['/tests', '/test1', '/test2', '/test3', '/test4'].includes(location.pathname);

  return (
    <div className="bg-primary w-full overflow-hidden">
      {/* Conditionally render Navbar */}
      {!hideNavbar && (
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
      )}

      {/* Define Routes */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div>
              <div className={`bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                  <Hero />
                </div>
              </div>
              <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                  <Stats />
                  <Business />
                  <Billing />
                  <CardDeal />
                  <Testimonials />
                  <OurTests />
                  <CTA />
                </div>
              </div>
            </div>
          }
        />

        {/* Dyslexia Tests Page */}
        <Route path="/tests" element={<DyslexiaTests />} />

        {/* Individual Test Pages */}
        <Route path="/test1" element={<Test1 />} />
   
      </Routes>

      {/* Footer (common for all pages) */}
      <div className={`${styles.paddingX} ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
