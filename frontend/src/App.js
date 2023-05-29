import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Regiter';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Chat />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/register' element={<Register />}/>
      </Routes>
    </Router>
  );
}

export default App;
