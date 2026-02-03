import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage, PrivacyPage, SpacePage } from './pages';
import { AuthGuard } from './components/auth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route
          path="/space"
          element={
            <AuthGuard>
              <SpacePage />
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
