
import Navbar from "./components/layout/Navbar"
import AllCharacters from "./components/AllCharacters"
import './App.css'
function App() {
  return (
    <div className="App">
      <Navbar />
        <div className="container mx-auto">
          <AllCharacters  />
        </div>
    </div>
  );
}

export default App;
