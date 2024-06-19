// Función para encontrar el flujo máximo usando el algoritmo de Ford-Fulkerson
export function fordFulkerson(graphData) {
    const { nodes, edges, source, sink } = graphData;
    const n = nodes.length; // Número de nodos en el grafo
    let maxFlow = 0;

    // Crear grafo residual inicializando con capacidades de los arcos
    const residualGraph = {};
    for (let node of nodes) {
        residualGraph[node.id] = {};
    }

    for (let edge of edges) {
        const { from, to, capacity } = edge;
        // Inicializar capacidades residuales en el grafo residual
        residualGraph[from][to] = capacity;
        residualGraph[to][from] = 0; // Asumiendo que es un grafo no dirigido, inicializar con 0
    }

    // Función auxiliar para encontrar un camino aumentante usando BFS
    function bfs(parent) {
        const visited = {};
        const queue = [source];
        visited[source] = true;

        while (queue.length > 0) {
            const u = queue.shift();

            for (let v in residualGraph[u]) {
                if (!visited[v] && residualGraph[u][v] > 0) {
                    parent[v] = u;
                    visited[v] = true;
                    if (v === sink) {
                        return true; // Se encontró un camino hasta el sumidero
                    }
                    queue.push(v);
                }
            }
        }

        return false; // No se encontró ningún camino hasta el sumidero
    }

    // Aplicar el algoritmo de Ford-Fulkerson
    const parent = {};
    while (bfs(parent)) {
        // Encontrar la capacidad residual mínima a lo largo del camino encontrado
        let pathFlow = Infinity;
        for (let v = sink; v !== source; v = parent[v]) {
            const u = parent[v];
            pathFlow = Math.min(pathFlow, residualGraph[u][v]);
        }

        // Actualizar las capacidades residuales del grafo residual
        for (let v = sink; v !== source; v = parent[v]) {
            const u = parent[v];
            residualGraph[u][v] -= pathFlow;
            residualGraph[v][u] += pathFlow;
        }

        maxFlow += pathFlow;
    }

    return { maxFlow, parent };
}
