import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { requestLighting } from '../../../store/modules/products/actions';
import Header from '../../../components/header';
import Product from '../../../components/product/card';
import Contact from '../../../components/contact';

const Lighting = () => {
    const dispatch = useDispatch();
    const { lighting } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(requestLighting());
    }, [dispatch]);

    return (
        <div className="container-fluid h-100">
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h5>Department: Lighting</h5>
                        <br/>
                        <div className="row">
                            {lighting.map((p, i) => (
                                <Product key={'lighting_' + i} {...p}/>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
            <Contact/>
        </div>
    );
}

export default Lighting;