import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

import { setTransaction as setStoreTransaction, makePurchase as makeStorePurchase } from '../../store/modules/products/actions';
import Header from "../../components/header";
import Product from "../../components/product/list";
import Contact from '../../components/contact';

import './style.css';

const Checkout = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cart } = useSelector(state => state.products);
    const { session } = useSelector(state => state.user);

    const productsPrice = cart.reduce((productsPrice, product) => {
        return productsPrice + product.price;
    }, 0);

    const [transaction, setTransaction] = useState({
        orderNumber: Date.now().toString(), //not the perfect unique ID generator
        listproducts: cart,
        productsPrice,
        shipping: {
            shippingPrice: 30,
            street: '',
            number: '',
            zip: '',
            city: '',
            state: '',
            deliveryDate: dayjs().add(10, 'day').format('YYYY-MM-DD')
        },
        customer: {
            name: session.userName,
            email: session.userEmail
        },
        payment: {
            cardNumber: '',
            goodThru: '',
            cvv: '',
            cardholder: '',
            id: ''
        }
    });

    const setPaymentInfos = (key, value) => {
        setTransaction({
            ...transaction,
            payment: {
                ...transaction.payment,
                [key]: value
            }
        })
    };
    const setShippingInfos = (key, value) => {
        setTransaction({
            ...transaction,
            shipping: {
                ...transaction.shipping,
                [key]: value
            }
        })
    };

    const makePurchase = () => {
        dispatch(setStoreTransaction(transaction));
       setTimeout(() => {
           dispatch(makeStorePurchase());
           navigate('/user');
       }, 500);
    }
    //console.log("Is logged? " + props.isLogged);
    //console.log("Is Admin? " + props.isAdmin);

    if(!props.isLogged){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You must be logged-in to access this page'
        });
        return(
            <Navigate replace to="/" />
        )

    }else {
        return(
            <div className="container-fluid h-100">
                <Header hideCart hideUser/>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col-6">
                            <span className="section-title">Shipping address</span>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <input
                                        onChange={(e) => setShippingInfos('street', e.target.value)}
                                        type="text" className="form-control form-control-lg" placeholder="Street"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <input
                                        onChange={(e) => setShippingInfos('number', e.target.value)}
                                        type="text" className="form-control form-control-lg" placeholder="Apt/number etc."
                                    />
                                </div>                
                                <div className="col-6 pl-0">
                                    <input
                                        onChange={(e) => setShippingInfos('zip', e.target.value)}
                                        type="text" className="form-control form-control-lg" placeholder="Zip/Postal code"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <input
                                        onChange={(e) => setShippingInfos('city', e.target.value)}
                                        type="text" className="form-control form-control-lg" placeholder="City"
                                    />
                                </div>                
                                <div className="col-6 pl-0">
                                    <input
                                        onChange={(e) => setShippingInfos('state', e.target.value)}
                                        type="text" className="form-control form-control-lg" placeholder="State/Region"
                                    />
                                </div>
                            </div>

                            <span className="section-title">Payment</span>
                            <div className="row mb-3">
                                <div className="col-12">
                                    <input
                                        onChange={(e) => setPaymentInfos('cardNumber', e.target.value)}
                                        type="text" className="form-control form-control-lg" placeholder="Card Number"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <input
                                        onChange={(e) => setPaymentInfos('goodThru', e.target.value)}
                                        type="month" className="form-control form-control-lg" placeholder="Good thru"
                                    />
                                </div>                
                                <div className="col-6 pl-0">
                                    <input
                                        onChange={(e) => setPaymentInfos('cvv', e.target.value)}
                                        type="text" className="form-control form-control-lg" placeholder="CVV"
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <input
                                        onChange={(e) => setPaymentInfos('cardholder', e.target.value)}
                                        type="text" className="form-control form-control-lg" placeholder="Cardholder's name"
                                    />
                                </div>                
                                <div className="col-6 pl-0">
                                    <input
                                        onChange={(e) => setPaymentInfos('id', e.target.value)}
                                        type="text" className="form-control form-control-lg" placeholder="ID/CPF"
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 d-flex justify-content-between align-items-center">
                                    <b>Products Total</b>
                                    <h4>R$ {productsPrice.toFixed(2)}</h4>
                                </div>
                                <div className="col-12 d-flex justify-content-between align-items-center">
                                    <b>Shipping</b>
                                    <h4>R$ {transaction.shipping.shippingPrice.toFixed(2)}</h4>
                                </div>
                                <div className="col-12 d-flex justify-content-between align-items-center">
                                    <b>Total</b>
                                    <h3>R$ {(productsPrice + transaction.shipping.shippingPrice).toFixed(2)}</h3>
                                </div>
                                <div className="col-12">
                                    <button
                                        onClick={() => makePurchase()}
                                        className="btn btn-block btn-lg btn-secondary col-12">
                                            Checkout
                                    </button>
                                </div>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                        </div>
                        <div className="col-6 mt-3">
                            <div className="box col mb-4 box-sidebar">
                                <h4>My bag ({cart.length})</h4>

                                <div className="row products">
                                    {cart.map((p, i) => (
                                        <Product key={'ckout_product_' + i} {...p}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Contact/>
            </div>

        );
    }
}

export default Checkout;