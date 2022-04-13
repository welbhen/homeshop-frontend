import './style.css';

import { addProductQuantity, subProductQuantity, deleteProduct, requestStock } from '../../../store/modules/products/actions';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Product = (product) => {

    const dispatch = useDispatch();

    const delProduct = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(product._id));
            }
        }).then(() => {
            setTimeout(() => {
                dispatch(requestStock());
            }, 500);
        }).catch((err) => {
              console.log("An error occured. Error: " + err);
        });
    };

    const addProductToStock = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Add 1 unit of this product??',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(addProductQuantity(product._id));
            }
        }).then(() => {
            setTimeout(() => {
                dispatch(requestStock());
            }, 500);
        }).catch((err) => {
              console.log("An error occured. Error: " + err);
        });
    };

    const subProductFromStock = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Subtract 1 unit from this product??',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(subProductQuantity(product._id));
            }
        }).then(() => {
            setTimeout(() => {
                dispatch(requestStock());
            }, 500);
        }).catch((err) => {
              console.log("An error occured. Error: " + err);
        });
    };
    
    return (
        <div className="product col-3">
            <div>
                
            </div>
            <img src={product.img1} className="img-fluid align-center" alt="Card product"/> 
            <div className="row">
                <div className="col-4">
                    <h6>
                        <label className="badge badge-secondary">R$ {product.price}</label>
                    </h6>
                    <h6>
                        <label className="badge badge-secondary">{product.quantity} left</label>
                    </h6>
                </div>
                <div className="col-4 buttons">
                    <button onClick={() => addProductToStock()} className="btn-adm">+</button>
                    <button onClick={() => subProductFromStock()}  className="btn-adm">-</button>
                </div>
                <div className="col-4">
                    <button onClick={() => delProduct()} className="btn-adm-del">Delete</button>
                </div>
            </div>
            <Link to={`/product/${product._id}`} className="product-name" target="_blank" rel="noreferrer">   
                <b>{product.name}</b>
            </Link> 
        </div>
    );
}

export default Product;