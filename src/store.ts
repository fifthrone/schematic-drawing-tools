import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  Viewport,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const initialViewport: Viewport = { x: 0, y: 0, zoom: 1 };

type RFState = {
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setViewport: (viewport: Viewport) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (newNode: Node) => void;
  updateNodeCouplerId: (nodeId: string, couplerId: string) => void;
  updateNodeCouplerLoss: (nodeId: string, couplerId: number) => void;
  updateNodeOmniId: (nodeId: string, omniId: string) => void;
  updateNodeHybridId: (nodeId: string, hybridId: string) => void;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<RFState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  viewport: initialViewport,
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  setViewport: (viewport) => {
    set({ viewport });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  addNode: (newNode: Node) => {
    set({
      nodes: [...get().nodes, newNode],
    });
  },
  addEdge: (newEdge: Edge) => {
    set({
      edges: [...get().edges, newEdge],
    });
  },
  updateNodeCouplerId: (nodeId: string, couplerId: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, couplerId };
        }
        return node;
      }),
    });
  },
  updateNodeCouplerLoss: (nodeId: string, couplerLoss: number) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, couplerLoss };
        }
        return node;
      }),
    });
  },
  updateNodeCouplerRotation: (nodeId: string, rotation: number) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, rotation };
        }
        return node;
      }),
    });
  },
  updateNodeCouplerFlipX: (nodeId: string, flipX: boolean) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, flipX };
        }
        return node;
      }),
    });
  },
  updateNodeCouplerFlipY: (nodeId: string, flipY: boolean) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, flipY };
        }
        return node;
      }),
    });
  },
  updateNodeOmniId: (nodeId: string, omniId: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, omniId };
        }
        return node;
      }),
    });
  },
  updateNodeHybridId: (nodeId: string, hybridId: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, hybridId };
        }
        return node;
      }),
    });
  },
  deselectNode: (nodeId: string) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.selected = false;
        }
        return node;
      }),
    });
  },
}));

export default useStore;
