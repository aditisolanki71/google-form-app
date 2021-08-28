import './App.css';
import Header from "./components/layouts/header"
import { BrowserRouter as Router ,Switch, Route } from "react-router-dom"
import GoogleForm from './components/google-form/google-form'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/form/:id" exact component={GoogleForm} />
        <Route path="/" exact component={Header} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
