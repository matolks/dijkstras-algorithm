/* SCROLLING DEMO */

document.addEventListener("DOMContentLoaded", () => {
  const stepBlocks = Array.from(document.querySelectorAll("[data-work-step]"));
  const caption = document.getElementById("workTableCaption");
  const prevBtn = document.getElementById("prevWorkStep");
  const nextBtn = document.getElementById("nextWorkStep");
  if (stepBlocks.length === 0 || !caption) return;

  const states = {
    1: {
      caption:
        "Follow the table as it updates while you move through the steps",
      distances: { A: "0", B: "∞", C: "∞", D: "∞", E: "∞" },
      previous: { A: "—", B: "—", C: "—", D: "—", E: "—" },
      status: {
        A: "Start",
        B: "Unvisited",
        C: "Unvisited",
        D: "Unvisited",
        E: "Destination",
      },
      changed: ["A"],
      final: [],
      currentNode: "A",
      activeEdges: [],
      routeEdges: [],
    },
    2: {
      caption: "Table after visiting A.",
      distances: { A: "0", B: "4", C: "2", D: "∞", E: "∞" },
      previous: { A: "—", B: "A", C: "A", D: "—", E: "—" },
      status: {
        A: "Visited",
        B: "Unvisited",
        C: "Unvisited",
        D: "Unvisited",
        E: "Destination",
      },
      changed: ["B", "C"],
      final: ["A"],
      currentNode: "A",
      activeEdges: ["ab", "ac"],
      routeEdges: [],
    },
    3: {
      caption: "Table after visiting C.",
      distances: { A: "0", B: "4", C: "2", D: "10", E: "∞" },
      previous: { A: "—", B: "A", C: "A", D: "C", E: "—" },
      status: {
        A: "Visited",
        B: "Unvisited",
        C: "Visited",
        D: "Unvisited",
        E: "Destination",
      },
      changed: ["B", "D"],
      final: ["A", "C"],
      currentNode: "C",
      activeEdges: ["cd"],
      routeEdges: ["ac"],
    },
    4: {
      caption: "Table after visiting B.",
      distances: { A: "0", B: "4", C: "2", D: "9", E: "14" },
      previous: { A: "—", B: "A", C: "A", D: "B", E: "B" },
      status: {
        A: "Visited",
        B: "Visited",
        C: "Visited",
        D: "Unvisited",
        E: "Destination",
      },
      changed: ["D", "E"],
      final: ["A", "B", "C"],
      currentNode: "B",
      activeEdges: ["bd", "be"],
      routeEdges: ["ab", "ac"],
    },
    5: {
      caption: "Table after visiting D.",
      distances: { A: "0", B: "4", C: "2", D: "9", E: "11" },
      previous: { A: "—", B: "A", C: "A", D: "B", E: "D" },
      status: {
        A: "Visited",
        B: "Visited",
        C: "Visited",
        D: "Visited",
        E: "Destination",
      },
      changed: ["E"],
      final: ["A", "B", "C", "D"],
      currentNode: "D",
      activeEdges: ["de"],
      routeEdges: ["ab", "ac", "bd"],
    },
    6: {
      caption: "Final table when E is selected.",
      distances: { A: "0", B: "4", C: "2", D: "9", E: "11" },
      previous: { A: "—", B: "A", C: "A", D: "B", E: "D" },
      status: {
        A: "Visited",
        B: "Visited",
        C: "Visited",
        D: "Visited",
        E: "Destination reached",
      },
      changed: [],
      final: ["A", "B", "C", "D", "E"],
      currentNode: "E",
      activeEdges: [],
      routeEdges: ["ab", "ac", "bd", "de"],
    },
    7: {
      caption:
        "Use the previous node column to trace E → D → B → A, then reverse it.",
      distances: { A: "0", B: "4", C: "2", D: "9", E: "11" },
      previous: { A: "—", B: "A", C: "A", D: "B", E: "D" },
      status: {
        A: "Visited",
        B: "Visited",
        C: "Visited",
        D: "Visited",
        E: "Destination reached",
      },
      changed: [],
      final: ["A", "B", "C", "D", "E"],
      currentNode: null,
      activeEdges: [],
      routeEdges: ["ab", "bd", "de"],
      routeNodes: ["A", "B", "D", "E"],
    },
  };

  const nodes = ["A", "B", "C", "D", "E"];
  const edgeKeys = ["ab", "ac", "bd", "cd", "be", "de"];
  let activeStep = 1;
  let manualScroll = false;

  function renderGraph(state) {
    edgeKeys.forEach((edgeKey) => {
      const edge = document.getElementById(`work-edge-${edgeKey}`);
      if (!edge) return;
      edge.classList.remove("edge-active", "edge-route", "edge-faded");
      if (state.routeEdges.includes(edgeKey)) edge.classList.add("edge-route");
      else if (state.activeEdges.includes(edgeKey))
        edge.classList.add("edge-active");
      else if (activeStep > 1) edge.classList.add("edge-faded");
    });

    nodes.forEach((node) => {
      const nodeElement = document.getElementById(
        `work-node-${node.toLowerCase()}`,
      );
      if (!nodeElement) return;
      nodeElement.classList.remove(
        "node-current",
        "node-visited",
        "node-route",
      );

      if (state.routeNodes?.includes(node))
        nodeElement.classList.add("node-route");
      else if (node === state.currentNode)
        nodeElement.classList.add("node-current");
      else if (state.final.includes(node))
        nodeElement.classList.add("node-visited");
    });
  }

  function renderStep(stepNumber) {
    activeStep = Number(stepNumber);
    const state = states[activeStep] || states[1];
    caption.innerHTML = `<strong>Figure 2.</strong> ${state.caption}`;

    stepBlocks.forEach((block) => {
      block.classList.toggle(
        "active-step",
        Number(block.dataset.workStep) === activeStep,
      );
    });

    nodes.forEach((node) => {
      const dist = document.getElementById(`workDist${node}`);
      const prev = document.getElementById(`workPrev${node}`);
      const status = document.getElementById(`workStatus${node}`);
      [dist, prev, status].forEach((cell) =>
        cell?.classList.remove("changed", "final"),
      );
      if (dist) dist.textContent = state.distances[node];
      if (prev) prev.textContent = state.previous[node];
      if (status) status.textContent = state.status[node];
      if (state.changed.includes(node)) {
        dist?.classList.add("changed");
        prev?.classList.add("changed");
      }
      if (state.final.includes(node)) dist?.classList.add("final");
    });

    renderGraph(state);

    if (prevBtn) prevBtn.disabled = activeStep === 1;
    if (nextBtn) nextBtn.disabled = activeStep === stepBlocks.length;
  }

  function scrollToStep(stepNumber) {
    const target = stepBlocks.find(
      (block) => Number(block.dataset.workStep) === Number(stepNumber),
    );
    if (!target) return;
    manualScroll = true;
    renderStep(stepNumber);
    const top = target.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: "smooth" });
    window.setTimeout(() => {
      manualScroll = false;
    }, 650);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (manualScroll) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) renderStep(visible.target.dataset.workStep);
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: [0.2, 0.45, 0.7] },
    );
    stepBlocks.forEach((block) => observer.observe(block));
  }

  stepBlocks.forEach((block) => {
    block.addEventListener("click", () => scrollToStep(block.dataset.workStep));
    block.addEventListener("focusin", () => renderStep(block.dataset.workStep));
  });

  prevBtn?.addEventListener("click", () =>
    scrollToStep(Math.max(1, activeStep - 1)),
  );
  nextBtn?.addEventListener("click", () =>
    scrollToStep(Math.min(stepBlocks.length, activeStep + 1)),
  );

  renderStep(1);
});
