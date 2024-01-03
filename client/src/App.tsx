import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Result from "./components/Result";
import AddNew from "./components/AddNew";

function App() {
  return (
    <div className="text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Result />}/>
          <Route path="/new" element={<AddNew />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
