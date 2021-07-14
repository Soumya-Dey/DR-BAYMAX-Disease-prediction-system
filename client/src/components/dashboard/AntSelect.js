import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import symptomObj from '../../utils/symptomObject';
const { Option } = Select;

const children = [];
for (let item in symptomObj) {
  children.push(
    <Option style={{ padding: '14px !important' }} key={item}>
      {symptomObj[item]}
    </Option>
  );
}

const AntSelect = ({ symptoms, setSymptoms }) => {
  const onChange = (value) => {
    console.log(value);
    setSymptoms(value);
  };

  return (
    <Select
      mode='multiple'
      allowClear
      style={{ width: '100%' }}
      placeholder='Please select your symptoms...'
      value={symptoms}
      onChange={onChange}
    >
      {children}
    </Select>
  );
};

AntSelect.propTypes = {
  symptoms: PropTypes.array.isRequired,
  setSymptoms: PropTypes.func.isRequired,
};

export default AntSelect;
