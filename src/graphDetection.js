import graphlib from 'graphlib';
const { Graph, alg } = graphlib;

/**
 * Builds a directed graph using integer status indices as nodes.
 * @param {Array} automations - Array of automation config objects
 * @returns {{ activeGraph: Graph, fullGraph: Graph }}
 */
export function buildGraphs(automations) {
    const activeGraph = new Graph({ directed: true });
    const fullGraph = new Graph({ directed: true });
    automations.forEach(auto => {
        const from = auto.config["0"].statusColumnValue.index;
        const to = auto.config["1"].statusColumnValue.index;

        fullGraph.setEdge(String(from), String(to), `automation #${auto.id}`);
        if (auto.active) {
            activeGraph.setEdge(String(from), String(to), `automation #${auto.id}`);
        }
    });

    return { activeGraph, fullGraph };
}

/**
 * Finds all cycles in a graph where a path loops back to the same node.
 * @param {Graph} graph
 * @returns {Array<Array<string>>} - Array of node paths forming cycles
 */
export function detectCycles(graph) {
    return alg.findCycles(graph);
}