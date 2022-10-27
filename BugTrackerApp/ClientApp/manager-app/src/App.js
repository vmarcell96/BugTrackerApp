//Packages
import { Outlet } from "react-router-dom";

//Components
import FlashMessages from "./components/FlashMessages";
import FooterComponent from "./components/FooterComponent";
import Navigation from "./components/Navigation";
//Css
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css'

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
