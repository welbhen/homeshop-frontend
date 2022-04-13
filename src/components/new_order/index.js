import Product from "../product/card_order";
import './style.css';
import { useDispatch } from 'react-redux';
import { shipOrder, requestNewOrders } from '../../store/modules/products/actions';
import Swal from 'sweetalert2';

const Order = (order) => {
    const dispatch = useDispatch();

    let productsList = order.listproducts;
    let customerInfo = order.customer;
    let shippingInfo = order.shipping;

    const sendOrder = () => {
        Swal.fire({
            title: 'Are you sure you want to confirm this order was shipped?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //console.log("INSIDE SWAL: " + order._id);
                dispatch(shipOrder(order));
            }
        })
        .then(() => {
            setTimeout(() => {
                dispatch(requestNewOrders());
            }, 600);
        }).catch((err) => {
              console.log("An error occured. Error: " + err);
        });

        
    };

    return (
        <div className="row order">
            <h4 className="col-12 mdi mdi-new-box"><b> Order: {order.orderNumber} </b></h4>
            <div className="row">
                <div className="col-12 input-container">
                    <h4>Customer info</h4>
                    <div className="flex-container">
                        <label className="prompt">Customer's name:  </label>
                        <h5 className="output">{customerInfo.name}</h5>
                    </div>
                    <div className="flex-container">
                        <label className="prompt">Email:  </label>
                        <h5 className="output">{customerInfo.email}</h5>
                    </div>
                </div>
            </div>
            <div className="row products">
                <h4>Products on this order:</h4>
                {productsList.map((p, i) => (
                    <Product key={'product_' + i} {...p}/>
                ))}
            </div>
            <div className="row">
                <div className="col-12 input-container">
                    <h4>Prices</h4>
                    <div className="flex-container">
                        <label className="prompt">Products total price:  </label>
                        <h5 className="output">R$ {(order.productsPrice).toFixed(2)}</h5>
                    </div>
                    <div className="flex-container">
                        <label className="prompt">Shipping price:  </label>
                        <h5 className="output">R$ {(shippingInfo.shippingPrice).toFixed(2)}</h5>
                    </div>
                    <div className="flex-container">
                        <label className="prompt">Total (final) price:  </label>
                        <h3 className="output">R$ {(order.productsPrice + shippingInfo.shippingPrice).toFixed(2)}</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6 input-container">
                    <h4>Shipping info</h4>
                    <div className="flex-container">
                        <label className="prompt">Street:  </label>
                        <h5 className="output">{shippingInfo.street}</h5>
                    </div>
                    <div className="flex-container-half">
                        <label className="prompt-half">Number:  </label>
                        <h5 className="output-half">{shippingInfo.number}</h5>
                        <label className="prompt-half">Zip:  </label>
                        <h5 className="output-half">{shippingInfo.zip}</h5>
                    </div>
                    <div className="flex-container-half">
                        <label className="prompt-half">City:  </label>
                        <h5 className="output-half">{shippingInfo.city}</h5>
                        <label className="prompt-half">State:  </label>
                        <h5 className="output-half">{shippingInfo.state}</h5>
                    </div>
                    <div className="flex-container">
                        <label className="prompt">Delivery date limit:  </label>
                        <h5 className="output">{shippingInfo.deliveryDate}</h5>
                    </div>
                    <div className="flex-container">
                        <label className="prompt">Payment approved?  </label>
                        <h5 className="output payment">Approved!</h5>
                    </div>
                </div>
                <div className="col-6 input-container">
                    <button
                         onClick={() => sendOrder()}
                        className="btn btn-secondary btn-lg"
                    >
                            Ship Product to client
                    </button>
                </div>
            </div>
        </div>  
    );
};

export default Order;