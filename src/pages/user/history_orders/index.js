import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestOldOrdersUser } from '../../../store/modules/products/actions';
import Header from '../../../components/header';
import Order from '../../../components/old_order_user';
import Contact from '../../../components/contact';
import Nav from '../../../components/user_nav';
import './style.css';

//import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const NewOrdersUser = (props) => {
    
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.products);
    const { session } = useSelector((state) => state.user);

    useEffect(() => {
        //console.log("Inside useEffect of /user route!");
        if(session.userID != null){
            dispatch(requestOldOrdersUser(session.userID));
        }
        
    }, [dispatch]);

    //console.log("Inside NewOrdersUser PROPS: " + JSON.stringify(props));
    if(!props.isLogged){
        /*
        Swal.fire({
            icon: 'error',
            title: 'You are not logged-in!',
            text: 'You must be logged-in to have access to this page.'
        });
        */
        return(
            <Navigate replace to="/login" />
        )

    }else {
        //console.log("Inside NewOrdersUser Is admin?: " + props.isAdmin);
        if(props.isAdmin){
            return(
                <Navigate replace to="/admin/stock" />
            )
        } else {
            //console.log("Inside /user route. We have a user and it's not an admin!");
            return (
                <div className="container-fluid h-100">
                    <Header />
                    <Nav/>
                    <div className="container-fluid col-12 order-container">
                        <h1>New Orders</h1>
                        {
                            orders.length > 0
                            ?
                                <div className="row">
                                    {orders.map((order, i) => (
                                        <Order key={'order_' + i} {...order}/>
                                    ))}
                                </div>
                            :
                                <h3>No new orders yet!</h3>
                        }
                    </div>
                    <Contact/>
                </div>
            );
        }
    }
}

export default NewOrdersUser;