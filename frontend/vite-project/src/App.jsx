import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop";

const CountryPage = lazy(() => import("./pages/CountryPage"));
const About = lazy(() => import("./pages/About"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const BudgetCalculator = lazy(() => import("./pages/BudgetCalculator"));

const PageLoader = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fff",
    }}
  >
    <div className="page-loader-spinner"></div>
  </div>
);

function App() {
  return (
    <>
      <ScrollToTop />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mbbs-in/:country" element={<CountryPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/budget-calculator" element={<BudgetCalculator />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;