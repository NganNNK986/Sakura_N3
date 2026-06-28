import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { StoreProvider, useStore } from "./store/useStore";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import Mascot from "./components/layout/Mascot";
import PetalRain from "./components/PetalRain";
import Dashboard from "./pages/Dashboard";
import Vocab from "./pages/Vocab";
import Kanji from "./pages/Kanji";
import Grammar from "./pages/Grammar";
import Conjugation from "./pages/Conjugation";
import Keigo from "./pages/Keigo";
import Adverbs from "./pages/Adverbs";
import Tulays from "./pages/Reduplication";
import JlptTraps from "./pages/JlptTraps";
import Profile from "./pages/Profile";
import "./index.css";

function Layout() {
  const { state } = useStore();
  if (!state.profile) return <Profile isSetup />;
  return (
    <div className="app-layout">
      <PetalRain />
      <Sidebar />
      <div className="main-content">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vocab" element={<Vocab />} />
          <Route path="/kanji" element={<Kanji />} />
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/conjugation" element={<Conjugation />} />
          <Route path="/keigo" element={<Keigo />} />
          <Route path="/adverbs" element={<Adverbs />} />
          <Route path="/tulays" element={<Tulays />} />
          <Route path="/traps" element={<JlptTraps />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Mascot />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Layout />
      </HashRouter>
    </StoreProvider>
  );
}
