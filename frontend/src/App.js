import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import SideBar from './components/SideBar'
import Home from './components/Home'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div className="App">
      <SideBar />

      <main>
        <Router>
          <Route path="/" component={Home} />
        </Router>
      </main>
    </div>
  )
}

export default App
