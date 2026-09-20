import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8">
        <Home />
      </main>
    </ThemeProvider>
  );
}

export default App;
