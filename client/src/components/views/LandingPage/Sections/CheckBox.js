import React, { Fragment, useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const CheckBox = ({ list, handleFilters }) => {
  const [Checked, setChecked] = useState([]);

  const renderCheckboxLists = () =>
    list &&
    list.map((value, index) => (
      <Fragment key={index}>
        <Checkbox
          onChange={hadleToggle(value._id)}
          checked={Checked.indexOf(value._id) === -1 ? false : true}
          style={{ margin: 0 }}
        >
          {value.name}
        </Checkbox>
      </Fragment>
    ));

  const hadleToggle = (id) => () => {
    const currentIndex = Checked.indexOf(id);
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    handleFilters(newChecked);
  };

  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header='Continents' key='1'>
        {renderCheckboxLists()}
      </Collapse.Panel>
    </Collapse>
  );
};

export default CheckBox;
