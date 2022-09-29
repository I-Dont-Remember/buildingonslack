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
Teaching you how to use Workflow Builder to the fullest, and also how to develop awesome Workflow Steps without having to spend as long understanding the inner workings.

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

### Can you format messages as variables for the Webhook Trigger?

Unfortunately, **NO** as of Fall 2022. Your Slack Markdown formatting will show up during execution as literal text like `*bold *` [\[Reddit src\]](https://www.reddit.com/r/Slack/comments/lje1ps/possible_to_format_message_in_webhook_variable_as/).  Unfortunate as that would unlock a lot of interesting programmatic messaging.

### Steps from apps not visible after install

Have seen issues in the past when installing Slack apps but not being able to view their Steps when I go to Workflow Builder. Some things you can try:

* Reinstall the Slack app.
* Close out and reload your Slack desktop client.
* Check the workspace [Slack Admin permissions](https://slack.com/help/articles/360035822734-Manage-Workflow-Builder-access-and-permissions) for Workflows.

Best of luck, and if you find something new, please reach out so we can add it as a suggestion for future adventurers.

***

## 👩‍💻Developing Workflow Steps

So you want to build a Step.

> _⚠ Apps are limited to ONLY 10 steps!_
>
> _Not everyone will run into this, but a workaround for those aiming to have lots of functionality in their apps is to create your own action step select, and then run a view_update based on their selection._ [_Zapier is a good example_](https://community.zapier.com/product-updates/use-20-zapier-apps-directly-in-slack-s-workflow-builder-5466)_._

### Current best practice suggestions

These are suggestions just from my own experience developing steps and running into issues, they are by no mean law to live by.

* Catch all exceptions/errors during your `step execution` functions to send `fail()`
  * An execution will keep running until receiving `complete` or `fail`, so if you hit an error in the middle and aren't catching it, your users will end up with a bunch of in-progress executions in their analytics with no error messages.

### App setup

You'll need to go through and add events & OAuth scopes to enable your app to use Steps - follow the [Slack docs](https://api.slack.com/workflows/steps#configure) `Configure` & `Prepare` sections.

### User adds your step

The first stage is handling when a user attempts to add your step to their workflow. The diagram below showcases it, but the process is:

1. User clicks to use your Step in Workflow Builder - this sends the `workflow_step_edit` event.
2. You open the configuration modal view for them.
3. _(Optional)_ they take an action (e.g. button click) and you call `view_update` to replace the modal they see.
4. User submits the modal - this sends the `view_submission` event.
5. You parse the submitted data and fill out `inputs` and `outputs` before sending them to `workflows.updateStep`.

![](/images/workflow-diagram-app-step-timeline.png)

### Configuration modal

* Users are able to pass information from previous steps using `inputs`
* ![ℹ️](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==) Users will see an option to `Insert a variable` below any of your `plain-text input` blocks that you specify.
* `inputs` and `outputs` are required arguments for `updateStep` - saves what data is required to come in, along with the array of what you promise to return.
* Outputs
  * Types available to us for now: `text`, `channel`, or `user`. Unfortunately, no numbers or interesting data structures, unless you get creative with parsing text in a future workflow step.

### How to update a Step modal?

The important bit in the Python example below is to call `views_update` with not a modal, but `type:workflow_step` and a `callback_id` that matches what you set for the whole Step.

_⚠ You CANNOT push new views to a modal, only update._

Example is with Bolt since it abstracts away a lot of the Step interaction, so it can be a bit more confusing than if you already are working directly with API calls.

    # TODO: this seems like it would be a good thing to just have natively in Bolt.
    # Lots of people want to update their Step view.
    @app.action("utilities_action_select_value")
    def utils_update_step_modal(
        ack: Ack, body, logger: logging.Logger, client: slack_sdk.WebClient
    ):
        ack()
        logger.info(f"ACTION_CHANGE: {body}")
        selected_action = body["actions"][0]["selected_option"]["value"]
        updated_blocks = copy.deepcopy(c.UTILS_STEP_MODAL_COMMON_BLOCKS)
        updated_blocks.append(
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": f"{c.UTILS_CONFIG[selected_action].get('description')}",
                },
            }
        )
        updated_blocks.extend(c.UTILS_CONFIG[selected_action]["modal_input_blocks"])
        updated_view = {
            "type": "workflow_step",
            "callback_id": c.WORKFLOW_STEP_UTILS_CALLBACK_ID,
            "blocks": updated_blocks,
        }
        resp = client.views_update(
            view_id=body["view"]["id"], hash=body["view"]["hash"], view=updated_view
        )
        logger.info(resp)
        
     ...
     
    utils_ws = WorkflowStep(
    callback_id=c.WORKFLOW_STEP_UTILS_CALLBACK_ID,
    edit=edit_utils,
    save=save_utils,
    execute=execute_utils,
    )
    app.step(utils_ws)

### How long can an execution run?

An execution has to eventually send a `complete()` or `fail()`, but how long can you process until it just times out? I haven't found any docs with a specific time yet, but have kicked off a few different tests, and it seems to be **_at minimum 20 days_**. If my [hypothesis about their underlying infrastructure](#hypothesis-on-architecture) is correct, you may have up to 1 year until it gives up. This screenshot from 9-27-2022 shows an execution I started on 9-7-2022 with it still showing `In progress` waiting for a signal.

![](/images/long-running-execution.png)

With a window on the order of days rather than seconds, it opens up new possibilities. Human-time-scale tasks suddenly become a possibility in your Workflows - I could mail a letter with the execution ID and have my friend complete it when it gets to him. The sky is the limit!

### Hypothesis on architecture

Not much to back this up, but I have a strong feeling that Workflow Builder is backed by [AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html) under the hood - just a very simplified view of them.

***

## Examples & templates

See [Workflow Builder Templates](/docs/slack/workflow-builder-templates/).

***

## Resources & articles

* [The latest from Workflow Builder (Feb 2020)| Slack Developer Blog](https://medium.com/slack-developer-blog/the-latest-from-workflow-builder-8e0278ddc569)
* [Stickier Slack apps with workflow steps (Jul 2020)| Slack Developer Blog](https://medium.com/slack-developer-blog/stickier-slack-apps-with-workflow-steps-68f24ce48311)