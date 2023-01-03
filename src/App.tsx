import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/users" element={<Users/>}></Route>
          <Route path="/users/:id" element={<User/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
