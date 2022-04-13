import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setProduct as setStoreProduct, registerProduct} from '../../../store/modules/products/actions';

import Header from '../../../components/header';
import Contact from '../../../components/contact';
import Nav from '../../../components/admin_nav';
import './style.css';

import Swal from 'sweetalert2';
import { Navigate } from 'react-router-dom';

const AddProduct= (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const [product, setProduct] = useState({
        _id: Date.now().toString(),
        name: '',
        department: '',
        description: '',
        price: 0,
        additionalInfo: '',
        quantity: 0,
        img1: '',
        img2: '',
        img3: ''
    });

    const sendProduct = () => {        
        dispatch(setStoreProduct(product));
        setTimeout(() => {
            dispatch(registerProduct());
            navigate('/admin/stock');
        }, 100);
    };

    /* A CheckBox Menu */
    let desksCk = true;
    let chairsCk = false;
    let lightingCk = false;
    //const [check, setChecked] = useState("desks");
    if(product.department === "desks"){
        desksCk = true;
        chairsCk = false;
        lightingCk = false;
    }else if(product.department  === "chairs"){
        desksCk = false;
        chairsCk = true;
        lightingCk = false;
    }else if(product.department  === "lighting"){
        desksCk = false;
        chairsCk = false;
        lightingCk = true;
    }

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
            <div className="container-fluid h-100 bg-primary">
                <Header hideCart/>
                <Nav/>
                    <div className="container-content">
                        <div className="box col-8">
                            <h2 className="text-center">Add a Product</h2>
                            <br/>
                            <input type="text" className="form-control form-control-lg mb-3" placeholder="Name"
                                onChange={(e) => {
                                    setProduct({ ...product, name: e.target.value});
                                }}
                            />

                            <div className="ol-12 menu-container">
                                <label>
                                    <input type="checkbox" checked={desksCk} onChange={() => {
                                        setProduct({ ...product, department: "desk"});
                                    }}/>
                                    Desks
                                </label>
                                <label>
                                    <input type="checkbox" checked={chairsCk} onChange={() => {
                                        setProduct({ ...product, department: "chairs"});
                                    }}/>
                                    Chairs
                                </label>
                                <label>
                                    <input type="checkbox" checked={lightingCk} onChange={() => {
                                        setProduct({ ...product, department: "lighting"});
                                    }}/>
                                    Lighting
                                </label>
                            </div>

                            <textarea type="text" className="form-control form-control-lg mb-3" placeholder="Description"
                                onChange={(e) => {
                                    setProduct({ ...product, description: e.target.value});
                                }}
                            />
                            <input type="number" className="form-control form-control-lg mb-3" placeholder="Price"
                                onChange={(e) => {
                                    setProduct({ ...product, price: e.target.value});
                                }}
                            />
                            <textarea type="text" className="form-control form-control-lg mb-3" placeholder="Additional Info"
                                onChange={(e) => {
                                    setProduct({ ...product, additionalInfo: e.target.value});
                                }}
                            />
                            <input type="number" className="form-control form-control-lg mb-3" placeholder="Quantity"
                                onChange={(e) => {
                                    setProduct({ ...product, quantity: e.target.value});
                                }}
                            />
                            <input type="url" className="form-control form-control-lg mb-3" placeholder="Image 1 URL"
                                onChange={(e) => {
                                    setProduct({ ...product, img1: e.target.value});
                                }}
                            />
                            <input type="url" className="form-control form-control-lg mb-3" placeholder="Image 2 URL"
                                onChange={(e) => {
                                    setProduct({ ...product, img2: e.target.value});
                                }}
                            />
                            <input type="url" className="form-control form-control-lg mb-3" placeholder="Image 3 URL"
                                onChange={(e) => {
                                    setProduct({ ...product, img3: e.target.value});
                                }}
                            />
                            <button
                                onClick={() => sendProduct()}
                                className="btn btn-lg btn-block btn-secondary col-12"
                            >
                                Add this product to the Stock
                            </button>
                        </div> 
                    </div> 
                <Contact/>
            </div>
        );
    }
};

export default AddProduct;