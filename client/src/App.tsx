import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Result from "./components/Result";

function App() {
  return (
    <div className="text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Result />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
