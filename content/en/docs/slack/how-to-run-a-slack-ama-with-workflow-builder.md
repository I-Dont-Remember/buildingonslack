+++
date = 2022-10-07T21:46:25Z
description = "Run an AMA in Slack just like their Community team does using Workflow Builder automation."
draft = true
images = []
lastmod = 2022-10-07T21:46:25Z
lead = ""
title = "How to run a Slack AMA with Workflow Builder"
toc = false
weight = 999

+++
The Slack Community team does a great job running AMA in Slack so developers & community members can get a taste of what’s ahead directly from Slack leaders. They are using Workflow Builder to moderate the AMA questions coming in, and I wanted to see if I could replicate it.

## How Slack runs AMA in Slack Community

Several days before the event, a message will get posted in `#slack-ama` like the one below announcing that question submissions are open. A Shortcut Workflow is added at that time, as well.

![](/images/slack-community-ama-post.png)

The workflow they added gives a shortcut in `#slack-ama` that pops open a form modal to fill out your question. Once it submits, that question is sent off to a private internal channel for the hosts to discuss and choose good questions. When the hosts have chosen a questions, they send it on over to the main channel for everyone to see responses.

After many questions and the AMA has wrapped up, the Community team removes the Workflow from the channel to avoid any confusion.

## How to run your own AMA in Slack with Workflow Builder

Ready to run your own AMA without any coding required?

1. 🗣 Set up a public channel where [only a select number of people can post](https://slack.com/help/articles/360004635551-Manage-channel-posting-permissions-) to the channel - allow your bot and the AMA hosts, but make sure guests can still respond in threads for lively discussion on each question.
   * Example: `#happybara-ama`.
2. 🔒Create a private channel for your host team to moderate questions, come up with answers as a group, etc.
   * Example: `#happybara-ama-submissions`.
3. Download and import the Workflow Builder template, or copy based on the screenshot below. Publish when you’re satisfied with the wording on your messages. How it works:
   * Questions are submitted in a form
   * A thank you message is sent to the user for submitting
   * Responses are dropped into a private channel (`#happybara-ama-submissions`.) for Slack team members to review & approve.
   * if they are approved, a button on the message is clicked, and they then get posted by the Workflow bot to the `#slack-ama` channel.

{{< btn class="btn-primary btn-lg px-4 mb-2" label="View Template on GitHub" href="https://github.com/I-Dont-Remember/buildingonslack/blob/main/workflow-builder-templates/submit_your_ama_questions.slackworkflow" newTab=true >}}

![](/images/slack-workflow-ama-template.png)

## Potential improvements

Running an AMA in Slack can be a great way to meet your community members or coworkers where they already are. One way to customize this Workflow for your use case could be to add a static drop down of the AMA hosts. Then people could specify which person they were hoping would answer their question. That said, the beauty of Workflow Builder is in customizing, so go forth, the sky is the limit! I’d love to hear what you come up with on [Twitter](https://twitter.com/maybekq)!