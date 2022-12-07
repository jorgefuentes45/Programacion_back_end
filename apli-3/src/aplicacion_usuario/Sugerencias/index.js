
import React from 'react'
import { useEffect } from 'react';
import { Option } from 'antd/es/mentions';
import { Select } from 'antd';
import axios from 'axios';

import { useState } from 'react';


import { Button, Form, Input, message, Space } from 'antd';
const Sugerencias = () => {
  const [data, setData] = useState([]);
  const PeticionGet = async () => {
    await axios.get('http://localhost:3001/sugerencias')
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error.message);
      })
  }
  const PeticionPost = async (datos_nuevos) => {
    await axios.post('http://localhost:3001/sugerencias',datos_nuevos)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error.message);
      })
  }

  useEffect(() => { PeticionGet() }, []);

  const [form] = Form.useForm();
  const onFinish = () => {
    const id = data.length + 1;
    message.success('Sugerencia enviada correctamente');
    const datos_nuevos = {id: id,...form.getFieldsValue()};
    console.log(datos_nuevos);
    PeticionPost(datos_nuevos);  

  };
  const onFinishFailed = () => {
    message.error('Fallo al enviar la sugerencia');
  };

  return (

    <div> 
      <h1>Envianos recetas de sugerencia</h1>
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item name="tipo" label="Tipo de receta" rules={[{required: true}]}>
        <Select placeholder="Select a option and change input text above" allowClear>
          <Select.Option value="receta">receta</Select.Option>
          <Select.Option value="postre">postre</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item name="Nombre_de_la_receta" label="Nombre_de_la_receta" rules={[{required: true ,type: 'text',warningOnly: false,  type:'string', min: 3}]}>
        <Input placeholder="Nombre de la receta"/>
      </Form.Item>

      <Form.Item
        name="Ingredientes" label="Ingredientes" rules={[{required: true ,type: 'text',warningOnly: false,  type: 'string', min: 3}]}>
        <Input placeholder="Ingredientes"/>
      </Form.Item>

      <Form.Item name="Preparacion" label="Preparacion" rules={[{required: true ,type: 'text',warningOnly: false,  type: 'string', min: 3}]}>
        <Input placeholder="Preparacion"/>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
    </div>);
};

export default Sugerencias