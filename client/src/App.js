import React from "react"
import Header from "./components/Header"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Footer from "./components/Footer"
import { Container } from "react-bootstrap"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen"
import PlaceOrderScreen from "./screens/PlaceOrderScreen"
import OrderScreen from "./screens/OrderScreen"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"
import ProductEditScreen from "./screens/ProductEditScreen"
import OrderListScreen from "./screens/OrderListScreen"

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main className="py-3">
          <Container>
            <Route path="/login" component={LoginScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/orders/:id" component={OrderScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route exact path="/" component={HomeScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/admin/userlist" component={UserListScreen} />
            <Route
              path="/admin/productlist"
              component={ProductListScreen}
              exact
            />
            <Route
              path="/admin/productlist/:pageNumber"
              exact
              component={ProductListScreen}
            />
            <Route path="/admin/orderlist" component={OrderListScreen} />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            <Route path="/search/:keyword" component={HomeScreen} exact />
            <Route path="/page/:pageNumber" component={HomeScreen} />
            <Route
              path="/search/:keyword/page/:pageNumber"
              component={HomeScreen}
            />
          </Container>
        </main>
      </Container>
      <footer>
        <Footer />
      </footer>
    </Router>
  )
}

export default App
