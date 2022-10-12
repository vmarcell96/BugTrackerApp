import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Container } from "react-bootstrap";
import FlashMessages from "./components/FlashMessages";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <div className="row-10">

      <Navigation />
        <FlashMessages />
        <Outlet />
      <FooterComponent />
    </div>
  );
}

export default App;
