import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Navigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { setCustomer as setStoreCustomer, loginUser} from '../../store/modules/user/actions';
import Illustration from '../../assets/illustration.png';
import Header from '../../components/header';
import Contact from '../../components/contact';

import './style.css';

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const [customer, setCustomer] = useState({
        email: '',
        password: ''
    });

    const logInUser = () => {        
        dispatch(setStoreCustomer(customer));
        setTimeout(() => {
            dispatch(loginUser());
            navigate('/');
        }, 500);
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
                <Header hideCart hideUser/>
                <div className="row">
                    <div className="col-6 text-right my-auto">
                        <img src={Illustration} className="img-fluid" alt="Illustration"/>
                    </div>
                    <div className="col-6">
                        <div className="box col-12">
                            <h2 className="text-center">Enter your credentials:</h2>
                            <br/>
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
                            <button
                                onClick={() => logInUser()}
                                className="btn btn-lg btn-block btn-secondary col-12"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
                <Contact/>
            </div>
        );
    }
};

export default Login;