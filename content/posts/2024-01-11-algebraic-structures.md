---
title: Modeling Algebraic Structures 
description: 
date: 2024-01-11
draft: false
categories:
- Personal
- Journal
- Development
tags:
- Personal
- Journal
- Mathematics
---

This is a bit of a continuation of the last post [here](/posts/2023-12-28-permutations-in-rust.md)

Cyclic groups were implemented since the last post and both now implement a generic `Group` trait. This comes with its
own unique benefits and drawbacks. The benefit is that a set of operations that every `Group` must implement can be defined
and centralized in a single spot in source - thus the definition of the interface provided. The downside is that the way 
I currently have the `Group` trait implemented and its generic associates with some methods returning `Self` - I am now fighting
my way through the limitations of Rusts dynamic dispatching. Specifically fighting my way through this problem:

```
error[E0038]: the trait `Group` cannot be made into an object
  --> groups/src/lib.rs:34:25
   |
34 |     components: Vec<Box<dyn Group>>,
   |                         ^^^^^^^^^ `Group` cannot be made into an object
   |
note: for a trait to be "object safe" it needs to allow building a vtable to allow the call to be resolvable dynamically; for more information visit <https://doc.rust-lang.org/reference/items/traits.html#object-safety>
  --> groups/src/lib.rs:26:25
   |
25 | pub trait Group {
   |           ----- this trait cannot be made into an object...
26 |     fn op(&self, other: &Self) -> Self;
   |                         ^^^^^ ...because method `op` references the `Self` type in this parameter
27 |
28 |     fn inv(&self) -> Self;
   |                      ^^^^ ...because method `inv` references the `Self` type in its return type
29 |
30 |     fn identity() -> Self;
   |        ^^^^^^^^ ...because associated function `identity` has no `self` parameter
   = help: consider moving `op` to another trait
   = help: consider moving `inv` to another trait
help: consider turning `identity` into a method by giving it a `&self` argument
   |
30 |     fn identity(&self) -> Self;
   |                 +++++
help: alternatively, consider constraining `identity` so it does not apply to trait objects
   |
30 |     fn identity() -> Self where Self: Sized;
   |                           +++++++++++++++++

For more information about this error, try `rustc --explain E0038`.
```

The useful reading is of course in [the docs](https://doc.rust-lang.org/reference/items/traits.html#object-safety)

and the output of `rustc --explain E0038` is also helpful.

This is unfortunate however, and I am worried that I won't be able to have the interfaces and datastructures I desire to model
the next part - direct products of groups. I always imagined them as tuples where each component of the tuple was an element of 
that specific component's group. Like for the group `S_4` and `C_4` denoting the permutation group on 4 elements and the cyclic
group of order 4 respectively, `a ∈ S_4 x C_4` where `a = (a_1, a_2) s.t. a_1 ∈ S_4 and a_2 ∈ C_4`. Ideally, the source code, datastructures, and interface would closely resemble this and yet I have this problem. Guess I have some reading to do on those pages - and maybe on generic associated types? (GATs)

Putting this on pause for a little bit to do some homelab-ing/life stuff/organization.

- Jack
