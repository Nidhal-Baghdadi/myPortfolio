import { BrowserRouter, Route, Routes } from "react-router";
import ArenaPage from "./pages/ArenaPage";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import CreditsPage from "./pages/CreditsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArenaPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/credits" element={<CreditsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
