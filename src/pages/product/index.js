import Header from '../../components/header';
import Tab from '../../components/tab';
import ImageSlider from '../../components/imageSlider';
import './style.css';
import Contact from '../../components/contact';
import { addProductToCart } from '../../store/modules/products/actions';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestProduct } from '../../store/modules/products/actions';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Product = () => {

    const dispatch = useDispatch();
    const { product } = useSelector((state) => state.products);
    const { id } = useParams();
    //console.log("ID:" + id);
    useEffect(() => {
        dispatch(requestProduct(id));
    }, [dispatch]);

    let stockInfo = "";
    if(product.quantity > 0){
        stockInfo = "In Stock";
    }else {
        stockInfo = "Sold Out";
    }

    const addToCart = () => {
        if((product.quantity) <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This product is sold out! :('
            });
        }else {
            dispatch(addProductToCart(product));
        }
    };

    return (
        <div className="container-fluid h-100 bg-primary">
            <Header/>
            <div className="row">
                <div className="col-8 text-right my-auto">
                    <ImageSlider {...product}/>
                </div>
                <div className="col-4">
                    <h2 className="product-title"><b>{product.name}</b></h2>
                    <div className="col-12 d-flex align-items-center">
                        <h6>
                            <label className="badge badge-secondary badge-stock">{stockInfo}</label>
                        </h6>
                        <h6>
                            <label className="badge badge-secondary badge-stock">{product.quantity} left</label>
                        </h6>
                    </div>
                    <div>
                        <Tab {...product}/>
                    </div>
                    <div className="row align-items-end footer">                 
                        <div className="col-12 d-flex justify-content-between align-items-center">
                            <b className="d-inline-block">Product price</b>
                            <h3 className="d-inline-block">R$ {product.price}</h3>
                        </div>
                        <button onClick={() => addToCart()} className="btn btn-block btn-lg btn-secondary rounded-10 h-50 align-items-center">Add to cart</button>
                    </div>
                </div>
            </div>
            <br/>
            <Contact/>
        </div>
    );
};

export default Product;