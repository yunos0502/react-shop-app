import React from 'react';
import { Carousel } from 'antd';

const ImageSlider = ({ images }) => {
  return (
    <Carousel autoplay>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={`http://localhost:5000/${image}`}
            alt={`product_image_${index}`}
            style={{
              width: '100%',
              maxHeight: 150,
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
