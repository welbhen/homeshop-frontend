import Header from '../../../components/header';
import Product from '../../../components/product/card_admin';
import Contact from '../../../components/contact';
import Nav from '../../../components/admin_nav';

import { requestStock } from '../../../store/modules/products/actions';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const Stock = (props) => {

    const dispatch = useDispatch();
    const { stock } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(requestStock());
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
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>Products In Stock</h4>
                            <br/>
                            <div className="row">
                                {stock.map((p, i) => (
                                    <Product key={'product_' + i} {...p}/>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Contact/>
            </div>
        );
    }
}

export default Stock;