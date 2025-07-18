import {useState, React} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";



function App() {
  const [colorMode, setColorMode] = useState('dark')
  return (
    <div>
    <Header mode={{colorMode,setColorMode}}/>
      <Router>
        <Routes>
        <Route path="/" element={<Home mode={{colorMode}}/>}/>
        <Route path="/About" element={<About mode={{colorMode, setColorMode}}/>}/>
        </Routes>
      </Router>
    <Footer/>
    </div>
  );
}

export default App;
