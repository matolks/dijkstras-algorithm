/*STEPS DEMO*/

const steps = [
  {
    number: "Step 1",
    title: "Initialization",
    description:
      "The algorithm initializes by setting the distance to node A to 0 and all other nodes are set to infinity.",
    distances: { A: "0", B: "∞", C: "∞", D: "∞", E: "∞" },
    currentNodes: ["a"],
    visitedNodes: [],
    activeEdges: [],
    routeEdges: [],
  },
  {
    number: "Step 2",
    title: "Relaxation from A",
    description:
      "From node A, the algorithm can reach its neighbors B with cost 4 and C with cost 2. Since their values were infinity, their values get set.",
    distances: { A: "0", B: "4", C: "2", D: "∞", E: "∞" },
    currentNodes: ["a"],
    visitedNodes: ["a"],
    activeEdges: ["ab", "ac"],
    routeEdges: [],
  },
  {
    number: "Step 3",
    title: "Selection and Relaxation",
    description:
      "The algorithm can choose from B or C now. 2 < 4 so the algorithm selects C and does relaxation. This discovers D.",
    distances: { A: "0", B: "4", C: "2", D: "10", E: "∞" },
    currentNodes: ["c"],
    visitedNodes: ["a", "c"],
    activeEdges: ["ac", "cd"],
    routeEdges: [],
  },
  {
    number: "Step 4",
    title: "Selection and Relaxation",
    description:
      "The algorithm can choose from B or D. 4 < 10, so the algorithm selects B and does relaxation. From B, the neighbors are both E and D. E was unknown so the algorithm sets its value. D has a known value of 10, but since D can be reached in 9 going though B the algorithm updates it.",
    distances: { A: "0", B: "4", C: "2", D: "9", E: "14" },
    currentNodes: ["b"],
    visitedNodes: ["a", "c", "b"],
    activeEdges: ["ab", "bd", "be"],
    routeEdges: [],
  },
  {
    number: "Step 5",
    title: "Selection and Relaxation",
    description:
      "The algorithm can choose from D or E now. 9 < 14, D is selected. From D, the algorithm finds a shorter path to E.",
    distances: { A: "0", B: "4", C: "2", D: "9", E: "11" },
    currentNodes: ["d"],
    visitedNodes: ["a", "c", "b", "d"],
    activeEdges: ["ab", "bd", "de"],
    routeEdges: [],
  },
  {
    number: "Step 6",
    title: "Termination",
    description:
      "E now has the smallest final value, 11, so the route optimization is complete. The shortest path is A → B → D → E.",
    distances: { A: "0", B: "4", C: "2", D: "9", E: "11" },
    currentNodes: ["e"],
    visitedNodes: ["a", "c", "b", "d", "e"],
    activeEdges: [],
    routeEdges: ["ab", "bd", "de"],
  },
];
let currentStep = 0;

const stepNumber = document.getElementById("stepNumber");
const stepTitle = document.getElementById("stepTitle");
const stepDescription = document.getElementById("stepDescription");
const labelA = document.getElementById("labelA");
const labelB = document.getElementById("labelB");
const labelC = document.getElementById("labelC");
const labelD = document.getElementById("labelD");
const labelE = document.getElementById("labelE");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const nodeIds = ["a", "b", "c", "d", "e"];
const edgeIds = ["ab", "ac", "bd", "cd", "be", "de"];

function resetDijkstraGraph() {
  nodeIds.forEach((id) => {
    const node = document.getElementById(`node-${id}`);
    node.classList.remove("node-current", "node-visited");
  });
  edgeIds.forEach((id) => {
    const edge = document.getElementById(`edge-${id}`);
    edge.classList.remove("edge-active", "edge-route");
  });
}

