---
title: \(\LaTeX \) Repository
description: a LaTeX test
date: 2021-02-23
draft: false
---

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

<style>
iframe { margin: auto; }
</style>

This page is an exploration of MathJax LaTeX rendering and adding various iframes (desmos) across a complex page.

## Intro to functions

Ok so for the first exploration of this page, I thought it would be excellent to discuss some basic math. My goal for this page is to be able to read it from bottom to top and for nearly everyone with a basic high-school level of math to be able to understand *visually* some important aspects of math. 

Lets start with some aspects of math that we will build on in the future.
Let's imagine we live in a world where the cost of goods will grow over time at a set rate, say $1 per day (I know, crazy, but math is the only subject that allows for such imaginary realities to exist). I am trying to buy a box of cereal and its cost is currently $5. If I come back tomorrow, it will be $6 and so on.

If we wanted to find the price of the box next week, we would count the number of days and add it to original price. What if we want to find the price of the box any amount of days from now? Then we can just do this right?
\\[ price = \$1 * number\\,o\\!f\\,days + \$5 \\]

This is what is called a function. You've probably heard the term function before in a math class or in a programming class and, fortunately, both have similar aspects to them. In essence a function is something, *anything*, that takes some information (or things) as input(s) and produces some sort of output(s). For this specific function, we are trying to calculate the price on a given day in the future *given* how many days from now into the future. In other words, our function's output is the price and its input(s) is how many days into the future. Here is a graph of some days into the future (horizontally) and their respective prices using our equation (vertically)

<iframe src="https://www.desmos.com/calculator/uwhcmfoyop?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

Look at the straight line that the function follows!

<iframe src="https://www.desmos.com/calculator/nfbkour6gb?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

As with a lot of things, there are multple ways we can describe this function. Here are a few below (\\(p = price\\), \\(n = number\\,o\\!f\\,days\\)):

\\[p = 1*n + 5\\]

Since \\(1*n = n\\,...\\)
\\[p = n + 5\\]

And using the basic principles of functions, we know that every function will have inputs and outputs. It might be useful to denote this by listing out all of the inputs a function can take and the output. Since \\(p\\) is an output and \\(n\\) is an input, we will denote the function of price based on input number of days as \\(p(n)\\). And so it follows
\\[p(n) = n + 5\\]

The parenthesis will alway enclose the inputs to the function and the letter (or group of symbols) out in the front will always denote a common way of referring to the output For instance, both are commonplace. Let \\(n = 2\\):
\\[p(2) = 1*2 + 5 = 7\\]

\\[p = 1*2 + 5 = 7\\]

---

## Multi-input functions
### Referred to as multivariate functions (more on that later)

Functions are awesome! And very versatile, if we want to define a new function that takes in say... the number of boxes of cereal you want to purchase, number of days in the future, and want the output to be total price, we could do something like this (let \\(b = \\) number of boxes of cereal to purchase and \\(t = \\) total price), \\(p(n, b) =\\) something! (We could actually do it out and get the following if we wanted to)
\\[t(n, b) = b*(n + 5)\\]

Notice how the price for a single box is on the inside of the parenthesis? We have already defined a function that describes the price of a single box (given input \\(n\\)) so why don't we try using it here?
\\[t(n, b) = b*p(n)\\]

Looks like that works! Also not only that, we stumble upon an important concept for function notation. The importance of input variables. Notice how if we set \\(n = 5\\) and \\(b = 3\\) we get this:
\\[t(5, 3) = 3*p(5)\\]

Notice how when I change the value of \\(n\\), the other \\(n\\) on the right hand side of the equal sign changes to that same value. Also notice the same thing for \\(b\\). These inputs are specific and independent, when I change the value of one, only the corresponding same symbols denoting that input change and not anything else in our equation. This consistency is important because it also means that when we define a function, the order of the inputs does not matter, as long as our symbols denoting inputs are consistent.
\\[t(n, b) = b*(n + 5)\\]
Is the exact same thing as
\\[t(b, n) = b*(n + 5)\\]
However, if you set one of these inputs to a value, notice how we must maintain that consistency (let \\(n = 5\\) and \\(b = 2\\)). If \\(t\\) is defined as \\(t(n, b)\\), then to get the correct total we must do \\(t(5, 2)\\). If \\(t\\) is defined as \\(t(b, n)\\) then doing \\(t(5, 2)\\) would be wrong, and doing \\(t(2, 5)\\) would be correct. 

The key point, **always match symbols (and values) carefully**.

---

## More functions

#### Multivariate functions
Input can often be treated as variables, or symbols that represent a quantity/can change/and other things. The function we started off with as \\(p(n)\\) was a single variable function, hence, single-variate function. The function we came up with \\(t(n, b)\\) had multiple variables, hence, it can be called a multivariate function. More specifically, since it has only 2, it can also be called a *bivariate* function. (Note: Since a bivariate function has more than one variable, is also a multivariate function)

#### Non-linear functions
So far we have only dealt with linear functions (yes \\(t(n, b)\\) was also a linear function, more on that later). Let's take a look at other functions. If we have a square with side length \\(s\\), then the area of that square will be given as \\(s*s\\). We can define this as a function \\(A\\) which gives area for a square with side length \\(s\\):

\\[A(s) = s*s\\]

This can be simplified as we know that \\(s*s = s^2\\) .

\\[A(s) = s^2\\]

Now lets try a couple of values for s. \\(A(1) = 1,\\, A(2) = 2*2 = 4,\\, A(3) = 9,\\, A(4) = 16,\\, \dots\\) And then graph some of those values.

<iframe src="https://www.desmos.com/calculator/oeyanj7k1h?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

With a linear function, the function follows a nice straight line (hence the name) for inputs, this function cannot be linear however because no straight line exists that the graph will follow. Look! The *only* straight line that exists that goes through the first two points does not go through any of the other points, therefore there cannot be a straight line that the graph follows!

<iframe src="https://www.desmos.com/calculator/romi46uwti?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

This is out first non-linear function, and there are many different non-linear functions. The colored lines in the graph below are each their own different class of non-linear function.

<iframe src="https://www.desmos.com/calculator/87uk5fwxpt?embed" width="500px" height="500px" style="border: 1px solid #ccc" frameborder=0></iframe>

Lots of variety, and there's more! But we will get to that later.

---



This is a \\( Test \\) of mathjax and \\( \\LaTeX \\).
  
Been doing some fun things with more markup languages this semester and have really enjoyed contining to learn \\( \\LaTeX \\) check this out!
  
\\[ e^{a + bi} = cos(a) + i cos(b) \\]
  
And how about this?
  
\\[ \oint_{\\gamma} F dS \\]

Hope you enjoy.
