import Header from '../../../components/header';
import Product from '../../../components/product/card';
import Contact from '../../../components/contact';

import { requestDesks } from '../../../store/modules/products/actions';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Desks = () => {

    const dispatch = useDispatch();
    const { desks } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(requestDesks());
    }, [dispatch]);

    return (
        <div className="container-fluid h-100">
            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h5>Department: Desks</h5>
                        <br/>
                        <div className="row">
                            {desks.map((p, i) => (
                                <Product key={'desk_' + i} {...p}/>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </div>
            <Contact/>
        </div>
    );
}

export default Desks;