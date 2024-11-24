
import './App.css';
import Imageloader from './components/Imageloader';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Canva from './components/Canva'
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' Component={HomePage}/>
      {/* <Route path='/imagesize' Component={Canva}/> */}
      <Route path="/imageconfig" Component={Imageloader}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
