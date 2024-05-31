import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import { SupabaseProvider } from "./integrations/supabase/index.js";

function App() {
  return (
    <Router>
      <SupabaseProvider>
        <Routes>
          <Route exact path="/" element={<Index />} />
        </Routes>
      </SupabaseProvider>
    </Router>
  );
}

export default App;
