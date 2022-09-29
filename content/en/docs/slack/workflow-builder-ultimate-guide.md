---
title: Workflow Builder Ultimate Guide
description: ''
lead: ''
date: 2022-09-21T22:21:00.000-05:00
lastmod: 2022-09-21T22:21:00.000-05:00
images: []
weight: "110"
toc: true

---
{{< alert icon="🗞️" context="warning" >}}

* Early 2023 should see the launch of `if-then` logic to Workflows, according to multiple press releases from _Sept 2022_ - [Technzine.eu](https://www.techzine.eu/news/devops/87761/slack-expands-workflow-builder-with-if-then-statements/), [Tech Crunch](https://techcrunch.com/2022/09/01/slack-gains-new-automation-features-including-conditional-logic-for-workflows/).
* _"Also early next year, Slack will expand its library of Workflow Builder steps with tasks like automatically creating channels and alerting users once they start a workflow and providing integrations for additional third-party apps and tools."_
  {{< /alert >}}

Fun fact! Workflow Builder was originally a [Slack app called Missions](https://www.robotsandpencils.com/work/high-tech/missions/), which was then acquired by Slack in 2018 and built into what you know today.

* [Steps from apps | Slack Docs](https://api.slack.com/workflows/steps)
* 

## 🏃‍♀️Using Workflow Builder

The nitty-gritty of getting Slack Workflow Builder to do your bidding.

### Available Triggers

There are 5 triggers available right now:

* `Shortcut` _(single channel)_
* `New channel member` _(single channel)_
* `Emoji reaction` _(single channel)_
* `Scheduled date & time`
* `Webhook`

![](/images/workflows-built-in-triggers.png)

### Built-in Steps

Slack started off with just 2 built-in steps: `Send a message`, `Send a form`.  They also provide the ability to use Steps from other apps, but you have to already have them installed to use them (or to even search them).

![](/images/workflows-built-in-actions.png)

### Workflow Builder execution analytics

Slack does provide some limited analytics information to help you track & debug how your workflows are running.

![](/images/workflow-analytics.png)

***

## 👩‍💻Developing Workflow Steps

So you want to build a Step.

> _⚠ Apps are limited to ONLY 10 steps!_
>
> _Not everyone will run into this, but a workaround for those aiming to have lots of functionality in their apps is to create your own action step select, and then run a view_update based on their selection._ [_Zapier is a good example_](https://community.zapier.com/product-updates/use-20-zapier-apps-directly-in-slack-s-workflow-builder-5466)_._

### User building a workflow with your step

![](/images/workflow-diagram-app-step-timeline.png)

### Execution of a step

### How long can an execution run?

An execution has to eventually send a `complete()` or `fail()`, but how long can you process until it just times out? I haven't found any docs with a specific time yet, but have kicked off a few different tests, and you have at minimum 20 days. If my [hypothesis about their underlying infrastructure](#hypothesis-on-architecture) is correct, you may have up to 1 year until it gives up. The screenshot shows an execution I started on 9-7-2022, screenshot on 9-27-2022 with it still showing `In progress` waiting for a signal.

![](/images/long-running-execution.png)

With a window on the order of days rather than seconds, it opens up new possibilities. Human-time-scale tasks suddenly become a possibility in your Workflows - I could mail a letter with the execution ID and have my friend complete it when it gets to him. The sky is the limit!

### Can you format messages as variables for the Webhook Trigger?

Unfortunately, **NO** as of Fall 2022. Your Slack Markdown formatting will show up during execution as literal text like `*bold *` [\[Reddit src\]](https://www.reddit.com/r/Slack/comments/lje1ps/possible_to_format_message_in_webhook_variable_as/).  Unfortunate as that would unlock a lot of interesting programmatic messaging.

### Hypothesis on architecture

Not much to back this up, but I have a strong feeling that Workflow Builder is backed by [AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html) under the hood - just a very simplified view of them.

***

## Examples & templates

See [Workflow Builder Templates](/docs/slack/workflow-builder-templates/).

***

## Resources & articles

* [The latest from Workflow Builder (Feb 2020)| Slack Developer Blog](https://medium.com/slack-developer-blog/the-latest-from-workflow-builder-8e0278ddc569)
* [Stickier Slack apps with workflow steps (Jul 2020)| Slack Developer Blog](https://medium.com/slack-developer-blog/stickier-slack-apps-with-workflow-steps-68f24ce48311)