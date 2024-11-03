
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Home from './Components/Home';
import ForgetPassword from "./Components/ForgetPassword";
import NewSubmit from "./Components/NewSubmit";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/' element={<Home />}/>
          <Route path='/forget-pass' element={<ForgetPassword />}/>
          <Route path='/otp' element={<NewSubmit />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
