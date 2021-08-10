import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import SideBar from './components/SideBar'
import Header from './components/Header'
import Home from './components/Home'
import CreateDocument from './pages/CreateDocument'
import CreateCategory from './pages/CreateCategory'
import ViewDocuments from './pages/ViewDocuments'
import ViewCategories from './pages/ViewCategories'
import ViewCollections from './pages/ViewCollections'
import PlaceOrder from './pages/PlaceOrder'
import ViewOrders from './pages/ViewOrders'
import ViewHistory from './pages/ViewHistory'
import UpdateDocument from './pages/UpdateDocument'
import Login from './pages/Login'
import Register from './pages/Register'
import './bootstrap.min.css'
import { SocketProvider } from './context/socket'
import { MessageProvider } from './context/message'
import { SideBarProvider } from './context/sideBar'
import { PdfProvider } from './context/pdfGenerator'

const App = () => {
  return (
    <SocketProvider>
      <div className="App">
        <Router>
          <PdfProvider>
          <SideBarProvider>
            <SideBar />

            <MessageProvider>
              <Home>
                <Header />
                <Route exact path="/">
                  welcome page customize it as you want
                </Route>
                <Route
                  exact
                  path="/documents"
                  component={ViewDocuments}
                />
                <Route
                  exact
                  path="/documents/:id"
                  component={UpdateDocument}
                />
                <Route
                  path="/new_document"
                  component={CreateDocument}
                />
                <Route
                  path="/categories"
                  component={ViewCategories}
                />
                <Route
                  path="/new_category"
                  component={CreateCategory}
                />
                <Route
                  path="/collections"
                  component={ViewCollections}
                />
                <Route
                  path="/orders"
                  component={ViewOrders}
                />
                <Route
                  path="/login"
                  component={Login}
                />
                <Route
                  path="/register"
                  component={Register}
                />
                <Route
                  path="/place_orders"
                  component={PlaceOrder}
                />
                <Route
                  path="/history"
                  component={ViewHistory}
                />
              </Home>
            </MessageProvider>
          </SideBarProvider>
          </PdfProvider>
        </Router>
      </div>
    </SocketProvider>
  )
}

export default App
