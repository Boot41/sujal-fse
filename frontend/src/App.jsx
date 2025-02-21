import React from 'react'
import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import About from './Pages/About';
import Pricing from './Pages/Pricing';

const App = () => {
  return (
    <>
    <Navbar/>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Router>
    </>
  )
}

export default App