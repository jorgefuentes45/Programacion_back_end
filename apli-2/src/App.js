import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row,Col,Card } from 'react-bootstrap';
import { Modal } from 'antd';
import axios from 'axios';



const url = "http://localhost:3001/tareas/";
const { Meta } = Card;

  const App = () => {
    const [data, setData] = useState([]);
    const [modalInsertar,setModalInsertar]=useState(false);
    const [modalEditar,setModalEditar]=useState(false);
    const [modalEliminar,setModalEliminar]=useState(false);
  
    const [productoSeleccionado,setProductoSeleccionado]=useState({
      id: '',
      name: '',
      status: '',  
      description: '',
      precio: null
    });
    const handleChange=e=>{
      const {name,value}=e.target;
      setProductoSeleccionado((prevState)=>({
        ...prevState,
        [name]: value
      }))
      console.log(productoSeleccionado);  
    }


    const peticionGet = async () => {
      await axios.get('http://localhost:3001/tareas')
        .then(response => {
          console.log(response.data);
          setData(response.data);
        }).catch(error => {
          console.log(error);
        })
    }

    const peticionPost=async()=>{
      var nuevo_id=data.length+1;
      productoSeleccionado.id=nuevo_id;
      console.log(productoSeleccionado);
      await axios.post(url,productoSeleccionado).then(
        response=>{
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
        })
  
    }

    const peticionPut=async()=>{
      await axios.put(url+productoSeleccionado.id, productoSeleccionado).then(response =>{
        var dataNueva=data;
        dataNueva.map(producto=>{
          if(productoSeleccionado.id===producto.id){
            producto.nombre=productoSeleccionado.nombre;
            producto.precio=productoSeleccionado.precio;
            producto.descripcion=productoSeleccionado.descripcion;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
    
      })
    };
  
    const peticionDelete =async()=>{
      console.log(productoSeleccionado.id);
  
      await axios.delete('http://localhost:3001/tareas/'+productoSeleccionado.id).then(
        response=>{
          setData(data.filter(producto=>producto.id!==productoSeleccionado.id));
          abrirCerrarModalEliminar();
        }
      )
  
    }

    const abrirCerrarModalInsertar=()=>{
      setModalInsertar(!modalInsertar);
    }
  
    const abrirCerrarModalEditar=()=>{
      setModalEditar(!modalEditar);
    }
  
    const abrirCerrarModalEliminar=()=>{
      setModalEliminar(!modalEliminar);
    }
  

    
const seleccionarProducto=(producto,caso)=>{
  setProductoSeleccionado(producto);
  console.log(productoSeleccionado);
  if(caso==="Editar"){
    abrirCerrarModalEditar();
  }
  else if(caso==="Eliminar"){
    abrirCerrarModalEliminar();
  }

}

    useEffect(()=>{ peticionGet()},[])

    return (
      <div className="App">
            <button onClick={()=>{abrirCerrarModalInsertar()}}>Insertar Producto Nuevo</button>
        <div>
        <Row>
        {data.map((item) => {
          return(
            <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <p>{item.status}</p>
            <p>${item.precio}</p>
            <button onClick={()=>seleccionarProducto(item,'Eliminar')}> Borrar</button>
            <button onClick={()=>seleccionarProducto(item,'Editar')}> Editar</button>
            </div>

          )
          })}
        </Row>
        </div>

    <Modal title="Insertar Producto" open={modalInsertar} onOk={()=>{peticionPost()}} onCancel={()=>abrirCerrarModalInsertar()} >
          <div className="form-group">
      <label>ID:</label>
      <br />
      <input type="text" className="form-control" name="id" onChange={handleChange} value={data.length+1} readOnly />
      <br />

      <label>Nombre:</label>
      <br />
      <input type="text" className="form-control" name="name" onChange={handleChange} />
      <br />
      <label>Status:</label>
      <br />
      <input type="text" className="form-control" name="status" onChange={handleChange} />
      <br />
      <label>Descripcion:</label>
      <br />
      <input type="text" className="form-control" name="description" onChange={handleChange}/>
      <br />
      <label>Precio:</label>
      <br />
      <input type="text" className="form-control" name="precio" onChange={handleChange}/>
      <br />
    </div>
    </Modal>

    <Modal title="Editar producto" open={modalEditar} onCancel={()=>abrirCerrarModalEditar()} onOk={()=>{peticionPut()}} >
    <div className="form-group">
      <label>Nombre:</label>
      <br />
      <input type="text" className="form-control" name="name" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.name} />
      <br />
      <label>Status:</label>
      <br />
      <input type="text" className="form-control" name="status" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.status}/>
      <br />
      <label>Descripcion:</label>
      <br />
      <input type="text" className="form-control" name="description"  onChange={handleChange} value={productoSeleccionado && productoSeleccionado.description}/>
      <br />
      <label>Precio:</label>
      <br />
      <input type="text" className="form-control" name="precio" onChange={handleChange} value={productoSeleccionado && productoSeleccionado.precio}/>
      <br />
    </div>
  </Modal>

  <Modal title="Eliminar producto" open={modalEliminar} onCancel={()=>abrirCerrarModalEliminar()} onOk={()=>{peticionDelete()}} >
    <p>Estas seguro que deseas eliminar el producto {productoSeleccionado && productoSeleccionado.nombre}?</p>
  </Modal>

  <Modal title="Eliminar producto" open={modalEliminar} onCancel={()=>abrirCerrarModalEliminar()} onOk={()=>{peticionDelete()}} >
    <p>Estas seguro que deseas eliminar el producto {productoSeleccionado && productoSeleccionado.name}?</p>
  </Modal>


      </div>
        );
      
  }

export default App;
