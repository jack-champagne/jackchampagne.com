---
title: Github Free Organization
description: 
date: 2026-06-30
draft: false
categories:
- Development
tags:
- Personal
---

I've been thinking a lot about the issues with github's organization business model that I have finally materialized into a few notes. For a long time, I have been hesitant in adopting the paid tier of github organization(s) for my own company primarily due to cost (and for what I felt like were features arbitrarily gated behind said cost). Before I articulate these features (and some workarounds), there is an idealogical element to this: per seat cost on developers joining an org is distasteful to me as it does not represent the incremental cost to github. As an org grows, cost to github presents itself in github actions minutes, repository and hosting size, ingress and egress, CDNs, and now AI, not in a user being added in an org database.

Ok, I'll get on to the nitty gritty:

Environments:

It is possible in github to specify environments, these act as virtual structures to aid in testing, deployment, isolation, permissions management, and more and are genuinely useful for a number of reasons. Unfortuntely, I have not explored them much. From what I can tell, since you can use them on open source repositories for free, some organizations may choose to use them for their usefulness, and some may opt a more custom route, not dependent on a provider like github.

Verdict: Not fully by-passable unless by re-engineering this entirely yourself

Github Actions Runners:

First of all, I have to give a lot of these Git-"Hubs" (Gitlab, Github, etc.) a bit of praise for having reletively generous free-tiers for open-source work. I am grateful for these free actions minutes and use them to the fullest extent. For private repositories in organizations, paying by the minute can add up quickly. Especially if you are CI/automation forward and test-heavy, AND on larger or specific runners. For some, the convience of just plugging in the right system slug in the action is worth paying for the infra by the minute (even if github has questionable recent uptime). For those who need to remain scrappy, are willing to put in a little labor, care a lot about their internal s.w. dev. costs, and/or have specialized or expensive hardware they want to run their automation on (or idle hardware they own)... self-hosted runners are the secret here to bypassing this as an issue. Github has stated that they are revisiting this (and I'm sure they eventually will, heres the [link](https://github.com/resources/insights/2026-pricing-changes-for-github-actions)). For now, I'd rather pay the cheapest cloud provider, or just run it locally on one of my existing boxes.

Verdict: Bypassable

Organization Secrets:

Github provides a few ways of disseminating secrets down into the actions and this restriction is perhaps the most arbitrary. There are repository secrets, and organization secrets. Essentially every repository under and org can inherit org secrets from that org (maybe subject to some scoping rules but I'm not sure). Repository secrets are **just** with that repository. Both will be available in CI for that repo if you use the right env name. The crux is when you want to use an org secret in a github org with a free plan. Github does **not** allow org secrets on free-tier organizations. Now, while this would be convienent, I like managing secrets and state of systems like these using other tools, namely terraform. Since github provides a terraform module, and we can do secret management in the github terraform module, we can essentially roll out organization secrets to a github org with a simple terraform apply (and still have the secret tracked in one place, and keep state declarative!) Not only that, but the scoping is super explicit and declarative, all good stuff.

Verdict: Super bypassible

There's more, but its not coming to me right now. Something something about using public open source respositories as a front end that loads a closed source private repo from the same org and then co-opting the open-source benefits the public repo gets while still achieving what the closed-source needs. In my opinion, relatively unethical as it just hurts the relationship and trust boundaries with github+opensource software+the community. But, basically everything that github places into a paid organization that developers super care about could be bypassed this way too...

Till next time
- Jack
