import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Sidebar from './components/sidebar';
import { useSelector } from 'react-redux';

// Main routes:
    import Checkout from './pages/checkout/';
    import Chairs from './pages/department/chairs';
    import Desks from './pages/department/desks';
    import Lighting from './pages/department/lighting';
    import Register from './pages/register/';
    import Product from './pages/product/';
    import Home from './pages/home/';
    import Login from './pages/login/';
// Admin routes:
    import Stock from './pages/admin/stock';
    import AddProduct from './pages/admin/add_product';
    import NewOrders from './pages/admin/new_orders';
    import HistoryOrders from './pages/admin/history_orders';
// User routes:
    import NewOrdersUser from './pages/user/orders';
    import UserHistoryOrders from './pages/user/history_orders';
    
const MyRoutes = () => {
    // Session check:
    let isLogged = false;
    let isAdmin = false;
    const { session } = useSelector(state => state.user);
    if(session.userID != null && session.isAuthenticated) {
        isLogged = true;
        if(session.userIsAdmin) {
            isAdmin = true;
        }
    }
    
    /********  FORMER: ***************************
    <Route path="/login" element={<Login />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/register" element={<Register />} />

    <Route path="/checkout"
        element={session.isAuthenticated ? <Checkout {...isLogged} {...isAdmin} /> : <Navigate replace to="/login"/>}
    />
    <Route path="/login"
        element={session.isAuthenticated ? <Navigate replace to="/" /> : <Login />}
    />
    <Route path="/register"
        "element={session.isAuthenticated ? <Navigate replace to="/" /> : <Register />}
    />"
    *********************************************/

    return(
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/user" element={<NewOrdersUser isLogged={isLogged} isAdmin={isAdmin} />} />
                    <Route path="/user/history" element={<UserHistoryOrders isLogged={isLogged} isAdmin={isAdmin} />} />
                    <Route path="/department/chairs" element={<Chairs />} />
                    <Route path="/department/desks" element={<Desks />} />
                    <Route path="/department/lighting" element={<Lighting  />} />
                    <Route path="/checkout" element={<Checkout isLogged={isLogged} isAdmin={isAdmin} />} />
                    <Route path="/login" element={<Login isLogged={isLogged} isAdmin={isAdmin} />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/register" element={<Register isLogged={isLogged} isAdmin={isAdmin} />} />
                    <Route path="/admin/stock" element={<Stock isLogged={isLogged} isAdmin={isAdmin} />} />
                    <Route path="/admin/stock/add" element={<AddProduct isLogged={isLogged} isAdmin={isAdmin} />} />
                    <Route path="/admin/orders/new" element={<NewOrders isLogged={isLogged} isAdmin={isAdmin} />} />
                    <Route path="/admin/orders/history" element={<HistoryOrders isLogged={isLogged} isAdmin={isAdmin} />} />
                </Routes>
                <Sidebar />
            </Router>
        </>
        
        
        
    );
};

export default MyRoutes;