import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/modules/user/actions';
import Swal from 'sweetalert2';

import './style.css';

const Contact = () => {
    const dispatch = useDispatch();
    const logout = () => {
        //console.log("Clicked 'logout' button!");
        Swal.fire({
            title: 'Are you sure you want to logout?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                
                dispatch(logoutUser());
            }
        }).catch((err) => {
              console.log("An error occured. Error: " + err);
        });
    }

    return(
        <div className="box col-12 footer">
            <div className="row align-items-center">
                <div className="col-4 first" >
                    <h4>9090 Destiny USA Drive</h4>
                    <h5>Syracuse, NY 13204</h5>
                    <h5>(315) 466-6000</h5>
                    <a className="btn btn-sm btn-map" href="https://www.google.com/maps?q=9090+Destiny+USA+Drive+Syracuse+NY+13204" target="_blank" rel="noreferrer">
                        <span className="mdi mdi-google-maps"> Map</span>
                    </a>
                </div>
                <div className="col-4 second">
                    <a className="btn btn-sm btn-media" href="https://www.instagram.com/instagram/" target="_blank" rel="noreferrer">
                        <span className="mdi mdi-instagram"> Instagram</span>
                    </a>
                    <br/>
                    <a className="btn btn-sm btn-media" href="mailto:welberth_henrique@hotmail.com" target="_blank" rel="noreferrer">
                        <span className="mdi mdi-email"> E-mail</span>
                    </a>
                    <br/>
                    <a className="btn btn-sm btn-media" href="https://www.facebook.com/Meta" target="_blank" rel="noreferrer">
                        <span className="mdi mdi-facebook"> Facebook</span>
                    </a>
                    <br/>
                    <a className="btn btn-sm btn-media" href="https://welbhen.github.io/" target="_blank" rel="noreferrer">
                        <span className="mdi mdi-github"> Portfolio</span>
                    </a>
                </div>
                <div className="col-4 third">
                    <Link to="/login" className="btn btn-sm btn-media">
                        <span className="mdi mdi-login"> Login</span>
                    </Link>
                    <br/>
                    <Link to="/register" className="btn btn-sm btn-media">
                        <span className="mdi mdi-account-plus"> Sign-in</span>
                    </Link>
                    <br/>
                    <button
                        onClick={() => logout()} 
                        className="btn btn-sm btn-media">
                            <span className="mdi mdi-account-arrow-right"> Logout</span>
                    </button>
                    <br/>
                    <Link to="/checkout" className="btn btn-sm btn-media">
                        <span className="mdi mdi-cart-arrow-right"> Checkout</span>
                    </Link>                
                </div>
            </div>
            <div className="row text-center py-4">
                <span className="mdi mdi-alert-circle"><small> Disclaimer: This is not a real website.</small></span>
                
            </div>
        </div>    
        
    );
};

export default Contact;