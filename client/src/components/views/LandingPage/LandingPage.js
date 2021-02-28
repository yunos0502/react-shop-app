import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Card, Col, Icon, Row, Carousel } from 'antd';
import ImageSlider from '../../utils/ImageSlider';

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Card.Meta title={product.title} description={`${product.price}`} />
        </Card>
      </Col>
    );
  });

  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };

  const getProducts = (body) => {
    Axios.post('/api/product/list', body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          console.log(response.data.productsInfo);
          setProducts([...Products, ...response.data.productsInfo]);
        } else {
          setProducts(response.data.productsInfo);
        }

        setPostSize(response.data.postSize);
      } else {
        alert('상품 정보를 가져오는데 실패했습니다.');
      }
    });
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let's Travel Anywhere <Icon type='rocket' />
        </h2>
      </div>

      {/* filter */}

      {/* Search */}

      {/* Cards */}
      <Row gutter={[16, 16]}>{renderCards}</Row>

      {PostSize >= Limit && (
        <div style={{ margin: '1rem auto', textAlign: 'center' }}>
          <button onClick={loadMoreHandler}>더보기</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
