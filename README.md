# Route Optimization with Dijkstra’s Algorithm

## Overview
This project is a technical description of route optimization in modern navigation systems. It explains how road networks are represented as weighted graphs and how Dijkstra’s Algorithm computes the lowest-cost path between locations.

The document focuses on the internal operation of the system—modeling, computation, and dynamic updates—rather than user interaction. It is written for a general audience and uses visualizations to make abstract computational processes more accessible.

---

## Key Concepts

### Weighted Graphs
- **Nodes** → intersections or endpoints  
- **Edges** → roads connecting nodes  
- **Weights** → travel cost (time, distance, traffic)

### Dijkstra’s Algorithm
The algorithm finds the shortest path from a starting node to all other nodes by:
1. Initializing distances (start = 0, others = ∞)
2. Selecting the smallest unvisited node
3. Updating neighboring nodes
4. Repeating until the destination is reached

---

## What This Project Shows

### 1. Graph Representation
- Converts a road layout into a weighted graph
- Visual distinction between nodes, edges, and weights

### 2. Step-by-Step Algorithm Execution
- Interactive walkthrough of Dijkstra’s Algorithm
- Shows how distances update over time
- Demonstrates decision-making at each step

### 3. Route Optimization
- Highlights how the shortest path is formed
- Connects graph theory to real navigation systems

### 4. Real-World Behavior
- Accounts for:
  - Traffic updates
  - Road constraints (one-way, closures)
  - Continuous recalculation

---

## Tech Stack
- HTML (structure and visualization)
- CSS (layout and styling)
- JavaScript (interactive algorithm simulation)

---

## Project Structure
