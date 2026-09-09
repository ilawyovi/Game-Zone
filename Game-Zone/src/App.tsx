import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import GameDetailsPage from "./pages/GameDetailsPage";


function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage onSearch={() => {}} />}
      />

      <Route
        path="/game/:slug"
        element={<GameDetailsPage />}
      />
    </Routes>
  );
}

export default App;