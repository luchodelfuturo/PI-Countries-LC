import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CountryDetails from './components/CountryDetails/CountryDetails';
import Activities from './components/Activities/Activities';
function App() {
  return (

    <div className="App">
      <BrowserRouter>

        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/home/countries">
            <Home />
          </Route>
          <Route exact path="/country/:cod3letras">
            <CountryDetails />
          </Route>
          <Route path="/activities">
            <Activities />
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
