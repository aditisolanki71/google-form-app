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
        {/* Design your own google form */}
        <Route path="/form/:id" exact component={GoogleForm} />
        {/* User get Designed form question List*/}
        <Route path="/response" exact component={UserForm} />
        {/* Form Listing Default Page */}
        <Route path="/" exact component={Header} />
        <Route exact component={NotFound} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
