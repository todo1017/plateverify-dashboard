import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const InputLine = styled.div`
  display: flex;
  margin-bottom: 8px;
  .ant-row.ant-form-item {
    flex: 1;
  }
  .ant-input {
    margin-right: 4px;
  }
  .anticon {
    margin-top: 8px;
    margin-left: 8px;
  }
`;

export default ({ formik, name, label, keys }) => {

  const handleChange = event => {
    formik.handleChange(event);
    if (!formik.touched[name]) {
      formik.touched[name] = true;
    }
  }

  const handleRemove = index => {
    let newList = formik.values[name].filter((value, i) => i !== index);
    formik.setFieldValue(name, newList);
  };

  const handleAdd = () => {
    formik.setFieldValue(name, [
      ...formik.values[name],
      {}
    ]);
  };

  return (
    <>
      <div>{label}</div>
      <Form.Item>
        {formik.values[name].map((value, index) =>
          <InputLine key={index}>
            {keys.map(k =>
              <Input
                key={k}
                value={value[k]}
                onChange={handleChange}
                placeholder={k}
                name={`${name}.${index}.${k}`} />
            )}
            <MinusCircleOutlined onClick={() => handleRemove(index)}/>
          </InputLine>
        )}
        <div>
          <Button onClick={handleAdd}>
            <PlusOutlined /> Add
          </Button>
        </div>
      </Form.Item>
    </>
  );
}