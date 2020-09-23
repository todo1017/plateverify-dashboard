import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;

export default ({ formik, name, label, options, index, value, actions, ...props }) => {

  const handleChange = (value) => {
    if (actions) {
      actions();
    }
    formik.setFieldValue(name, value);
    if (!formik.touched[name]) {
      formik.touched[name] = true;
    }
  };

  return (
    <>
      <div>{label}</div>
      <Form.Item
        hasFeedback={formik.values[name]}
        validateStatus={(formik.touched[name] && formik.errors[name]) ? 'error' : 'success'}
        help={(formik.touched[name] && formik.errors[name]) || ''}>
        <Select
          value={formik.values[name]}
          onChange={handleChange}
          style={{ width: '100%' }}
          name={name}
          {...props}>
          {options.map((option, i) =>
            <Option value={index? option[index] : option} key={i}>
              {value? option[value] : option}
            </Option>
          )}
        </Select>
      </Form.Item>
    </>
  );

}