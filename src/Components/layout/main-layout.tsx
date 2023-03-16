import { PropsWithChildren } from "react";
import Footer from "./footer";
import NavBar from "./navbar";

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <NavBar />
      <main className="min-h-main">{children}Test</main>
      <Footer />
    </div>
  );
};


export default MainLayout;
