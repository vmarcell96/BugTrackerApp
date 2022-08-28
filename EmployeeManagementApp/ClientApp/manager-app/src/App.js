import { BrowserRouter, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="container">
      <header className="App-header">
        <Container>
          <Navigation/>
        </Container>
      </header>
      <Container className='content-container'>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
