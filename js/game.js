/* DIJKSTRA GAME */

document.addEventListener("DOMContentLoaded", () => {
  const rounds = [
    {
      header: "Select the starting node",
      answer: "S",
      distances: { S: "0", A: "∞", B: "∞", C: "∞", D: "∞", T: "∞" },
      previous: { S: "—", A: "—", B: "—", C: "—", D: "—", T: "—" },
      status: {
        S: "Start",
        A: "Unvisited",
        B: "Unvisited",
        C: "Unvisited",
        D: "Unvisited",
        T: "Destination",
      },
      visited: [],
      activeEdges: [],
      changed: ["S"],
      prompt: "",
      feedback:
        "Correct. S starts the route search and updates A = 3 and B = 1.",
    },
    {
      header: "Select the smallest current distance unvisted node",
      answer: "B",
      distances: { S: "0", A: "3", B: "1", C: "∞", D: "∞", T: "∞" },
      previous: { S: "—", A: "S", B: "S", C: "—", D: "—", T: "—" },
      status: {
        S: "Visited",
        A: "Unvisited",
        B: "Unvisited",
        C: "Unvisited",
        D: "Unvisited",
        T: "Destination",
      },
      visited: ["s"],
      activeEdges: ["sa", "sb"],
      changed: ["A", "B"],
      prompt: "Choose between A = 3 and B = 1.",
      feedback:
        "Correct. B is smaller, so visiting B improves A to 2 and discovers C = 5 and D = 6.",
    },
    {
      header: "Select the smallest current distance unvisted node",
      answer: "A",
      distances: { S: "0", A: "2", B: "1", C: "5", D: "6", T: "∞" },
      previous: { S: "—", A: "B", B: "S", C: "B", D: "B", T: "—" },
      status: {
        S: "Visited",
        A: "Unvisited",
        B: "Visited",
        C: "Unvisited",
        D: "Unvisited",
        T: "Destination",
      },
      visited: ["s", "b"],
      activeEdges: ["sb", "ba", "bc", "bd"],
      changed: ["A", "C", "D"],
      prompt: "Choose between A = 2, C = 5, and D = 6.",
      feedback:
        "Correct. A is next. A does not improve C because 2 + 3 = 5, which only ties the current value.",
    },
    {
      header: "Select the smallest current distance unvisted node",
      answer: "C",
      distances: { S: "0", A: "2", B: "1", C: "5", D: "6", T: "∞" },
      previous: { S: "—", A: "B", B: "S", C: "B", D: "B", T: "—" },
      status: {
        S: "Visited",
        A: "Visited",
        B: "Visited",
        C: "Unvisited",
        D: "Unvisited",
        T: "Destination",
      },
      visited: ["s", "b", "a"],
      activeEdges: ["sb", "ba", "ac"],
      changed: ["C", "D"],
      prompt: "Choose between C = 5 and D = 6.",
      feedback:
        "Correct. C is selected before D and gives the first route to T: 5 + 6 = 11.",
    },
    {
      header: "Select the smallest current distance unvisted node",
      answer: "D",
      distances: { S: "0", A: "2", B: "1", C: "5", D: "6", T: "11" },
      previous: { S: "—", A: "B", B: "S", C: "B", D: "B", T: "C" },
      status: {
        S: "Visited",
        A: "Visited",
        B: "Visited",
        C: "Visited",
        D: "Unvisited",
        T: "Destination",
      },
      visited: ["s", "b", "a", "c"],
      activeEdges: ["sb", "ba", "ac", "ct", "cd"],
      changed: ["D", "T"],
      prompt: "Choose between D = 6 and T = 11.",
      feedback:
        "Correct. D must be selected before T, and D improves T from 11 to 8.",
    },
    {
      header: "Select the smallest current distance unvisted node",
      answer: "T",
      distances: { S: "0", A: "2", B: "1", C: "5", D: "6", T: "8" },
      previous: { S: "—", A: "B", B: "S", C: "B", D: "B", T: "D" },
      status: {
        S: "Visited",
        A: "Visited",
        B: "Visited",
        C: "Visited",
        D: "Visited",
        T: "Destination",
      },
      visited: ["s", "b", "a", "c", "d"],
      activeEdges: ["sb", "bd", "dt"],
      changed: ["T"],
      prompt: "T is now the lowest unvisited node. Select T to finish.",
      feedback: "Correct. Trace the path and input below.",
    },
  ];

  const finalState = {
    distances: { S: "0", A: "2", B: "1", C: "5", D: "6", T: "8" },
    previous: { S: "—", A: "B", B: "S", C: "B", D: "B", T: "D" },
    status: {
      S: "Visited",
      A: "Visited",
      B: "Visited",
      C: "Visited",
      D: "Visited",
      T: "Destination reached",
    },
    visited: ["s", "b", "a", "c", "d", "t"],
    activeEdges: [],
    routeEdges: ["sb", "bd", "dt"],
    changed: [],
    final: ["S", "A", "B", "C", "D", "T"],
  };

  let roundIndex = 0;
  const gameHeader = document.getElementById("gameHeader");
  const gameGraph = document.getElementById("gameGraph");
  const gamePrompt = document.getElementById("gamePrompt");
  const gameFeedback = document.getElementById("gameFeedback");
  const gameRound = document.getElementById("gameRound");
  const gameSummary = document.getElementById("gameSummary");
  const resetGameBtn = document.getElementById("resetGameBtn");
  const choiceButtons = Array.from(document.querySelectorAll(".game-choice"));
  if (
    !gameGraph ||
    !gamePrompt ||
    !gameFeedback ||
    !gameRound ||
    !resetGameBtn ||
    choiceButtons.length === 0
  )
    return;

  const nodeIds = ["s", "a", "b", "c", "d", "t"];
  const edgeIds = ["sa", "sb", "ba", "ac", "bc", "bd", "cd", "ct", "dt"];
  const nodeLetters = ["S", "A", "B", "C", "D", "T"];

  function setFeedback(text, state = "") {
    gameFeedback.textContent = text;
    gameFeedback.classList.remove("success", "error");
    if (state) gameFeedback.classList.add(state);
  }

  function resetVisuals() {
    nodeIds.forEach((id) =>
      document
        .getElementById(`game-node-${id}`)
        ?.classList.remove("node-current", "node-visited", "node-route"),
    );
    edgeIds.forEach((id) =>
      document
        .getElementById(`game-edge-${id}`)
        ?.classList.remove("edge-active", "edge-route", "edge-faded"),
    );
    choiceButtons.forEach((button) =>
      button.classList.remove("correct-choice", "wrong-choice"),
    );
    nodeLetters.forEach((letter) => {
      document
        .getElementById(`gameDist${letter}`)
        ?.classList.remove("changed", "final");
      document
        .getElementById(`gamePrev${letter}`)
        ?.classList.remove("changed", "final");
    });
  }

  // GAME UPDATES
  function updateGameTable(state) {
    nodeLetters.forEach((letter) => {
      const dist = document.getElementById(`gameDist${letter}`);
      const prev = document.getElementById(`gamePrev${letter}`);
      const status = document.getElementById(`gameStatus${letter}`);
      if (dist) dist.textContent = state.distances[letter];
      if (prev) prev.textContent = state.previous[letter];
      if (status) status.textContent = state.status[letter];
      if (state.changed?.includes(letter)) {
        dist?.classList.add("changed");
        prev?.classList.add("changed");
      }
      if (
        state.final?.includes(letter) ||
        state.visited?.includes(letter.toLowerCase())
      )
        dist?.classList.add("final");
    });
  }

  function renderState(state, label, prompt, header) {
    resetVisuals();
    gameHeader.textContent = header;
    gameRound.textContent = label;
    gamePrompt.textContent = prompt;
    updateGameTable(state);
    state.visited?.forEach((id) =>
      document.getElementById(`game-node-${id}`)?.classList.add("node-visited"),
    );
    state.activeEdges?.forEach((id) =>
      document.getElementById(`game-edge-${id}`)?.classList.add("edge-active"),
    );
    state.routeEdges?.forEach((id) =>
      document.getElementById(`game-edge-${id}`)?.classList.add("edge-route"),
    );
  }

  function renderRound() {
    const round = rounds[roundIndex];
    renderState(round, `Round ${roundIndex + 1}`, round.prompt, round.header);
    const visitedBefore = new Set(
      rounds.slice(0, roundIndex).map((r) => r.answer),
    );
    choiceButtons.forEach((button) => {
      button.disabled = visitedBefore.has(button.dataset.node);
    });
  }

  // HANDLES USER INPUT
  function handleChoice(event) {
    const selected = event.currentTarget.dataset.node;
    const expected = rounds[roundIndex].answer;
    choiceButtons.forEach((button) =>
      button.classList.remove("correct-choice", "wrong-choice"),
    );
    if (selected !== expected) {
      event.currentTarget.classList.add("wrong-choice");
      setFeedback(
        `Not ${selected}. Select the unvisited node with the smallest current distance in the table.`,
        "error",
      );
      return;
    }
    event.currentTarget.classList.add("correct-choice");
    setFeedback(rounds[roundIndex].feedback, "success");
    if (roundIndex === rounds.length - 1) {
      renderState(
        finalState,
        "Complete",
        "T is reached. Now trace back through the Previous Node column and enter the shortest path below.",
      );
      choiceButtons.forEach((button) => (button.disabled = true));
      showPathInput();
      return;
    }
    roundIndex += 1;
    renderRound();
  }

  // HANDLES PATH SUBMISSION
  function showPathInput() {
    const existing = document.getElementById("pathInputWrap");
    if (existing) existing.remove();
    const wrap = document.createElement("div");
    wrap.id = "pathInputWrap";
    wrap.className = "path-input-wrap";
    wrap.innerHTML = `
      <label for="pathInput">Enter the shortest path from S to T:</label>
      <div class="path-input-row">
        <input id="pathInput" class="path-input" type="text" placeholder="S → ? → ? → T" autocomplete="off" spellcheck="false" />
        <button id="checkPathBtn" class="demo-btn demo-btn-primary">Check</button>
      </div>
      <p class="path-hint" id="pathHint">Use the Previous Node column to trace back from T, then reverse.</p>
    `;
    gameSummary.parentNode.insertBefore(wrap, gameSummary);
    gameSummary.textContent = "";
    const ACCEPTED = ["s→b→d→t", "s-b-d-t", "sbdt", "s b d t", "s,b,d,t"];
    document.getElementById("checkPathBtn").addEventListener("click", () => {
      const raw = document
        .getElementById("pathInput")
        .value.trim()
        .toLowerCase()
        .replace(/\s*→\s*/g, "→")
        .replace(/\s*->\s*/g, "→");
      const normalized = raw.replace(/[^a-z→]/g, "");
      const asArrows = normalized;
      const noSep = raw.replace(/[^a-z]/g, "");
      const input = document.getElementById("pathInput");
      const hint = document.getElementById("pathHint");
      const correct =
        asArrows === "s→b→d→t" || noSep === "sbdt" || ACCEPTED.includes(raw);
      if (correct) {
        input.classList.remove("path-wrong");
        input.classList.add("path-correct");
        hint.className = "path-hint path-hint-success";
        hint.textContent =
          "✓ Correct! Shortest path: S → B → D → T. Total travel-cost: 8.";
        gameSummary.textContent =
          "Final route: S → B → D → T. Total travel-cost: 8.";
      } else {
        input.classList.remove("path-correct");
        input.classList.add("path-wrong");
        hint.className = "path-hint path-hint-error";
        hint.textContent =
          "Not quite. Trace from T: T's previous is D, D's previous is B, B's previous is S. Reverse that chain.";
      }
    });

    document.getElementById("pathInput").addEventListener("keydown", (e) => {
      if (e.key === "Enter") document.getElementById("checkPathBtn").click();
    });
  }

  // GAME RESET
  function resetGame() {
    roundIndex = 0;
    choiceButtons.forEach((button) => (button.disabled = false));
    setFeedback("Choose S to begin.");
    gameSummary.textContent = "Goal: find the shortest route from S to T.";
    gameHeader.textContent = "Select the starting node";
    const existing = document.getElementById("pathInputWrap");
    if (existing) existing.remove();
    renderRound();
  }
  choiceButtons.forEach((button) =>
    button.addEventListener("click", handleChoice),
  );
  resetGameBtn.addEventListener("click", resetGame);
  resetGame();
});
