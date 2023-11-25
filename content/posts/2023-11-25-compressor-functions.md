---
title: Machine learning with gzip
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

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

I am not sure in which context I originally stumbled across the concept presented in [this paper](https://aclanthology.org/2023.findings-acl.426.pdf). In that paper, the authors presented a technique in which they would use a lossless compression function (gzip) + compressed distance metric (Normalized Compression Distance) + k-nearest neighbors (k-nn) for text topic classification. I liked this paper when I first learned of it because it is a parameter free model (hold the k hyperparameter), which is against the norm for other popular models in the space. I am no expert on NLP (although I have worked with some other areas of machine learning) but something that I can certainly appreciate in the era of multi-billion parameter language transformers is a simple idea applying existing tool in an effective manner.

One thing of note for this technique however is the runtime complexity of k-nn. 
Computing gzip is performing the [DEFLATE algorithm](https://en.wikipedia.org/wiki/Deflate) which is a two step process of Huffman coding and then LZ77. A number of places on the internet said that the runtime complexity of this was \\( O(n)  \\), where n is the size of the uncompressed data. I could not find any credible sources doing out the analysis and when I started digging I gfound very few answers (some more information can be found at these two wikipedia articles: [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding#Compression) and [LZ77](https://en.wikipedia.org/wiki/LZ77_and_LZ78)).

Instead I opted for a more empirical approach by just measuring gzip's performance on large bodies of data. Firstly, I generated large files of random data using the following command:
```
for arg in 1K 5K 10K 50K 100K 250K 500K 1M 5M 10M 25M 50M 250M 500M 1G; do     head -c $arg </dev/urandom >"$arg.rand"; done
```

and the getting gzip timing by running:
```
for arg in 1K 5K 10K 50K 100K 250K 500K 1M 5M 10M 25M 50M 250M 500M 1G; do     time gzip "$arg.rand"; done
```

This gave me some data that I have saved here and ran a regression against. It looks like a linear regression is sufficient here and anything lower order (I tried \\(log\\, n \\) for example did not work great). So for now gzip has empirically a linear runtime complexity (tested up to 1 gigabyte). The x-axis represents filesize before compression, the y-axis is seconds to compress (user + sys from time command) and the x-axis has a logarithmic scale. 

<iframe src="https://www.desmos.com/calculator/axfxot4dyf?embed" width="500" height="500" style="border: 1px solid #ccc" frameborder=0></iframe>

The other components in this algorithm are interesting too. For example, the authors propose Normalized Compression Distance (NCD) as a means to compute the `distance` as used by k-nn. This metric is not complicated to compute, the formula for which is given in the paper, where \\( C(x) \\) is the compressed length of \\(x\\) and \\(xy\\) denotes the concatenation of \\(x\\) and \\(y\\).

\\[ NCD(x, y) = \\frac{C(xy) - \\min \\left\\{C(x), C(y) \\right\\}}{\\max \\left\\{C(x), C(y)\\right\\}} \\]


Computing the Normalized Compression Distance between two texts \\(x\\) and \\(y\\) will require computing the compressed length of \\(xy\\) as well. 

And of course, the aspects of an implementation of k-nn with its own runtime complexity as well. This I am choosing not to derive here out of respect for my time and the brevity of this article.


A few notes here at the end on this paper. They used the metric Normalized Compression Distance as a stand-in for [information distance](https://arxiv.org/pdf/1006.3520.pdf) (or \\(E(\\cdot)\\) which is uncomputable because of its dependence on [Kolmogorov complexity](https://en.wikipedia.org/wiki/Kolmogorov_complexity). The idea is that as the compression ratio of gzip becomes higher, it will eventually approach \\(K(\\cdot)\\), thus \\(NCD\\) approaches \\(E\\).

The next note I had here is a video on optimality and related to kolmogorov complexity (specifically on the algorithm proposed in the [uncomputability section](https://en.wikipedia.org/wiki/Kolmogorov_complexity#Uncomputability_of_Kolmogorov_complexity) of that wikipedia article: ["The most powerful (and useless) algorithm" - polylog](https://www.youtube.com/watch?v=9ONm1od1QZo) and its percursor: ["The OPTIMAL algorithm for factoring!" - polylog](https://www.youtube.com/watch?v=qrKlPzceeqc).

