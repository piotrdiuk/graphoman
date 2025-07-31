import { expect } from 'chai';
import { buildGraphs, detectCycles } from '../src/graphDetection.js';
import data from '../src/mondaycom/automations.json' with { type: 'json' };

describe('graphoman: cycle detection', () => {
  const { automations } = data;
  const { fullGraph } = buildGraphs(automations);

  it('builds graphs with edges based on Monday.com automation.json', () => {
    expect(fullGraph.nodeCount()).to.be.greaterThan(0);
    expect(fullGraph.edgeCount()).to.be.greaterThan(0);
  });

  it('detects cycles in full graph', () => {
    const cycles = detectCycles(fullGraph);
    expect(cycles).to.be.an('array');
  });

  it('builds graphs with 2 edges and correct nodes', () => {
    console.log('Nodes:', fullGraph.nodes());
    console.log('Edges:', fullGraph.edges());
    expect(fullGraph.edgeCount()).to.equal(2);
    expect(fullGraph.nodeCount()).to.equal(2);
  });

  it('detects a cycle between nodes 0 and 2', () => {
    const cycles = detectCycles(fullGraph);
    console.log('Cycles detected:', cycles);
    expect(cycles).to.be.an('array').that.is.not.empty;
    expect(cycles[0]).to.have.members(['0', '2']);
  });
});

