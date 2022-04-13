import './style.css';

import { removeProductFromCart } from '../../../store/modules/products/actions';
import { useDispatch } from 'react-redux';

const Product = (product) => {

    const dispatch = useDispatch();

    return (
        <div className="product-list col-12">
            <div className="row">
                <div className="col-3">
                    <img src={product.img1} className="img-fluid" alt="List product"/>
                </div>
                <div className="col-6">
                    <small>
                        <b>{product.name}</b>
                    </small>
                    <h6>
                        R$ {product.price}
                    </h6>
                </div>
                <div className="col-3">
                    <button onClick={() => dispatch(removeProductFromCart(product))}  className="btn btn-delete rounded-circle">-</button>
                </div>
            </div>
        </div>

    );
}

export default Product;