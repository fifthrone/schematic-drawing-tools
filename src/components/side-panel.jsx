function SidePanel({ className }) {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className={`${className} p-6`}>
      <div className="text-xl font-semibold pb-3">Shapes</div>

      <div className="grid grid-cols-2 gap-2">
        <div
          className="border border-neutral-400 p-4 rounded-lg hover:bg-white flex items-center justify-center"
          onDragStart={(event) => onDragStart(event, "coupler")}
          draggable
        >
          Coupler
        </div>
        <div
          className="border border-neutral-400 p-4 rounded-lg hover:bg-white flex items-center justify-center"
          onDragStart={(event) => onDragStart(event, "omni")}
          draggable
        >
          Omni
        </div>
        <div
          className="border border-neutral-400 p-4 rounded-lg hover:bg-white flex items-center justify-center"
          onDragStart={(event) => onDragStart(event, "hybrid")}
          draggable
        >
          Hybrid
        </div>
        <div
          className="border border-neutral-400 p-4 rounded-lg hover:bg-white flex items-center justify-center"
          onDragStart={(event) => onDragStart(event, "panel")}
          draggable
        >
          Panel
        </div>
        <div
          className="border border-neutral-400 p-4 rounded-lg hover:bg-white flex items-center justify-center"
          onDragStart={(event) => onDragStart(event, "fromBTS")}
          draggable
        >
          From BTS
        </div>
        <div
          className="border border-neutral-400 p-4 rounded-lg hover:bg-white flex items-center justify-center"
          onDragStart={(event) => onDragStart(event, "omni")}
          draggable
        >
          Splitter
        </div>
        <div
          className="border border-neutral-400 p-4 rounded-lg hover:bg-white flex items-center justify-center"
          onDragStart={(event) => onDragStart(event, "omni")}
          draggable
        >
          Donor
        </div>
      </div>
    </div>
  );
}

export default SidePanel;
