import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Card, Col, Icon, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import RadioBox from './Sections/RadioBox';
import CheckBox from './Sections/CheckBox';
import { continents, price } from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });
  const [SearchTerm, setSearchTerm] = useState('');

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

  const showFilteredResults = (filters) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };

    getProducts(body);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div style={{ width: '75%', margin: '3rem auto' }}>
      <div style={{ textAlign: 'center' }}>
        <h2>
          Let's Travel Anywhere <Icon type='rocket' />
        </h2>
      </div>

      {/* filter */}
      <Row gutter={[16, 16]}>
        {/* CheckBox */}
        <Col lg={12} xs={24}>
          <CheckBox
            list={continents}
            handleFilters={(filters) => handleFilters(filters, 'continents')}
          />
        </Col>

        {/* RadioBox */}
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, 'price')}
          />
        </Col>
      </Row>

      {/* Search */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '1rem auto',
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerm} />
      </div>

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
