import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Equipments from "./pages/Equipments";
import Page404 from "./pages/Page404";
import Services from "./pages/Services";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NewQuote from "./pages/NewQuote";
import SellEquipments from "./pages/SellEquipments";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/equipments" element={<Equipments />} />
          <Route path="/sell-equipments" element={<SellEquipments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/new-quote" element={<NewQuote />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
