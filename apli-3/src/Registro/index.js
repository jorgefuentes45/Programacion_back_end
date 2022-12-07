import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios, { formToJSON } from 'axios';
import { Button, Form, Input, message, Select, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import { Card } from 'antd';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Content } from 'antd/es/layout/layout';







const Registro = () => {
  const [data, setData] = useState([]);
  const PeticionGet = () => {
     axios.get('http://localhost:3001/usuarios')
      .then(response => {
        setData(response.data);
        console.log(response.data)
      }).catch(error => {
        console.log(error.message);
      })
  }

  const Ingresar = async () =>{
    window.location.href = "/app_usuario";
  } 

  const Verificar_registro = () =>{
    const nombre = document.getElementsByName('nombre_registro')[0].value;
    const contraseña = document.getElementsByName('contraseña_registro')[0].value;
    const rol = document.getElementsByName('rol_registro')[0].value;
    console.log(nombre);
    console.log(contraseña);
    console.log(rol);
    axios.post('http://localhost:3001/usuarios', {
      nombre: nombre,
      contraseña: contraseña,
      rol: rol
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  

  }


  useEffect(() => { PeticionGet() }, []);


  return (
  <div className="site-card-border-less-wrapper">
          <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            textAlign: 'center',
            color: 'rgb(255, 255, 255)',
          }}
          >
            <h1>Registro de usuario</h1>
          </Header>
        <Content
          style={{
            margin: '0 16px',
            backgroundColor: 'rgb(255, 255, 255)',
            alignContent: 'center',
          }}
        >
          
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,

              
            }}
          >
            <Card
      title="Registro de usuario"
      bordered={false}
      hoverable
      style={{
        width: 300,
      }}
    >
      <Form >
        <Input placeholder="Usuario" name='nombre_registro' />
        <Input style={{marginTop:"5px"}} placeholder="Contraseña" name='contraseña_registro' />
        <Input style={{marginTop:"5px"}} placeholder="Rol" name='rol_registro' />


        <Button style={{marginTop:"5px"}} type="primary" htmlType="submit" onClick={()=>{Verificar_registro()}}>
          Registrar
        </Button>

      </Form>
    </Card>
            
          </div>
        </Content>

      </Layout>
      </div>
  );
    };

export default Registro;