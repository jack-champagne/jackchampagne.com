---
title: Groups and Rust Macros
description: 
date: 2024-09-21
draft: false
categories:
- Personal
- Journal
- Development
tags:
- Personal
- Journal
---

The post is a continuation of [this previous post](/posts/2024-01-11-algebraic-structures) and is taking a bit of a different approach to the problem. The limits on the expressivity of the type system, and the requirements for safety imposed by the compiler proved too much for my knowledge of Rust last time. This time I am taking a bit of a different approach. One discarded approach from a prior try was to define a tuple and iterate over the tuple applying the operations at each step. This did not in fact scale to an arbitrary number of product elements - each length would have to be defined in source. As far as I could tell there was no overarching simplication or abstraction that I could find that would fix this problem within the contraints that I have imposed on myself. 

Earlier today, while thinking about my team's practicum project and the associated project planning tasks, I was hit with a wave of inspiration. I had some ideas on how to use the macro system in Rust to implement the desired behavior for these types while keeping it general to **direct product** groups of any size.

The idea is this, if Rust is able to define struct tuples and do derive macros (`#[derive(Debug)]` e.g.) - and if these work for the Default trait (it does) - then there should be a memory safe, reliable, and consistent way of deriving debug for my case. Here, instead of calling the ::default() function, we call the .op function (with an argument), the .inv() (for getting the inverse of), and of course identity() (gets the group identity) doing much of the same as "default" on that one spcific function

Think:
```rust
#[derive(Default)];
struct MyType(Type1, Type2, Type3);

// MyType::Default() = MyType(Type1::Default(), Type2::Default(), Type3::Default())
```

but applied to the groups types. Its gotta be possible!!

Till next time
- Jack
