/*export function bfs(residualGraph, source, sink, parent) {
    const visited = new Array(residualGraph.length).fill(false);
    const queue = [source];
    visited[source] = true;
  
    while (queue.length) {
      const u = queue.shift();
  
      for (let v = 0; v < residualGraph.length; v++) {
        if (!visited[v] && residualGraph[u][v] > 0) {
          queue.push(v);
          parent[v] = u;
          visited[v] = true;
        }
      }
    }
  
    return visited[sink];
  }
  
  export function fordFulkerson(graph, source, sink) {
    const nodes = graph.nodes.length;
    const residualGraph = Array.from({ length: nodes }, () => Array(nodes).fill(0));
  
    graph.edges.forEach(({ from, to, capacity }) => {
      residualGraph[from][to] = capacity;
    });
  
    const parent = new Array(nodes).fill(-1);
    let maxFlow = 0;
  
    while (bfs(residualGraph, source, sink, parent)) {
      let pathFlow = Infinity;
  
      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        pathFlow = Math.min(pathFlow, residualGraph[u][v]);
      }
  
      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        residualGraph[u][v] -= pathFlow;
        residualGraph[v][u] += pathFlow;
      }
  
      maxFlow += pathFlow;
    }
  
    const path = [];
    for (let v = sink; v !== source; v = parent[v]) {
      const u = parent[v];
      path.push(`${u}-${v}`);
    }
  
    return { maxFlow, path };
  }
  */
  function bfs(residualGraph, source, sink, parent) {
    const visited = new Array(residualGraph.length).fill(false);
    const queue = [source];
    visited[source] = true;
  
    while (queue.length) {
      const u = queue.shift();
  
      for (let v = 0; v < residualGraph.length; v++) {
        if (!visited[v] && residualGraph[u][v] > 0) {
          queue.push(v);
          parent[v] = u;
          visited[v] = true;
        }
      }
    }
  
    return visited[sink];
  }
  
  export function fordFulkerson(graph, source, sink) {
    const nodes = graph.nodes.length;
    if (source < 0 || sink >= nodes || source === sink) {
      throw new Error('Fuente y destino invalidos');
    }
  
    const residualGraph = Array.from({ length: nodes }, () => Array(nodes).fill(0));
  
    graph.edges.forEach(({ from, to, capacity }) => {
      if (from < 0 || to < 0 || from >= nodes || to >= nodes || capacity <= 0) {
        //throw new Error(`Invalid edge definition: (${from}, ${to}, ${capacity})`);
        throw new Error(`Dato invalido (${from}, ${to}, ${capacity})`);
      }
      residualGraph[from][to] = capacity;
    });
  
    const parent = new Array(nodes).fill(-1);
    let maxFlow = 0;
  
    while (bfs(residualGraph, source, sink, parent)) {
      let pathFlow = Infinity;
  
      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        pathFlow = Math.min(pathFlow, residualGraph[u][v]);
      }
  
      for (let v = sink; v !== source; v = parent[v]) {
        const u = parent[v];
        residualGraph[u][v] -= pathFlow;
        residualGraph[v][u] += pathFlow;
      }
  
      maxFlow += pathFlow;
    }
  
    const path = [];
    let v = sink;
    while (v !== source) {
      const u = parent[v];
      if (u === -1) {
        throw new Error('No existe camino entre fuente y destino');
      }
      path.push(`${u}-${v}`);
      v = u;
    }
  
    path.reverse();
  
    return { maxFlow, path };
  }
  