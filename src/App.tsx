import { BrowserRouter, Route, Routes } from "react-router";
import ArenaPage from "./pages/ArenaPage";
import CreditsPage from "./pages/CreditsPage";
import NotFound from "./pages/NotFound";
import ProjectPage from "./pages/ProjectPage";
import SiteLayout from "./pages/SiteLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* A layout route: its element stays mounted while the pages inside it change. */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<ArenaPage />} />
          <Route path="/projects/:slug" element={<ProjectPage />} />
          <Route path="/credits" element={<CreditsPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
