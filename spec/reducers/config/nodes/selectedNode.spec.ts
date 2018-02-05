import { changeNodeIntent, changeNode } from 'actions/config';
import { State, selectedNode } from 'reducers/config/nodes/selectedNode';

export const expectedState: { [key: string]: State } = {
  initialState: { nodeId: 'eth_mew', pending: false },
  nodeChange: { nodeId: 'nodeToChangeTo', pending: false },
  nodeChangeIntent: { nodeId: 'eth_mew', pending: true }
};

export const actions = {
  changeNode: changeNode({ nodeId: 'nodeToChangeTo', networkId: 'networkToChangeTo' }),
  changeNodeIntent: changeNodeIntent('eth_mew')
};

describe('selected node reducer', () => {
  it(' should return the initial state', () =>
    expect(selectedNode(undefined, {} as any)).toEqual(expectedState.initialState));

  it('should handle a node change', () =>
    expect(selectedNode(undefined, actions.changeNode)).toEqual(expectedState.nodeChange));

  it('should handle the intent to change a node', () =>
    expect(selectedNode(expectedState.initialState, actions.changeNodeIntent)).toEqual(
      expectedState.nodeChangeIntent
    ));
});
