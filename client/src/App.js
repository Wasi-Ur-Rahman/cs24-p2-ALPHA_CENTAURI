import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from './components/Auth/Login';
import Registration from './components/Auth/Registration';
import { useAuth } from './contexts/AuthContext';
import Dashboard from './components/Pages/Dashboard';
import Home from './components/Home/Home';
import STS from './components/Pages/STS/STS';
import Landfill from './components/Pages/Landfill/Landfill';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Home />}
        </Route>
        <Route path="/auth/login">
          {isAuthenticated ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/STS">
          {isAuthenticated ? <STS/> : <Redirect to="/" />}
        </Route>
        <Route path="/auth/reset-password">
          <ResetPassword/>
        </Route>
        <Route path="/landfill">
          {isAuthenticated ? <Landfill/> : <Redirect to="/" />}
        </Route>
        <Route path="/auth/register">
          <Registration />
        </Route>
        <Route path="/dashboard">
          {isAuthenticated ? <Dashboard /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
