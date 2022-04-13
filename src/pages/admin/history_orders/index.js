import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestOldOrders } from '../../../store/modules/products/actions';
import Header from '../../../components/header';
import Order from '../../../components/old_order';
import Contact from '../../../components/contact';
import Nav from '../../../components/admin_nav';
import './style.css';

import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const NewOrders = (props) => {
    
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.products);
    //console.log(orders);

    useEffect(() => {
        dispatch(requestOldOrders());
    }, [dispatch]);

    if(!props.isLogged && !props.isAdmin){
        Swal.fire({
            icon: 'error',
            title: 'You are not an admin!',
            text: 'You must be logged-in as admin to have access to this page.'
        });
        return(
            <Navigate replace to="/" />
        )

    }else {

        return (
            <div className="container-fluid h-100">
                <Header hideCart/>
                <Nav/>
                <div className="container-fluid col-12 order-container">
                    <h1>History of Orders</h1>
                    {
                        orders.length > 0
                        ?
                            <div className="row">
                                {orders.map((order, i) => (
                                    <Order key={'order_' + i} {...order}/>
                                ))}
                            </div>
                        :
                            <h3>No history of orders yet!</h3>
                    }
                </div>
                <Contact/>
            </div>
        );
    }
}

export default NewOrders;