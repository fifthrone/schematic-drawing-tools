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

const initialNodes: Node[] = [
	{
		data: {},
		id: "455760a7-612b-4f71-8347-fad8bec9d4ee",
		position: { x: -13.056240116429024, y: 402.8602702120768 },
		selected: false,
		type: "fromBTS",
	},
	{
		data: {
			couplerId: "C0",
			couplerLoss: 6,
			rotation: 0,
			flipX: false,
			flipY: false,
		},
		id: "7620805a-a6ab-4fdc-8ae6-1147a9e3f2e9",
		position: { x: 202.30764000161184, y: 575.76950695756614 },
		selected: false,
		type: "coupler",
	},
	{
		data: { omniId: "0" },
		id: "c3d1d9b2-7d2e-463b-8d67-34819a42965c",
		position: { x: 202.30764000161184, y: 415.76950695756614 },
		selected: false,
		type: "omni",
	},
	{
		data: { hybridId: "C0" },
		id: "297a90bb-1a38-42d8-998a-0a2b0610f32b",
		position: { x: 406.2936709505092, y: 569.3090430384202 },
		selected: false,
		type: "hybrid",
	},
	{
		data: { omniId: "0" },
		id: "cda8d5e1-980e-4702-96ce-a4521ba90ddb",
		position: { x: 527.1006039993362, y: 419.3090430384202 },
		selected: false,
		type: "omni",
	},
	{
		data: { omniId: "0" },
		id: "77f80d41-3011-42aa-b66c-33c6b417d0e5",
		position: { x: 712.9424596759203, y: 419.3090430384202 },
		selected: false,
		type: "omni",
	},
	{
		data: {
			couplerId: "C0",
			couplerLoss: 6,
			rotation: 0,
			flipX: false,
			flipY: false,
		},
		id: "d74eda08-4466-4f10-a7ac-ea85841b9fe0",
		position: { x: 200.75243659645975, y: 161.47592937356967 },
		selected: true,
		type: "coupler",
	},
];

const initialEdges: Edge[] = [
	{
		data: { feederId: "S0", feederLength: 1, feederType: "LDF4" },
		id: "reactflow__edge-455760a7-612b-4f71-8347-fad8bec9d4ee2-7620805a-a6ab-4fdc-8ae6-1147a9e3f2e9input",
		source: "455760a7-612b-4f71-8347-fad8bec9d4ee",
		sourceHandle: "2",
		target: "7620805a-a6ab-4fdc-8ae6-1147a9e3f2e9",
		targetHandle: "input",
		type: "feeder",
	},
	{
		data: { feederId: "S0", feederLength: 1, feederType: "LDF4" },
		id: "reactflow__edge-7620805a-a6ab-4fdc-8ae6-1147a9e3f2e9coupling-c3d1d9b2-7d2e-463b-8d67-34819a42965c",
		source: "7620805a-a6ab-4fdc-8ae6-1147a9e3f2e9",
		sourceHandle: "coupling",
		target: "c3d1d9b2-7d2e-463b-8d67-34819a42965c",
		targetHandle: null,
		type: "feeder",
	},
	{
		data: { feederId: "S0", feederLength: 1, feederType: "LDF4" },
		id: "reactflow__edge-7620805a-a6ab-4fdc-8ae6-1147a9e3f2e9direct-297a90bb-1a38-42d8-998a-0a2b0610f32binput",
		source: "7620805a-a6ab-4fdc-8ae6-1147a9e3f2e9",
		sourceHandle: "direct",
		target: "297a90bb-1a38-42d8-998a-0a2b0610f32b",
		targetHandle: "input",
		type: "feeder",
	},
	{
		data: { feederId: "S0", feederLength: 1, feederType: "LDF4" },
		id: "reactflow__edge-297a90bb-1a38-42d8-998a-0a2b0610f32boutput1-cda8d5e1-980e-4702-96ce-a4521ba90ddb",
		source: "297a90bb-1a38-42d8-998a-0a2b0610f32b",
		sourceHandle: "output1",
		target: "cda8d5e1-980e-4702-96ce-a4521ba90ddb",
		targetHandle: null,
		type: "feeder",
	},
	{
		data: { feederId: "S0", feederLength: 1, feederType: "LDF4" },
		id: "reactflow__edge-297a90bb-1a38-42d8-998a-0a2b0610f32boutput2-77f80d41-3011-42aa-b66c-33c6b417d0e5",
		source: "297a90bb-1a38-42d8-998a-0a2b0610f32b",
		sourceHandle: "output2",
		target: "77f80d41-3011-42aa-b66c-33c6b417d0e5",
		targetHandle: null,
		type: "feeder",
	},
	{
		data: { feederId: "S0", feederLength: 1, feederType: "LDF4" },
		id: "reactflow__edge-455760a7-612b-4f71-8347-fad8bec9d4ee3-d74eda08-4466-4f10-a7ac-ea85841b9fe0input",
		source: "455760a7-612b-4f71-8347-fad8bec9d4ee",
		sourceHandle: "1",
		target: "d74eda08-4466-4f10-a7ac-ea85841b9fe0",
		targetHandle: "input",
		type: "feeder",
	},
];

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
	updateEdgeFeederId: (edgeId: string, feederId: string) => void;
	updateEdgeFeederLength: (edgeId: string, feederLength: number) => void;
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
	updateEdgeFeederId: (edgeId: string, feederId: string) => {
		set({
			edges: get().edges.map((edge) => {
				if (edge.id === edgeId) {
					edge.data = { ...edge.data, feederId };
				}
				return edge;
			}),
		});
	},
	updateEdgeFeederLength: (edgeId: string, feederLength: number) => {
		set({
			edges: get().edges.map((edge) => {
				console.log(edge);

				if (edge.id === edgeId) {
					edge.data = { ...edge.data, feederLength };
					console.log({ ...edge.data, feederLength });
				}
				return edge;
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
