title: Permutations in Rust Code 
description: 
date: 2023-12-28
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

This is a bit of a continuation of the last post [here](/2023-12-26-minimal-representations.md)

I have implemented a very simple permutation group bit of code. The idea behind the design of this showcases why I think algebraic type systems are so powerful. Simply put, only operations between permutations that act on the same number of objects make any sense. This of course is usually not a problem when the permutations are of different lengths, its always easy to insert an identity map to additional elements on the smaller of the two then proceed, but leveraging rusts type system to ensure that operations accept operands of the same group is a powerful thing.

I decided that the representation of a permutation should be an array. Each index of the array contains what that element maps to. If I wanted to represent a permutation in which 2 items swap, in cycle notation it would be written like so: (1 2).

Looking at the internal array for this permutation, it looks a bit strange: [2, 1]. There is a bit of a tension here between standard mathematical notation and computer programming, although unimportant. In standard permutation notation, 1 is the first element. Thus this array is saying that 1 maps to 2, and 2 maps to 1. Of course in code, the indexcies are off by one. Why does an internal implementation conform to such arbitrary standards? Mainly cause of my comfort with existing notation.

Here are some key snippets from the code

```rust
#[derive(Debug, Clone)]
struct Permutation<const SIZE: usize> {
    map: [usize; SIZE],
}
```

and this one

```rust
impl<const SIZE: usize> Permutation<SIZE> {
    fn compose(&self, other: &Permutation<SIZE>) -> Self {
        let mut map_copy = self.map;
        for index in 0..SIZE {
            map_copy[index] = other.map[Self::index_from_elem(self.map[index])];
        }
        Self { map: map_copy }
    }
}
```

pretty great! This allows chaining compositions like so:

```rust
let s4_1 = Permutation::<4>::random();
let s4_2 = Permutation::<4>::random();
// e • (s4_2 • (s4_2 • s4_1)) = ??
dbg!(&s4_1
    .compose(&s4_2)
    .compose(&s4_2)
    .compose(&Permutation::<4>::new()));
```

Thus if s4\_1 = (1)(2 4 3), s4\_2 = (1 3 4)(2), and e = (1)(2)(3)(4) per usual...

```e • (s4\_2 • (s4\_2 • s4\_1)) = (1)(2)(3)(4) • (1 3 4)(2) • (1 3 4)(2) • (1)(2 4 3) = (1 4)(2 3)```

or as output:

```bash
[src/main.rs:103] &s4_1.compose(&s4_2).compose(&s4_2).compose(&Permutation::<4>::new()) = Permutation {
    map: [
        4,
        3,
        2,
        1,
    ],
}
```

Excellent!

Next, implementing the cyclic groups
