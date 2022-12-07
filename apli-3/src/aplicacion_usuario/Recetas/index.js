import React from 'react';
import { Card, Row } from 'antd';
import { Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Col } from 'antd';
import { Modal } from 'antd';


const { Meta } = Card;




const Recetas = () => {
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [recetaseleccionada, setRecetaSeleccionada] = useState({
        id: '',
        nombre: '',
        imagen: '',
        ingredientes: '',
        preparacion: ''
    })


    const PeticionGet = async () => {
        await axios.get('http://localhost:3001/recetas')
          .then(response => {
            setData(response.data);
          }).catch(error => {
            console.log(error.message);
          })
    }
    useEffect(() => {PeticionGet()}, []);

    const abrirCerrarModalEditar = () => {
      setModalEditar(!modalEditar);
    }

    const seleccionarReceta = (receta, caso) => {
      setRecetaSeleccionada(receta);
      if (caso === "editar") {
        abrirCerrarModalEditar();
      }
    }

    return(
        <div>
            <h1>Recetas Disponibles</h1>
            <Row gutter={16}>
            {data.map((item =>{return <div key={item.id}>
                
                <Col style={{padding:"20px"}}>
                <Card
                hoverable
                onClick={() => { seleccionarReceta(item, "editar") }}
    style={{ width: 300, textAlign: "center", height: 300 }}
    cover={
      <img
        alt="example"
        src={item.imagen}
      />
    }
    /*
    actions={[
      <SettingOutlined key="setting" />,
      <EditOutlined key="edit" />,
      <EllipsisOutlined key="ellipsis" />,
    ]}
    */
  >
    <Meta
      title={item.nombre}
    />
  </Card>
  </Col>
      </div>
            }))}
</Row>

<Modal title="Ver receta" open={modalEditar} onCancel={()=>(abrirCerrarModalEditar())}>
  <div>
    <p>Nombre</p>
    <input type="text" value={recetaseleccionada && recetaseleccionada.nombre } readOnly />

    <p>Ingredientes</p>
    <textarea value={recetaseleccionada && recetaseleccionada.ingredientes} readOnly style={{width:"450px",height:"300px"}} />

    <p>Preparacion</p>
    <textarea value={recetaseleccionada && recetaseleccionada.preparacion} readOnly style={{width:"450px",height:"550px"}} />
  </div>
</Modal>

</div>

)
}

export default Recetas