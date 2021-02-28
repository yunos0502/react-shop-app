import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { TextArea } = Input;

const Continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'North America' },
  { key: 5, value: 'South America' },
  { key: 6, value: 'Australia' },
  { key: 7, value: 'Antarctica' },
];

const UploadProductPage = (props) => {
  const { user, history } = props;

  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.currentTarget.value);
  };

  const priceChangeHandler = (e) => {
    setPrice(e.currentTarget.value);
  };

  const continentChangeHandler = (e) => {
    setContinent(e.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!Title || !Description || !Price || !Continent || !Images) {
      return alert('모든 값을 입력해주셔야 합니다!!');
    }

    // 서버에 채운 값들을 request로 전송
    const body = {
      writer: user.userData._id, // 로그인 된 유저 ID
      title: Title,
      description: Description,
      price: Price,
      continents: Continents,
      images: Images,
    };
    Axios.post('/api/product', body).then((response) => {
      if (response.data.success) {
        alert('상품 업로드에 성공했습니다!');

        history.push('/');
      } else {
        alert('상품 업로드에 실패했습니다!');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography.Title level={2}>여행 상품 업로드</Typography.Title>
      </div>

      <Form onSubmit={submitHandler}>
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />

        <label>이름</label>
        <Input onChange={titleChangeHandler} value={Title} />

        <br />
        <br />

        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />

        <br />
        <br />

        <label>가격($)</label>
        <Input onChange={priceChangeHandler} value={Price} />

        <br />
        <br />

        <select onChange={continentChangeHandler} value={Continent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button onClick={submitHandler}>확인</Button>
      </Form>
    </div>
  );
};

export default UploadProductPage;
