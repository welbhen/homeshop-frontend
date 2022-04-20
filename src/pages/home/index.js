import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { requestChairs, requestDesks, requestLighting } from '../../store/modules/products/actions';
import Header from '../../components/header';
import Product from '../../components/product/card';
import Contact from '../../components/contact';

const Home = () => {
    const dispatch = useDispatch();
    const { desks, chairs, lighting } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(requestChairs());
        dispatch(requestDesks());
        dispatch(requestLighting());
    }, [dispatch]);

    return (
        <div className="container-fluid h-100">
            <Header/>
            <div className="container">
                <div className="row">
                    <Link to="/department/chairs" className="btn btn-sm btn-primary col-3">
                        <span className="mdi mdi-store-outline"><b> See more: Chairs</b></span>
                    </Link>
                    <div className="col-12">
                        <div className="row">
                            {chairs.slice(0, 4).map((p, i) => (
                                <Product key={'chair_' + i} {...p}/>
                            ))}
                        </div>
                    </div>
                    <Link to="/department/desks" className="btn btn-sm btn-primary col-3">
                        <span className="mdi mdi-store-outline"><b> See more: Desks</b></span>
                    </Link>
                    <div className="col-12">
                        <div className="row">
                            {desks.slice(0, 4).map((p, i) => (
                                <Product key={'desk_' + i} {...p}/>
                            ))}
                        </div>
                    </div>
                    <Link to="/department/lighting" className="btn btn-sm btn-primary col-3">
                        <span className="mdi mdi-store-outline"><b> See more: Lighting</b></span>
                    </Link>
                    <div className="col-12">
                        <div className="row">
                            {lighting.slice(0, 4).map((p, i) => (
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

export default Home;