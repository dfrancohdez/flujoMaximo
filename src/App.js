import React, { useState } from 'react';
import Form from './components/Form';
import Grafo from './components/Grafo';
import { fordFulkerson } from './fordFulkerson';
import './App.scss';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const [graph, setGraph] = useState({ nodes: [], edges: [] ,fuente:"",destino:""});
  const [maxFlow, setMaxFlow] = useState(null);
  const [path, setPath] = useState([]);


  const [error, setError] = useState(null);

  const [boton,setBoton]=useState(false)



  /*const handleGraphSubmit = (newGraph) => {
    setGraph(newGraph);

    const nodeIndexMap = newGraph.nodes.reduce((acc, node, index) => {
      acc[node] = index;
      return acc;
    }, {});

    const indexedEdges = newGraph.edges.map(edge => ({
      from: nodeIndexMap[edge.from],
      to: nodeIndexMap[edge.to],
      capacity: edge.capacity
    }));*/
//////////////////////////////////////////////////
  const handleGraphSubmit = (newGraph) => {
    try {
      setGraph(newGraph);
      setError(null);

      const nodeIndexMap = newGraph.nodes.reduce((acc, node, index) => {
        acc[node] = index;
        return acc;
      }, {});

      const indexedEdges = newGraph.edges.map(edge => ({
        from: nodeIndexMap[edge.from],
        to: nodeIndexMap[edge.to],
        capacity: edge.capacity
      }));
      console.log(newGraph.nodes)
      console.log(newGraph.fuente+"   "+newGraph.destino)

      const destinoAux=newGraph.nodes.indexOf(newGraph.destino)
      const fuenteAux=newGraph.nodes.indexOf(newGraph.fuente)
///////////////////////////////////////////
      const indexedGraph = { nodes: newGraph.nodes, edges: indexedEdges };
      //const result = fordFulkerson(indexedGraph, 0, newGraph.nodes.length - 1);
      
      const result = fordFulkerson(indexedGraph, fuenteAux, destinoAux);
      console.log(result)
      setMaxFlow(result.maxFlow);
      setPath(result.path);
    } catch (err) {
      setError(err.message);
      setMaxFlow(null);
      setPath([]);
      toast.error(err.message, {
        position: "bottom-center"
    });
    }
  };

  return (
    <div>
      <Header text="Flujo maxímo"/>
      <Form onSubmit={handleGraphSubmit} boton={(prev)=>setBoton(prev)}/>
      
      {/* {error&&boton&&<div><h5>{error}</h5></div>} */}
      {!error&&boton && <Grafo graph={graph} maxFlow={maxFlow} path={path} />}
      <ToastContainer/>
      <Footer />
    </div>

  );
};

export default App;
