import React from 'react';
import { Collapse } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Modal from 'antd/es/modal/Modal';
const { Panel } = Collapse;


const Sugerencias =()=>{
    const [data,setData] = useState([]);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [recetaseleccionada, setRecetaSeleccionada] = useState({
        id: '',
        nombre: '',
        imagen: '',
        ingredientes: '',
        preparacion: ''
    })
    const PeticionGet = async () => {
        await axios.get('http://localhost:3001/sugerencias')
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error.message);
            })
    }
    const PeticionDelete = async () => {
        await axios.delete('http://localhost:3001/sugerencias/' + recetaseleccionada.id)
            .then(response => {
                setData(data.filter(sugerencia => sugerencia.id !== recetaseleccionada.id));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error.message);
            })
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const seleccionarReceta = (sugerencia, caso) => {
        setRecetaSeleccionada(sugerencia);
        if(caso === 'Eliminar'){
            abrirCerrarModalEliminar();
        }

    }
    useEffect(() => { PeticionGet() }, []);
    return(
        <div>
            <h1>Inicio de sugerencia</h1>
            <Collapse accordion>
                {data.map(sugerencia => (
                    <Panel header={sugerencia.Nombre_de_la_receta} key={sugerencia.id}>
                        <p>Nombre: {sugerencia.Nombre_de_la_receta}</p>
                        <p>Tipo: {sugerencia.tipo}</p>
                        <p>Ingredientes: {sugerencia.Ingredientes}</p>
                        <p>Preparacion: {sugerencia.Preparacion}</p>
                        <button onClick={()=>(seleccionarReceta(sugerencia,"Eliminar"))}>Borrar sugerencia</button>

                    </Panel>
                ))}
            </Collapse>
            <Modal title="Eliminar Sugerencia" open={modalEliminar} onCancel={()=>abrirCerrarModalEliminar()} onOk={()=>{PeticionDelete()}} >
    <p>Estas seguro que deseas eliminar la sugerencia {recetaseleccionada && recetaseleccionada.Nombre_de_la_receta}?</p>
  </Modal>


        </div>
    )
}
export default Sugerencias;