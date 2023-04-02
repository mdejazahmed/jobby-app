/* eslint-disable no-unused-vars */
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobDetails from './pages/JobDetails'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
