import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = () => {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { 'content-type': 'multipart/form-data' },
    };
    formData.append('file', files[0]);

    axios.post('/api/product/image', formData, config).then((response) => {
      if (response.data.success) {
        setImages([...Images, response.data.filePath]);
      } else {
        alert('파일 저장을 실패했습니다.');
      }
    });
  };

  const deleteHandler = (image) => {
    const currentIndex = Images.indexOf(image);
    let newImages = [...Images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              {...getRootProps()}
              style={{
                width: 300,
                height: 240,
                border: '1px solid lightgray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <input {...getInputProps()} />
              <Icon type='plus' style={{ fontSize: '3rem' }} />
            </div>
          </section>
        )}
      </Dropzone>

      <div
        style={{
          display: 'flex',
          width: 350,
          height: 240,
          overflowX: 'scroll',
        }}
      >
        {Images.map((image, index) => (
          <div key={index} onClick={() => deleteHandler(image)}>
            <img
              style={{ minWidth: 300, width: 300, height: 240 }}
              src={`http://localhost:5000/${image}`}
              alt={`product_image_${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
