//Packages
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
//Components
import FlashMessages from "./components/FlashMessages";
import FooterComponent from "./components/FooterComponent";
import Navigation from "./components/Navigation";
//Css
import './app.css'

function App() {
  return (
    <div className="row-10">
      <Navigation />
      <FlashMessages />
      <Container>
        <Outlet />
      </Container>
      <FooterComponent />
    </div>
  );
}

export default App;
