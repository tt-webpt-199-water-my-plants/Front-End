import { Route, Switch } from 'react-router-dom'
import Signup from './components/Signup';

function App() {
	return (
    <div className="App">
      <Switch>
        <Route path="/profile">
          
        </Route>
        <Route path="/plants/:id/edit">
          
        </Route>
        <Route path="/plants/add">
          
        </Route>
        <Route path="/plants">
          
        </Route>
        <Route path="/login">
          
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/">
          
        </Route>
      </Switch>
    </div>
  )
}

export default App;
