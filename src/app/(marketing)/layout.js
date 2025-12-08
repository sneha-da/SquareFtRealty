import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";

export default function MarketingLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
