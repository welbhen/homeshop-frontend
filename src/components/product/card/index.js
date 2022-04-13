import './style.css';

import { addProductToCart } from '../../../store/modules/products/actions';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Product = (product) => {

    const dispatch = useDispatch();

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
        <div className="product col-3">
            <div>
                
            </div>
            <img src={product.img1} className="img-fluid align-center" alt="Card product"/> 
            <div className="row">
                <div className="col-8">
                    <h4>
                        <label className="badge badge-secondary">R$ {product.price}</label>
                    </h4>
                </div>
                <div className="col-4">
                    <button onClick={() => addToCart()} className="btn btn-add rounded-circle">+</button>
                </div>
            </div>
            <Link to={`/product/${product._id}`} className="product-name">   
                <b>{product.name}</b>
            </Link> 
        </div>
    );
}

export default Product;