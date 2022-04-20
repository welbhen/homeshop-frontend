import { Link } from 'react-router-dom';

import './style.css';

const Product = (product) => {
    
    return (
        <div className="product col-3">
            <img src={product.img1} className="img-fluid align-center" alt="Card product"/> 
            <div className="row">
                <div className="col-12 labels">
                    <small>
                        <label className="badge badge-secondary">R$ {product.price}</label>
                    </small>
                    <small>
                        <label className="badge badge-secondary">{product.quantity} left</label>
                    </small>
                </div>
            </div>
            <Link to={`/product/${product._id}`} className="product-name" target="_blank" rel="noreferrer">   
                <b>{product.name}</b>
            </Link> 
        </div>
    );
}

export default Product;