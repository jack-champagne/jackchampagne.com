---
title: Rubik's Cube pt 2 
description: 
date: 2023-12-26
draft: false
categories:
- Personal
- Journal
- Development
tags:
- Personal
- Journal
- Puzzles
- Mathematics
---

After implementing a small (and painful) visualization for the bit of code I have been working to model puzzle cubes, I came to realization about representation. I was hoping that a more elegant way of describing movements of the cube would lead to a more elegant solution of programming such a solution. I read over the majority of [the document mentioned in the previous post](https://people.math.harvard.edu/~jjchen/docs/Group%20Theory%20and%20the%20Rubik%27s%20Cube.pdf) and pondered a bit on it. I wondered how minimal was my representation (modeling each visible face of each cubie affected by rotations - not centers) compared to a full mathematical description. This document was very interesting, its detailing of the groups that describe each of the 4 components of the cube (position & orientation for edges, position & orientation for corners), it review of group actions, basic information on permutations, and a little on orbits was great. In fact, the biggest takeaway from all of this, which was given towards the end, was that given a group action G, that acts on the set describing the cube's configuration: "The orbit of the start configuration under this action is exactly the set of valid configurations of the Rubik's cube."

This is great, because it helped me conceptualize a bit better what an orbit can mean, as well as relate what I see in reality with cubes with the mathematical representation discussed there. What it means for a configuration to be 'valid' is somewhat ignored, until this very last section. It might surprise some folks but it is not possible to solve a Rubik's cube with only valid moves if a single corner or edge is flipped. This is due to the fact that not all possible configurations of edge and corner piece positionings and orientations are possible from the start configuration (though sometimes it can happen through [other means](https://youtu.be/Vg23BI6sv1w)).

Regardless, while contemplating how the permutation cycle notation could be used as part of the software representation instead of the crazy repetitive setup I have going on right now, I realized that its not hard at all. With each piece, I apply the permutation the cycle notation defines to know where it should be in the end state. This is perfectly convenient as computing locations for each cubie could be done just via the stored permutation from a known state. This stored permutation can be updated by successive moves of course by simply composing the permutation from the group of moves (group action G) with the current permutation and storing the result. These computations may be a bit easier to reason about, rather than the crazy indexing I have going on right now.

One thing of note though, is that the crazy setup I have going on right now is still fairly minimal. The permutation cycle notation will still need to encode the orientations and positions for the edge and corner cubies respectively. This means 12 edge cubies * 2 orientations + 8 corner cubies * 3 orientations = 48 things to track here. However, my current implementation is using a 48 element array to track the state of the cube. The most minimal representation I can currently think of would be something along the lines of the number of bits required to store which element of S8 x S12 x C3^8 x C2^12 = 519 quintillion ~= 69 bits of information. It turns out the number of valid configurations (ones in the orbit of legal moves on the cube from the solved state) is exactly 1/12 of the number of total configurations (this is shown in Theorem 11.1 and stated in Remark 11.15 of that document). Thus, maybe there is some way to reduce the representation down to something on the order of ~66 bits, however I do not know how I would do so at the moment.

Next on the chopping block, implementing permutation arithmetic operations to calculate state with this new representation!
