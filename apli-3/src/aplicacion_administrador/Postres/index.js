import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Meta from 'antd/lib/card/Meta';
import { useState } from 'react';
import Modal from 'antd/es/modal/Modal';
import { Button } from 'antd';





const Postres = () => {
    const [data, setData] = useState([]);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [recetaseleccionada, setRecetaSeleccionada] = useState({
        id: '',
        nombre: '',
        imagen: '',
        ingredientes: '',
        preparacion: ''
    })
    const PeticionGet = async () => {   
        await axios.get('http://localhost:3001/postres')
          .then(response => {
            setData(response.data);
          }).catch(error => {
            console.log(error.message);
          })
      }
    const PeticionPut = async () => {
        await axios.put('http://localhost:3001/postres/'+recetaseleccionada.id, recetaseleccionada)
          .then(response => {
            var dataNueva = data;
            dataNueva.map(receta => {
              if (receta.id === recetaseleccionada.id) {
                receta.nombre = recetaseleccionada.nombre;
                receta.imagen = recetaseleccionada.imagen;
                receta.ingredientes = recetaseleccionada.ingredientes;
                receta.preparacion = recetaseleccionada.preparacion;
              }
            }
          )
            setData(dataNueva);
            abrirCerrarModalEditar();
        })
      }
    const PeticionDelete = async () => {
        await axios.delete('http://localhost:3001/postres/'+recetaseleccionada.id)
          .then(response => {
            setData(data.filter(receta => receta.id !== recetaseleccionada.id));
            abrirCerrarModalEliminar();
            abrirCerrarModalEditar();
          }).catch(error => {
            console.log(error.message);
          })
      }

    const PeticionPost = async () => {
      var nueva_id = data.length + 1;
      recetaseleccionada.id = nueva_id;
        await axios.post('http://localhost:3001/postres', recetaseleccionada)
          .then(response => {
            setData(data.concat(response.data));
            abrirCerrarModalInsertar();
          }).catch(error => {
            console.log(error.message);
          })
      }



        useEffect(() => {PeticionGet()}, []);

        const abrirCerrarModalEditar = () => {
            setModalEditar(!modalEditar);
          }

        const abrirCerrarModalEliminar = () => {
            setModalEliminar(!modalEliminar);
          }
           const abrirCerrarModalInsertar = () => {
            setModalInsertar(!modalInsertar);
          }


          const seleccionarReceta = (receta, caso) => {
            setRecetaSeleccionada(receta);
            if (caso === "editar") {
              abrirCerrarModalEditar();
            }else{
              abrirCerrarModalEliminar();
            }
          }
      const HandleChange = e => {
        const { name, value } = e.target;
        setRecetaSeleccionada(prevState => ({
          ...prevState,
          [name]: value
        }));
        console.log(recetaseleccionada);
      }


    


  return (
    <div>
        <h1>Postres Disponibles</h1>
        <Button onClick={()=>(abrirCerrarModalInsertar())}>Añadir nuevo postre</Button>
        <Row gutter={16}>
            {data.map((item =>{return <div key={item.id}>
                
                <Col style={{padding:"20px"}}>
                <Card
                hoverable
                onClick={() => {seleccionarReceta(item,"editar"); console.log(item.nombre)}}
    style={{ width: 300, textAlign: "center", height: 300 }}
    cover={
      <img
        alt="example"
        src={item.imagen}
      />
    }
  >
    <Meta
      title={item.nombre}
    />
  </Card>
  </Col>
  
            </div>
            }))}
</Row>

<Modal title="Insertar Producto" open={modalInsertar} onOk={()=>{PeticionPost()}} onCancel={()=>abrirCerrarModalInsertar()} >
    <div className="form-group">
      <label>ID:</label>
      <br />
      <input type="text" className="form-control" name="id"  value={data.length+1} readOnly onChange={HandleChange} />
      <br />

      <label>Nombre:</label>
      <br />
      <textarea type="text" className="form-control" name="nombre" onChange={HandleChange} />
      <br />
      <label>Ingredientes:</label>
      <br />
      <textarea type="text" className="form-control" name="ingredientes" onChange={HandleChange} />
      <br />
      <label>Preparacion:</label>
      <br />
      <textarea type="text" className="form-control" name="preparacion" onChange={HandleChange} />
      <br />
      <label>Imagen:</label>
      <br />
      <input type="text" className="form-control" name="imagen" onChange={HandleChange}/>
      <br />
    </div>
  </Modal>



<Modal title="Editar receta" open={modalEditar} onOk={()=>(PeticionPut())} onCancel={()=>(abrirCerrarModalEditar()) }>
  <div className='form-group'>
    <button onClick={()=>(seleccionarReceta(recetaseleccionada,"borrar"))}>Eliminar</button>

    <p>Nombre</p>
    <input name='nombre' type="text" className='form-control' value={recetaseleccionada && recetaseleccionada.nombre } onChange={HandleChange}  />

    <p>Ingredientes</p>
    <textarea name='ingredientes' className='form-control' value={recetaseleccionada && recetaseleccionada.ingredientes} onChange={HandleChange} style={{width:"450px",height:"300px"}} />
    
    <p>Preparacion</p>
    <textarea name='preparacion' className='form-control' value={recetaseleccionada && recetaseleccionada.preparacion} onChange={HandleChange}  style={{width:"450px",height:"550px"}} />

    <p>Imagen</p>
    <input name='imagen' type="text" className='form-control' value={recetaseleccionada && recetaseleccionada.imagen} onChange={HandleChange} style={{width:"450px"}}  />



  </div>
</Modal>

<Modal title="Eliminar producto" open={modalEliminar} onCancel={()=>abrirCerrarModalEliminar()} onOk={()=>{PeticionDelete()}} >
    <p>Estas seguro que deseas eliminar el producto {recetaseleccionada && recetaseleccionada.nombre}?</p>
  </Modal>




    </div>
  )
}

export default Postres