import { Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import Favorites from "./components/Favorites";
import Movie from "./components/Movie";
import Navbar from "./components/Navbar"
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movie/>} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
