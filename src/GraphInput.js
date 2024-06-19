import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
const GraphInput = ({ onSubmit,boton }) => {
  const [nodes, setNodes] = useState('');
  const [edges, setEdges] = useState('');
  const [fuente, setFuente] = useState('');
  const [destino, setDestino] = useState('');
  let fuenteAux = ""
  let destinoAux = ""

  const handleSubmit = (e) => {
    e.preventDefault();
    const nodesArray = nodes.split(',').map(node => node.trim());
    const edgesArray = edges.split('\n').map(edge => {
      const [from, to, capacity] = edge.split(' ').map(value => value.trim());
      return { from, to, capacity: parseInt(capacity, 10) };
    });
    
    

    console.log(fuente + "  " + destino)
    
    onSubmit({ nodes: nodesArray, edges: edgesArray, fuente: fuente, destino: destino });
    
  };
  const handleFuenteDestino=(e)=>{
    const {value,name }=e.target
    if(name==="fuente")
      setFuente(value)
    if(name==="destino")
      setDestino(value)
    //console.log(fuente+" "+destino)
  }



  return (
    <div className='container-form'>
      <form className='form' onSubmit={handleSubmit}>
        <div className='input-container'>
          <label><h5>Nodos</h5> (separados por comas):</label>
          <input
            placeholder='A,B,C,D'
            type="text"
            value={nodes}
            onChange={(e) => setNodes(e.target.value)}
          />
        </div>
        <div className='fuente-destino'>
          <div className='input-container'>
            <label><h5>Fuente</h5></label>
            <input
              placeholder='A'
              type="text"
              value={fuente}
              name="fuente"
              onChange={handleFuenteDestino}
            />
          </div>
          <div className='input-container'>
            <label><h5>Destino</h5></label>
            <input
              placeholder='D'
              type="text"
              name="destino"
              value={destino}
              onChange={handleFuenteDestino}
            />
          </div>
        </div>

        <div className='input-container'>
          <label><h5>Aristas</h5> (formato: origen destino capacidad, una por línea):</label>
          <textarea
            placeholder='A B 10
A C 5
B C 15
B D 10
C D 10'
            rows="10" cols="50"
            value={edges}
            onChange={(e) => setEdges(e.target.value)}
          />
        </div>
        <button onClick={()=>boton(true)} type="submit">Crear Grafo</button>
      </form>
    </div>
    
  );

};

export default GraphInput;
