"use client";

function SidePanel({ className }) {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<div
			className={`${className} overflowy-scroll xwhitespace-nowrap p-6 [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden`}
		>
			<div className="text-xl font-semibold">Shapes</div>
			<div className="mb-2 text-[11px] leading-none">
				Drag and drop to add shape
			</div>

			<div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
				<div
					className="flex flex-col items-center justify-center space-y-1 rounded-lg border border-neutral-400 p-2 duration-300 hover:bg-white"
					onDragStart={(event) => onDragStart(event, "coupler")}
					draggable
				>
					<div className="relative h-9 w-14 scale-75 border border-black">
						<div className="absolute top-0 left-8 h-2 w-4 bg-black"></div>
						<div className="absolute left-3 top-0 h-4 w-[1px] -translate-x-1/2 bg-black"></div>
						<div className="absolute left-3 right-3 top-0 h-4 border-r border-b border-black"></div>
						<hr className="absolute top-6 right-0 left-0 -translate-y-1/2 border-black"></hr>
						<div className="absolute top-6 left-1 h-[6px] w-[6px] -translate-y-1/2 rotate-45 border-t border-r border-black"></div>
						<div className="absolute top-6 left-10 h-[6px] w-[6px] -translate-y-1/2 rotate-45 border-t border-r border-black"></div>
						<div className="absolute top-[6px] left-3 h-[6px] w-[6px] -translate-x-1/2 -rotate-45 border-t border-r border-black"></div>
					</div>
					<h2 className="text-sm">Coupler</h2>
				</div>
				<div
					className="flex flex-col items-center justify-center space-y-1 rounded-lg border border-neutral-400 p-2 duration-300 hover:bg-white"
					onDragStart={(event) => onDragStart(event, "omni")}
					draggable
				>
					<div className="relative h-10 w-10 scale-75">
						<svg viewBox="0 0 100 100" className="h-full w-full">
							<polygon
								points="0,14 100,14 50,100"
								className="fill-current stroke-black stroke-[3px] text-white"
							/>
						</svg>
					</div>
					<h2 className="text-sm">Omni</h2>
				</div>
				<div
					className="flex flex-col items-center justify-center space-y-1 rounded-lg border border-neutral-400 p-2 duration-300 hover:bg-white"
					onDragStart={(event) => onDragStart(event, "hybrid")}
					draggable
				>
					<div className="relative h-9 w-14 scale-75 border border-black">
						<svg viewBox="0 0 142 90" className="h-full w-full">
							<polyline
								points="0,10 20,10 122,80, 142,80"
								className="fill-current stroke-black stroke-[3px] text-white"
							/>
							<polyline
								points="0,80 20,80 122,10, 142,10"
								className="fill-current stroke-black stroke-[3px] text-white"
							/>
						</svg>
					</div>
					<h2 className="text-sm">Hybrid</h2>
				</div>
				<div
					className="flex flex-col items-center justify-center space-y-1 rounded-lg border border-neutral-400 p-2 duration-300 hover:bg-white"
					onDragStart={(event) => onDragStart(event, "panel")}
					draggable
				>
					<div className="relative h-10 scale-100">
						<svg viewBox="0 0 82 160" className="h-full w-full">
							<polygon
								points="40,0 80,40 80,120, 40,160"
								className="fill-current stroke-black stroke-[3px] text-white"
							/>
						</svg>
					</div>
					<h2 className="text-sm">Panel</h2>
				</div>
				<div
					className="flex flex-col items-center justify-center space-y-1 rounded-lg border border-neutral-400 p-2 duration-300 hover:bg-white"
					onDragStart={(event) => onDragStart(event, "fromBTS")}
					draggable
				>
					<div className="relative flex h-10 w-10 flex-col items-center justify-center space-y-0 border border-black p-1 text-xs text-black">
						<p className="leading-none">Input</p>
					</div>
					<h2 className="text-sm">Input</h2>
				</div>
				<div
					className="flex flex-col items-center justify-center space-y-1 rounded-lg border border-neutral-400 p-2 duration-300 hover:bg-white"
					onDragStart={(event) => onDragStart(event, "splitter")}
					draggable
				>
					<h2 className="text-sm">Splitter</h2>
				</div>
				<div
					className="flex flex-col items-center justify-center space-y-1 rounded-lg border border-neutral-400 p-2 duration-300 hover:bg-white"
					onDragStart={(event) => onDragStart(event, "donor")}
					draggable
				>
					<h2 className="text-sm">Donor</h2>
				</div>
			</div>
		</div>
	);
}

export default SidePanel;
