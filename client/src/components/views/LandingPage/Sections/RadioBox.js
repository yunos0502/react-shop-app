import React, { useState } from 'react';
import { Collapse, Radio } from 'antd';

const RadioBox = ({ list, handleFilters }) => {
  const [Value, setValue] = useState(0);

  const renderRadioboxLists = () =>
    list &&
    list.map((value, index) => (
      <Radio key={value._id} value={value._id}>
        {value.name}
      </Radio>
    ));

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFilters(e.target.value);
  };

  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header='Price' key='1'>
        <Radio.Group onChange={handleChange} value={Value}>
          {renderRadioboxLists()}
        </Radio.Group>
      </Collapse.Panel>
    </Collapse>
  );
};

export default RadioBox;
