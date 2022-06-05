import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
const Home = React.lazy(() => import("Views/Home"));
const About = React.lazy(() => import("Views/About"));
const Payment = React.lazy(() => import("Views/Payment"));
const Layout = React.lazy(() => import("Components/Layout"));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="about"
            element={
              <React.Suspense fallback={<>...</>}>
                <About />
              </React.Suspense>
            }
          />
          <Route
            path="payment"
            element={
              <React.Suspense fallback={<>...</>}>
                <Payment />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
