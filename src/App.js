import { Route, Routes } from 'react-router-dom'
import Login from "./components/Login";
import Home from "./components/Home";
import { useStateValue } from "./redux/StateProvider";

function App() {
  const { user } = useStateValue()
  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
        <Routes>
          <Route path='/' element={<Home />}  />
          <Route path='/login' element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
