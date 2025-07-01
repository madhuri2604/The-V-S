import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import VotePage from "./pages/VotePage";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/vote" element={<VotePage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
