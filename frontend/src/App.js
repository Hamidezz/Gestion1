import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import SideBar from './components/SideBar'
import Home from './components/Home'
import CreateDocument from './pages/CreateDocument'
import CreateCategory from './pages/CreateCategory'
import './bootstrap.min.css'

const App = () => {
  return (
    <div className="App">
      <Router>
        <SideBar />
        <main>
          <Route exact path="/" component={Home} />
          <Route
            path="/new_document"
            component={CreateDocument}
          />
          <Route
            path="/new_category"
            component={CreateCategory}
          />
        </main>
      </Router>
    </div>
  )
}

export default App
