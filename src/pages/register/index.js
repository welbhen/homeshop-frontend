import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { setCustomer as setStoreCustomer, registerUser} from '../../store/modules/user/actions';
import Illustration from '../../assets/illustration.png';
import Header from '../../components/header';
import Contact from '../../components/contact';

import './style.css';

const Register = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const [customer, setCustomer] = useState({
        _id: Date.now().toString(),
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const signIn = () => {        
        dispatch(setStoreCustomer(customer));
        setTimeout(() => {
            dispatch(registerUser());
            setTimeout(() => {
                navigate('/login');
            }, 100);
        }, 100); 
    };

    if(props.isLogged){
        Swal.fire({
            icon: 'success',
            title: 'Oops...',
            text: 'You are already logged-in!'
        });
        return(
            <Navigate replace to="/" />
        )

    }else {

        return (
            <div className="container-fluid h-100 bg-primary">
                <Header hideCart/>
                <div className="row">
                    <div className="col-6 text-right my-auto">
                        <img src={Illustration} className="img-fluid" alt="Illustration"/>
                    </div>
                    <div className="col-6">
                        <div className="box col-12">
                            <h2 className="text-center">Let's trasform your work space.</h2>
                            <br/>
                            <input type="text" className="form-control form-control-lg mb-3" placeholder="Name"
                                onChange={(e) => {
                                    setCustomer({ ...customer, name: e.target.value});
                                }}
                            />
                            <input type="email" className="form-control form-control-lg mb-3" placeholder="E-mail"
                                onChange={(e) => {
                                    setCustomer({ ...customer, email: e.target.value});
                                }}
                            />
                            <input type="password" className="form-control form-control-lg mb-3" placeholder="Password"
                                onChange={(e) => {
                                    setCustomer({ ...customer, password: e.target.value});
                                }}
                            />
                            <input type="password" className="form-control form-control-lg mb-3" placeholder="Repeat your password"
                                onChange={(e) => {
                                    setCustomer({ ...customer, password2: e.target.value});
                                }}
                            />
                            <small className="password-instructions">
                                <b>Password must contain:</b><br/>
                                <ul>
                                    <li>at least 8 characters (no more than 20),</li>
                                    <li>at least 1 number,</li>
                                    <li>at least 1 lowercase character (a-z),</li>
                                    <li>at least 1 uppercase character (A-Z),</li>
                                    <li>only english alphanumeric characters.</li>
                                </ul>
                            </small>
                            <button
                                onClick={() => signIn()}
                                className="btn btn-lg btn-block btn-secondary col-12"
                            >
                                Start shopping
                            </button>
                        </div>
                    </div>
                </div>
                <Contact/>
            </div>
        );
    }
};

export default Register;