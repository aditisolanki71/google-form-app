import './App.css';
import Header from "./components/layouts/header"
import { BrowserRouter as Router ,Switch, Route } from "react-router-dom"
import GoogleForm from './components/google-form/google-form'
import UserForm from './components/view-form/user-form'
import NotFound from './components/not-found'
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/form/:id" exact component={GoogleForm} />
        <Route path="/response">
                 <UserForm />
        </Route>
        <Route path="/" exact component={Header} />
        <Route exact component={NotFound} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
