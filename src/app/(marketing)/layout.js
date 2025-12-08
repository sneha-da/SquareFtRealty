import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function MarketingLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
