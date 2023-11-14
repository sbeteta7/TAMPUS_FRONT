import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from "./Login";
import Navegar from "./Navegar";
import Home from "./Home";
import Publicar from "./Publicar";


function App() {
  return (
    <div className="">
      <Router>
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Navegar" element={<Navegar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/publicar" element={<Publicar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
