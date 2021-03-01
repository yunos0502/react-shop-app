import React, { useState } from 'react';
import { Input } from 'antd';

const SearchFeature = ({ refreshFunction }) => {
  const [SearchTerm, setSearchTerm] = useState('');

  const searchHandler = (e) => {
    setSearchTerm(e.currentTarget.value);
    refreshFunction(e.currentTarget.value);
  };
  return (
    <Input.Search
      placeholder='input search text'
      onChange={searchHandler}
      style={{ width: 200 }}
      value={SearchTerm}
    />
  );
};

export default SearchFeature;
