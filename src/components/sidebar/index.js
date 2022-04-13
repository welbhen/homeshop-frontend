import './style.css';
import { Dock } from 'react-dock';
import { useState, useEffect } from 'react';
import Product from '../product/list';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const { cart } = useSelector(state => state.products);
    const totalPrice = cart.reduce((totalPrice, product) => {
        return totalPrice + product.price;
    }, 0);
    const [opened, setOpened] = useState(false);

    useEffect(() => { 
        window.addEventListener('openCart', () => {
            setOpened(true);
        });
    }, []);

    return(
        <Dock
            isVisible={opened}
            onVisibleChange={(visible) => {
                setOpened(visible);
            }}
            position="right"
        >
            <div className="container-fluid h-100 pt-4 sidebar">
                <h5>My bag ({cart.length})</h5>
                <div className="row products">
                    {cart.map((p, i) => (
                        <Product key={'cart_product_' + i} {...p}/>
                    ))}
                </div>
                <div className="row align-items-end footer">
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <b className="d-inline-block">Total</b>
                            <h3 className="d-inline-block">R$ {totalPrice.toFixed(2)}</h3>
                        </div>
                        <Link to="/checkout" className="btn btn-block btn-lg btn-secondary rounded-0 align-items-center">Submit order</Link>
                </div>
            </div>

        </Dock>
    );
}

export default Sidebar;