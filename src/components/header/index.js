import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';
import './style.css';

const Header = (props) => {
    //{hideCart, hideUser} => props
    const { cart } = useSelector(state => state.products);

    /* USER SESSION: */
    const { session } = useSelector(state => state.user);
        /*
        if(session.userID != null && session.isAuthenticated) {
            //we have an authenticated user (persisting inside local storage)
            console.log("We have a user.");
        }else {
            //we don't have a user
            console.log("We don't have any user.");
        }
        */
    /* ############# */

    const openDrawer = () => {
        const event = new CustomEvent('openCart');
        window.dispatchEvent(event);
    }

    return (
        <div className="col-12">
            <header className="py-4 px-4 text-center">
                <Link to="/">
                    <img src={Logo} className="img-fluid" alt="Logo"/>
                </Link>
            </header>
            {!props.hideCart && (
                <button onClick={() => openDrawer()} className="btn btn-secondary cart-button">
                    <span className="mdi mdi-cart"> {cart.length} Items</span>
                </button>
            )}
            {!props.hideUser && (
                <Link className="link" to="/user">
                    <span className="mdi mdi-account btn btn-secondary user-button">
                        {session.isAuthenticated ? ` ${session.userName}` : ' Log-in'}
                    </span>
                </Link>    
            )}
        </div>
    );
};

export default Header;