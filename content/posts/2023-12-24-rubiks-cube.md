---
title: Rubik's Cube 
description: 
date: 2023-11-25
draft: false
categories:
- Personal
- Journal
tags:
- Personal
- Journal
---

I am working on some software for working with digital Rubik's cubes in Rust. I think it would be an interesting challenge
to write a proper, well-tested, simulation of the cube and cube movements. I am currently working on the back-end
representation of a 3x3 cube which I will then later create some interface for some interactive mode. 

My first pass models the whole cube via what is on each of its 6 faces, but without the center cubie color as each move would leave it unchanged (but possibly rotated). The faces are labeled 0 to 5 (Bottom, Front, Right, Back, Left, Upper) and the colors are 1 through 6 (White, Blue, Red, Green, Orange, Yellow) respectively. The starting orientation of the cube puts the White face as the bottom face, and the Blue face as the front face (thus the Red face is on the right face).

This is a usable model, however, I am aware of the algebraic representation of the Rubik's cube and modeling it and its components with group actions. The downside of my model is that much of my code is repetitive and very dense and thus difficult to understand. A transformation associated with a single face rotating means describing how face of these cubies relates to the previous state, which means lots of array accesses everything is highly index sensitive - very prone to programmer error.

Fortunately, with sufficient testing it is possible for me to convince myself that I've done it correctly. I tested certain properties of moves are true that should be true on a real cube.

As I continue to work on this, the next steps are:
1. Making a decent tui visualizer of the current state (probably just going to print out a few grids with color options in Rust)
2. Making some sort of interactive mode taking in user input and spitting out the next cube state.
3. Finish reading this: -- https://people.math.harvard.edu/~jjchen/docs/Group%20Theory%20and%20the%20Rubik%27s%20Cube.pdf -- which to rewrite the internal representation.
4. Track orientation of middle-of-face cubies (for those image puzzle cubes)
5. Consider how this can generalize to larger cubes

And then other consideration in no particular order:
* Some sort of solver, maybe using some sort of Meet-In-The-Middle technique
* Some sort of algorithm explorer
* Better visualization for cube - perhaps even 3-D?
