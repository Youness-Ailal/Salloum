import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";

function MainLayout2({ children }) {
  return (
    <div className="min-h-screen flex flex-col ">
      <Nav />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout2;
