import Navbar from "../../components/navbar.jsx";

export default function MarketingLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
