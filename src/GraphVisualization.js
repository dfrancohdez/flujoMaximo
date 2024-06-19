import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network/standalone/esm/vis-network';

const GraphVisualization = ({ graph, maxFlow, path }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (graph.nodes.length > 0 && graph.edges.length > 0) {
      const nodes = graph.nodes.map((id) => ({ id, label: id,color:graph.destino===id?"#ce4949":graph.fuente===id?"#6cd86c":"#70b4ca" }));
      const edges = graph.edges.map((edge) => ({
        from: edge.from,
        to: edge.to,
        label: String(edge.capacity),
        color: path.includes(`${edge.from}-${edge.to}`) ? 'red' : 'black'
      }));

      const data = { nodes, edges };
      const options = {
        edges: {
          arrows: 'to',
          color: {
            color: 'black',
            highlight: 'red'
          }
        },
        physics: false
      };

      new Network(containerRef.current, data, options);
    }
  }, [graph, path]);

  return (
    <div>
      <div ref={containerRef} style={{ height: '500px', background: "#ddd",margin:"30px",borderRadius:"30px"}}></div>
      {maxFlow !== null && <div style={{textAlign:"center"}}><h3>Flujo Máximo: {maxFlow}</h3></div>}
    </div>
  );
};

export default GraphVisualization;
