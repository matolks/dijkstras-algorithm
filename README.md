# Route Optimization with Dijkstra’s Algorithm

## Overview
This project is a visual and conceptual explanation of how modern navigation systems compute optimal routes using **Dijkstra’s Algorithm**. It demonstrates how real-world road networks are modeled as **weighted graphs** and how shortest-path computation determines the most efficient route.

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
