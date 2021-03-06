import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { requestNewOrders } from '../../../store/modules/products/actions';
import Header from '../../../components/header';
import Order from '../../../components/new_order';
import Contact from '../../../components/contact';
import Nav from '../../../components/admin_nav';

import './style.css';

const NewOrders = (props) => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.products);
    //console.log(orders);

    useEffect(() => {
        dispatch(requestNewOrders());
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

export default NewOrders;