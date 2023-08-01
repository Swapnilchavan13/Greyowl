import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginForm } from './Component/Login';
import UploadForm from './Component/Upload';
import Searcher from './Component/Search';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/search" element={<Searcher />} />

          <Route path="/upload" element={<UploadForm />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
