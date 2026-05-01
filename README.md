# Route Optimization with Dijkstra’s Algorithm

## Overview

This project combines a **technical description** and an **instructional set** to explain and apply route optimization in modern navigation systems.

It first explains how road networks are modeled as **weighted graphs** and how **Dijkstra’s Algorithm** computes the shortest path. It then provides a **step-by-step, usability-centered guide** that allows a user to manually perform the same process.

The goal is to move from **understanding → execution**.

---

## Part 1 — Technical Description

### Key Concepts

#### Weighted Graphs

- **Nodes** → intersections or endpoints
- **Edges** → roads connecting nodes
- **Weights** → travel cost (time, distance, traffic)

#### Dijkstra’s Algorithm

The algorithm finds the shortest path from a starting node to all other nodes by:

1. Initializing distances (start = 0, others = ∞)
2. Selecting the smallest unvisited node
3. Updating neighboring nodes (relaxation)
4. Repeating until the destination is finalized

---

### What the System Does

#### 1. Graph Representation

- Converts a road layout into a weighted graph
- Preserves spatial relationships and connectivity

#### 2. Step-by-Step Computation

- Tracks shortest known distances
- Continuously updates routes as better paths are found

#### 3. Route Optimization

- Produces the lowest-cost path between locations
- Equivalent to navigation system routing behavior

#### 4. Real-World Constraints

- Traffic conditions
- Road closures / one-way systems
- Continuous recalculation

---

## Part 2 — Instructional Set

**How to Find the Shortest Path Using Dijkstra’s Algorithm**

### Purpose

Manually compute the shortest path between two nodes using a weighted graph.

---

### Materials

- Weighted graph
- Distance table (Node | Distance | Previous | Status)
- Method for marking visited nodes

---

### Constraints

- All edge weights must be **non-negative**
- Graph and table must be visible simultaneously

---

## Step-by-Step Procedure

### Step 1 — Initialize the Table

- Set starting node distance = **0**
- Set all other nodes = **∞**
- Leave previous nodes blank
- Mark all nodes as unvisited

**Check:** Only the start node has a known distance

---

### Step 2 — Select the Current Node

- Choose the **unvisited node with the smallest current distance**

---

### Step 3 — Update Neighboring Nodes

For each neighbor:

- Compute:  
  `new distance = current node distance + edge weight`
- If the new distance is smaller, update:
  - Distance
  - Previous node

---

### Step 4 — Mark Node as Visited

- Mark the current node as finalized
- Do not revisit it

---

### Step 5 — Repeat

- Return to Step 2
- Continue until the destination node has the smallest distance

---

### Step 6 — Stop Condition

- Stop when the destination node is selected as the smallest unvisited node

---

### Step 7 — Trace the Path

- Follow **previous nodes backward** from destination to start

**Output:**

- Shortest path
- Total travel cost

---

## Example Result

Shortest path:  
**A → B → D → E**

Total cost:  
**11**

---

## Troubleshooting / FAQ

| Issue                        | Cause                                                     | Fix                                            |
| ---------------------------- | --------------------------------------------------------- | ---------------------------------------------- |
| Picking wrong node           | Choosing smallest edge instead of smallest total distance | Always compare current distances               |
| Distances stay ∞             | Initialization error                                      | Ensure start node = 0                          |
| Incorrect final path         | Previous nodes not updated correctly                      | Re-check update step                           |
| Algorithm gives wrong result | Negative edge weights                                     | Use a different algorithm (e.g., Bellman-Ford) |

---

## Interactive Component

This project includes:

- Step-by-step algorithm visualization
- Live distance updates
- Practice graph for user application

---

## Tech Stack

- HTML — structure and diagrams
- CSS — layout and usability design
- JavaScript — algorithm simulation and interaction

---

## Project Structure

- `index.html` → Technical description
- `instructions.html` → Instructional set
- `main.css` → Styling and layout
- `*.js` → Interactive behavior

---

## Summary

This project demonstrates both:

- **Conceptual understanding** of shortest path algorithms
- **Procedural execution** through a structured instructional guide

It mirrors how real navigation systems compute and apply optimal routes.
