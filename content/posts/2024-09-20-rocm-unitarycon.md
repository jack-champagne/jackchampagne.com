---
title: UnitaryCon and ROCm 
description: 
date: 2024-09-20
draft: false
categories:
- Personal
- Journal
- Development
tags:
- Personal
- Journal
---

This post is not a continuation of the last post - however I do have an additional update to it. This sort of multiple dispatch across a defined interface (or Trait in Rust's case) might not be warranted here. Generally, a faithful Rust implementation of similar behavior would be in the form of an enum - with cases for each value (the overall type here being a group, and the enum variants would be the various groups I want to define). This is the idea of "composition over inheritance" here at work. The only issue is the extra information and constraints that the inner enum variants give on type operations. Because Rust's type system is so expressive, I was relying upon the compiler to (at compile time) throw errors if incompatble types (different groups) had operations defined against eachother.

I got pretty far with the last implementation - with nice working groups and compile time checked operations on those groups. The issue that stopped me for now was trying to define a direct product - which would also implement the group type, and all operations on it would be type checked at compile time (**hard**).

For summer updates, I will have to keep it brief - contact me directly if you want to know more. I worked an interesting embedded software position and had a really successful project outcome. Loved the folks I met and didn't have to move again (how great!).

In other updates, I recently attended the open-source quantum computing software ecosystem conference run by the [unitary fund](https://unitary.fund). It was a fantastic conference in Helsinki, mets lots of awesome people, and partook in the Finnish fondness for saunas. I do miss how well the suspensions on their public transit rail lines kept the car from reacting to bumps - I nearly fell asleep it was so quite and smooth.

Been playing a bit with ROCm recently and looking at the gaps that exist for it in its co-existence and fight for relevance against Nvidia's CUDA. I am optimistic, this sort of firmware and encouraging competition in this part of the tech landscape I am very much for. If I had additional time, I would try a become part of the folks that are working on improving this every day - Nvidia's moat here may not be as deep as the markets seem to think. I have also been playing with some of the Rust large language model stuff that's out there now (see [kalosm and floneum](https://github.com/floneum/floneum). 

Till next time
- Jack
