import { Outlet } from "react-router-dom";
import HeaderComponent from "./Header.component";
import FooterComponent from "./Footer.component";

const LayoutComponent = () => {
  return (
    <main className=" flex flex-col h-screen p-3 ">
      <HeaderComponent />
      <Outlet />
      <FooterComponent />
    </main>
  );
};

export default LayoutComponent;
