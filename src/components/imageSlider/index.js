import React, { useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

import './style.css';

const ImageSlider = (product) => {
    const [current, setCurrent] = useState(1);
    
    const nextSlide = () => {
        setCurrent(current === 3 ? 1 : current + 1); // because we have 3 images
    }
    const prevSlide = () => {
        setCurrent(current === 1 ? 3 : current - 1); // because we have 3 images
    }
    
    //console.log(current);
    let img = product.img1;
    if(current === 1){
        img = product.img1;
    }else if(current === 2){
        img = product.img2;
    }else if(current === 3){
        img = product.img3;
    }
    
    return (
        <section className="slider">
            <FaArrowAltCircleLeft 
                className="left-arrow"
                onClick={prevSlide}
            />
            <FaArrowAltCircleRight 
                className="right-arrow"
                onClick={nextSlide}
            />
            <div>
                <img
                    className="img-fluid image"
                    key="1"
                    alt="Product"
                    src={img} 
                />
            </div>
        </section>
    );
};

export default ImageSlider;