function updateDistanceBoxes(distances) {
  const svgLabels = {
    a: document.querySelector("#dist-a .distance-text"),
    b: document.querySelector("#dist-b .distance-text"),
    c: document.querySelector("#dist-c .distance-text"),
    d: document.querySelector("#dist-d .distance-text"),
    e: document.querySelector("#dist-e .distance-text"),
  };
  labelA.textContent = distances.A;
  labelB.textContent = distances.B;
  labelC.textContent = distances.C;
  labelD.textContent = distances.D;
  labelE.textContent = distances.E;
  svgLabels.a.textContent = distances.A;
  svgLabels.b.textContent = distances.B;
  svgLabels.c.textContent = distances.C;
  svgLabels.d.textContent = distances.D;
  svgLabels.e.textContent = distances.E;
}

function renderStep(index) {
  const step = steps[index];
  stepNumber.textContent = step.number;
  stepTitle.textContent = step.title;
  stepDescription.textContent = step.description;
  updateDistanceBoxes(step.distances);
  resetDijkstraGraph();

  step.visitedNodes.forEach((id) => {
    document.getElementById(`node-${id}`).classList.add("node-visited");
  });
  step.currentNodes.forEach((id) => {
    document.getElementById(`node-${id}`).classList.add("node-current");
  });
  step.activeEdges.forEach((id) => {
    document.getElementById(`edge-${id}`).classList.add("edge-active");
  });
  step.routeEdges.forEach((id) => {
    document.getElementById(`edge-${id}`).classList.add("edge-route");
  });
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === steps.length - 1;
}

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep -= 1;
    renderStep(currentStep);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep += 1;
    renderStep(currentStep);
  }
});

renderStep(currentStep);

/*LOOPING DEMO*/

const loopFrames = [
  {
    activeNodes: ["a"],
    activeEdges: ["ab", "ad"],
  },
  {
    activeNodes: ["b"],
    activeEdges: ["ab", "be", "bc"],
    visitedNodes: ["a"],
  },
  {
    activeNodes: ["e"],
    activeEdges: ["ab", "be", "ef", "de"],
    visitedNodes: ["a", "b"],
  },
  {
    activeNodes: ["f"],
    routeNodes: ["a", "b", "e", "f"],
    routeEdges: ["ab", "be", "ef"],
  },
];

const loopNodeIds = ["a", "b", "c", "d", "e", "f"];
const loopEdgeIds = ["ab", "bc", "ad", "be", "cf", "de", "ef"];
let loopIndex = 0;

function resetLoopDemo() {
  loopNodeIds.forEach((id) => {
    const node = document.getElementById(`loop-node-${id}`);
    node.classList.remove("node-current", "node-visited", "node-route");
  });
  loopEdgeIds.forEach((id) => {
    const edge = document.getElementById(`loop-edge-${id}`);
    edge.classList.remove("edge-active", "edge-route", "edge-faded");
  });
}

function renderLoopFrame(index) {
  const frame = loopFrames[index];
  resetLoopDemo();
  loopEdgeIds.forEach((id) => {
    document.getElementById(`loop-edge-${id}`).classList.add("edge-faded");
  });
  if (frame.visitedNodes) {
    frame.visitedNodes.forEach((id) => {
      document.getElementById(`loop-node-${id}`).classList.add("node-visited");
    });
  }
  if (frame.activeNodes) {
    frame.activeNodes.forEach((id) => {
      document.getElementById(`loop-node-${id}`).classList.add("node-current");
    });
  }
  if (frame.routeNodes) {
    frame.routeNodes.forEach((id) => {
      document.getElementById(`loop-node-${id}`).classList.add("node-route");
    });
  }
  if (frame.activeEdges) {
    frame.activeEdges.forEach((id) => {
      const edge = document.getElementById(`loop-edge-${id}`);
      edge.classList.remove("edge-faded");
      edge.classList.add("edge-active");
    });
  }
  if (frame.routeEdges) {
    frame.routeEdges.forEach((id) => {
      const edge = document.getElementById(`loop-edge-${id}`);
      edge.classList.remove("edge-faded");
      edge.classList.add("edge-route");
    });
  }
}

renderLoopFrame(loopIndex);

setInterval(() => {
  loopIndex = (loopIndex + 1) % loopFrames.length;
  renderLoopFrame(loopIndex);
}, 1500);
