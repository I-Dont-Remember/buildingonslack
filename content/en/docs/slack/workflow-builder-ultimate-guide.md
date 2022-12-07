---
title: Workflow Builder Ultimate Guide 2022
description: Teaching users & developers how to automate their Slack workspaces with
  Workflow Builder. Taking you beyond the Slack docs and answering the questions I
  wished were answered when I started.
lead: ''
date: 2022-09-22T03:21:00.000+00:00
lastmod: 2022-09-30T23:00:00.000+00:00
images: []
weight: "110"
toc: true

---
Teaching users & developers how to automate their Slack workspaces with Workflow Builder. Taking you beyond the Slack docs and answering the questions I wished were answered when I started.

{{< alert icon="🗞️" context="warning" >}}

* Early 2023 should see the launch of `if-then` logic to Workflows, according to multiple press releases from _Sept 2022_ - [Technzine.eu](https://www.techzine.eu/news/devops/87761/slack-expands-workflow-builder-with-if-then-statements/), [Tech Crunch](https://techcrunch.com/2022/09/01/slack-gains-new-automation-features-including-conditional-logic-for-workflows/).
* _"Also early next year, Slack will expand its library of Workflow Builder steps with tasks like automatically creating channels and alerting users once they start a workflow and providing integrations for additional third-party apps and tools."_
  {{< /alert >}}

## What is a Slack Workflow?

Slack Workflows are a tool to let you automate your Slack workspace and more. You create them using the `Slack Workflow Builder` tool, which will be getting a ton of updates and new features in 2023.

Fun fact! Slack Workflow Builder was originally a [Slack app called Missions](https://www.robotsandpencils.com/work/high-tech/missions/), which was then acquired by Slack in 2018 and built into what you know today.

* [Slack Docs | Workflow Builder: Steps from Apps](https://api.slack.com/workflows/steps)
* [Slack Help Docs | Workflow Builder](https://slack.com/help/articles/360035692513-Guide-to-Workflow-Builder)
* [Slack Bolt Python | Workflow Steps](https://slack.dev/bolt-python/concepts#steps)

## 🏃‍♀️Using Workflow Builder

The nitty-gritty of getting Slack Workflow Builder to do your bidding and use workflows in Slack.

### Available Triggers

There are 5 triggers available right now:

* `Shortcut` _(single channel)_
* `New channel member` _(single channel)_
* `Emoji reaction` _(single channel)_
* `Scheduled date & time`
* `Webhook`

![](/images/workflows-built-in-triggers.png)

Wishing you could use any Slack event as a trigger, rather than just these 5? Slack is likely to add many of them in the next year or two, but if you need a solution for the interim, there is a [free, open-source app (Workflow Buddy)](https://github.com/happybara-io/WorkflowBuddy#-available-triggers) that lets you proxy any Slack event as a trigger.


### Built-in Steps

Slack started off with just 2 built-in steps: `Send a message`, `Send a form`.  They also provide the ability to use Steps from other apps, but you have to already have them installed to use them (or to even search them).

![](/images/workflows-built-in-actions.png)

{{< alert icon="💡" context="info" >}}
`Steps from Apps` lets developers get real creative with new functionality. If you're looking to be able to [send HTTP requests/webhooks](/docs/slack/slack-workflow-builder-http-request-tool/) with Slack Workflows, choose random channel members, and much more, take a look at the [free, open-source app](https://github.com/happybara-io/WorkflowBuddy) that adds a ton of useful utilities for no-code builders.
{{< /alert >}}

### Workflow Builder execution analytics & errors

Slack does provide some limited analytics information to help you track & debug how your workflows are running.

![](/images/workflow-analytics.png)

### Can you format messages as variables for the Webhook Trigger?

Unfortunately, **NO** as of Fall 2022. Your Slack Markdown formatting will show up during execution as literal text like `*bold *` [\[Reddit src\]](https://www.reddit.com/r/Slack/comments/lje1ps/possible_to_format_message_in_webhook_variable_as/).  Unfortunate as that would unlock a lot of interesting programmatic messaging.

### Steps from apps not visible after install

Have seen issues in the past when installing Slack apps but not being able to view their Steps when I go to Workflow Builder. Some things you can try:

* Reinstall the Slack app.
* Close out and reload your Slack desktop client.
* Check the workspace [Slack Admin permissions](https://slack.com/help/articles/360035822734-Manage-Workflow-Builder-access-and-permissions) for Workflows.

Best of luck, and if you find something new, please reach out so we can add it as a suggestion for future adventurers.

## Development

Looking to build your own `Steps from apps`? Check out the [Workflow Builder Developer Guide](/docs/slack/workflow-builder-developer-guide/)).

***

## Examples & templates

See [Workflow Builder Templates](/docs/slack/workflow-builder-templates/).

***

## Resources & articles

* [The latest from Workflow Builder (Feb 2020)| Slack Developer Blog](https://medium.com/slack-developer-blog/the-latest-from-workflow-builder-8e0278ddc569)
* [Stickier Slack apps with workflow steps (Jul 2020)| Slack Developer Blog](https://medium.com/slack-developer-blog/stickier-slack-apps-with-workflow-steps-68f24ce48311)