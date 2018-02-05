import { addCustomNode, removeCustomNode } from 'actions/config';
import { CustomNodeConfig } from 'types/node';
import { customNodes } from 'reducers/config/nodes/customNodes';

const firstCustomNodeId = 'customNode1';
const firstCustomNode: CustomNodeConfig = {
  isCustom: true,
  id: firstCustomNodeId,
  lib: jest.fn() as any,
  name: 'My cool custom node',
  network: 'CustomNetworkId',
  port: 8080,
  service: 'your custom node',
  url: '127.0.0.1'
};

const secondCustomNodeId = 'customNode2';
const secondCustomNode: CustomNodeConfig = {
  ...firstCustomNode,
  id: secondCustomNodeId
};

const expectedStates = {
  initialState: {},
  addFirstCustomNode: { [firstCustomNodeId]: firstCustomNode },
  addSecondCustomNode: {
    [firstCustomNodeId]: firstCustomNode,
    [secondCustomNodeId]: secondCustomNode
  },
  removeFirstCustomNode: { [secondCustomNodeId]: secondCustomNode }
};

const actions = {
  addFirstCustomNode: addCustomNode({ id: firstCustomNodeId, config: firstCustomNode }),
  addSecondCustomNode: addCustomNode({ id: secondCustomNodeId, config: secondCustomNode }),
  removeFirstCustomNode: removeCustomNode({ id: firstCustomNodeId })
};

describe('custom nodes reducer', () => {
  it('should return the initial state', () =>
    expect(customNodes(undefined, {} as any)).toEqual({}));

  it('should handle adding the first custom node', () =>
    expect(customNodes(expectedStates.initialState, actions.addFirstCustomNode)).toEqual(
      expectedStates.addFirstCustomNode
    ));
  it('should handle adding a second custom node', () =>
    expect(customNodes(expectedStates.addFirstCustomNode, actions.addSecondCustomNode)).toEqual(
      expectedStates.addSecondCustomNode
    ));
  it('should handle removing the first custom node', () =>
    expect(customNodes(expectedStates.addSecondCustomNode, actions.removeFirstCustomNode)).toEqual(
      expectedStates.removeFirstCustomNode
    ));
});
