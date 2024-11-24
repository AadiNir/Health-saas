
import './App.css';
import Imageloader from './Page/Imageloader';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Page/HomePage';

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
