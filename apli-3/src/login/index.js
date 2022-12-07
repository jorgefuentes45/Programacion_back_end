import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axios, { formToJSON } from 'axios';
import { Button, Form, Input, message, Space } from 'antd';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Checkbox } from 'antd';
import { Card } from 'antd';
import { Layout } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Content } from 'antd/es/layout/layout';







const Login = () => {
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

  const Verificar_tipo = () =>{
    const nombre = document.getElementsByName('nombre_login')[0].value;
    const contraseña = document.getElementsByName('contraseña_login')[0].value;
    console.log(nombre);
    console.log(contraseña);
    data.map((item => {
      if(item.nombre == nombre && item.contraseña == contraseña){
        if(item.rol == "Administrador"){
          window.location.href = "/app_administrador";
        }else{
          window.location.href = "/app_usuario";
        }
      }else{
        console.log("Este usuario no existe");
      }
    }))
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
            <h1>Inicio de sesion</h1>
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
      title="Inicio de sesion"
      bordered={false}
      hoverable
      style={{
        width: 300,
      }}
    >
      <Form >
        <Input placeholder="Usuario" name='nombre_login' />
        <Input style={{marginTop:"5px"}} placeholder="Contraseña" name='contraseña_login' />
        <Button style={{marginTop:"5px"}} type="primary" htmlType="submit" onClick={()=>{Verificar_tipo()}}>
          Ingresar
        </Button>
        <Link to="/registro" style={{marginTop:"5px"}}>
          <Button style={{marginTop:"5px", marginLeft:"5px"}} type="primary" htmlType="submit">
          Registrarse
        </Button>
        </Link>
      </Form>
    </Card>
            
          </div>
        </Content>

      </Layout>
      </div>
  );
    };

export default Login;