import Header from '../../../components/header';
import Product from '../../../components/product/card';
import Contact from '../../../components/contact';

import { requestChairs } from '../../../store/modules/products/actions';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Chairs = () => {

    const dispatch = useDispatch();
    const { chairs } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(requestChairs());
    }, [dispatch]);

    return (
        <div className="container-fluid h-100">
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h5>Department: Chairs</h5>
                        <br/>
                        <div className="row">
                            {chairs.map((p, i) => (
                                <Product key={'chair_' + i} {...p}/>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
            <Contact/>
        </div>
    );
}

export default Chairs;