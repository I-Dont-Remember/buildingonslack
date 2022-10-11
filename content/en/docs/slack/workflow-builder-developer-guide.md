---
title: "Workflow Builder Developer Guide 2022"
description: "Developing Steps from Apps for Slack Workflow Builder."
lead: ""
date: 2022-10-09T23:16:47-05:00
lastmod: 2022-10-14T23:16:47-05:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "workflow-builder-developer-guide-d0eadfa2145563678743e92eaa82c6c2"
weight: 110
toc: true
---

The notes & guides I found useful while developing my first real Slack Workflow Step.

Quick links:

- [Bolt Python docs](https://slack.dev/bolt-python/concepts).
- [Slack Workflow Docs](https://api.slack.com/workflows/steps).

> _⚠ Apps are limited to ONLY 10 Steps! Keep in mind when designing app UX._
>
> _Not everyone will run into this hard limit, but a workaround for those aiming to have lots of functionality in their apps is to create your own action step select, and then run a `view_update` based on their selection - [How-to update](#how-to-update-a-step-modal)._ [_Zapier is a good example_](https://community.zapier.com/product-updates/use-20-zapier-apps-directly-in-slack-s-workflow-builder-5466)_._

## Current best practice suggestions

These are suggestions just from my own experience developing steps and running into issues, they are by no mean law to live by.

- Catch all exceptions/errors during your `step execution` functions to send `fail().`
  - _An execution will keep running until receiving `complete` or `fail`, so if you hit an error in the middle and aren't catching it, your users will end up with a bunch of in-progress executions in their analytics with no error messages._
- Give descriptive error messages to users of your Step.
  - _There_ [_doesn't appear to be a limit_](#workflow-error-message-limitations) _on how many characters you can send back in your `fail()`, so provide your users something more useful than `It Broke`._
- Keep in mind users will have saved [outdated versions of your Step](#workflows-using-out-dated-versions-of-your-step) - try to keep them supported without breaking their Workflows.

## App setup

You'll need to go through and add events & OAuth scopes to enable your app to use Steps - follow the [Slack docs](https://api.slack.com/workflows/steps#configure) `Configure` & `Prepare` sections.

## User adds your step

The first stage is handling when a user attempts to add your step to their workflow. The diagram below showcases it, but the process is:

1. User clicks to use your Step in Workflow Builder - this sends the `workflow_step_edit` event.
2. You open the configuration modal view for them.
3. _(Optional)_ they take an action (e.g. button click) and you call `view_update` to replace the modal they see.
4. User submits the modal - this sends the `view_submission` event.
5. You parse the submitted data and fill out `inputs` and `outputs` before sending them to `workflows.updateStep`.

![Timeline diagram of Slack sending events to your app for a Step.](/images/workflow-diagram-app-step-timeline.png)

## Configuration modal

- Users are able to pass information from previous steps using `inputs`
- ![ℹ️](data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==) Users will see an option to `Insert a variable` below any of your `plain-text input` blocks that you specify.
- `inputs` and `outputs` are required arguments for `updateStep` - saves what data is required to come in, along with the array of what you promise to return.
- Outputs
  - Types available to us for now: `text`, `channel`, or `user`. Unfortunately, no numbers or interesting data structures, unless you get creative with parsing text in a future workflow step.

## How to update a Step modal

_Optional:_ Only needed if you want to change Step options based on user action. The important bit in the example below is to call `views_update` with not a regular modal, but `type: workflow_step` and a `callback_id` that matches what you set for the whole Step - in this case `c.WORKFLOW_STEP_UTILS_CALLBACK_ID`. Example is in Python, but the Slack parts should be language-agnostic.

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

## Changing the Step display name & image

The `update` method has a couple additional arguments available with `step_name` and `step_image_url`.
Conveniently, there isn't much restriction on what you can do with this, _not even a length limit!_ I was able to pass a super long string in and it just pushes the `Edit` button away. Some escape characters seem to work (at least `\n`), but Markdown is not supported.

Gave it the following string, and see image for what it spit out:

    step_name = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n*Markdown*\nEscape chars: \b\t\r\f\s\'\"\\"

![](/images/workflow-testing-step-name-restrictions.png)

## How long can an execution run?

An execution has to eventually send a `complete()` or `fail()`, but how long can you process until it just times out? I haven't found any docs with a specific time yet, but have kicked off a few different tests, and it seems to be **_30+ days_**. If my [hypothesis about their underlying infrastructure](#hypothesis-on-architecture) is correct, you may have up to 1 year until it gives up. This screenshot from 9-27-2022 shows an execution I started on 9-7-2022 with it still showing `In progress` waiting for a signal. Checked again on 10-14-2022 and still chugging along!

![Slack Workflow analytics page showing in-progress workflows](/images/long-running-execution.png)

With a window on the order of `days` rather than `seconds`, it opens up new possibilities. Human-time-scale tasks suddenly become a possibility in your Workflows:

- Waiting for manual approval from a human
- Waiting for a batch service/data ETL to run, then continue once a success webhook is received _(you'd have to configure these separately from the core Webhook-triggered Workflows._)
- Heck, I could mail a letter with the execution ID and have my friend complete it when it gets to him. The **USPS Step 📬!**

The sky is the limit!

## Workflow error message limitations

Can Workflow error messages include Markdown? How long can they be?

- Sadly, no. You can only pass `plain_text` errors back to users to show in their Analytics page. Emojis work though! 😅
- In my testing, I was able to send `3800` characters without it breaking, so length is no excuse for not giving descriptive and useful error messages.

## What happens to Workflows if my Step server is down?

From what I can tell, it seems like they get marked as `In progress` in the Workflow Builder analytics page, but provide no further information to tell user (or you) that your server didn't respond vs intentionally was processing data.

## Workflows using out-dated versions of your Step

Once a workflow step is built, you will find yourself with users who built Workflows on old `inputs/outputs` schema from any point in your Step's history. If you are actively developing your Step while it's in-use _(especially changing variable names, adding new `inputs`, etc)_ you may end up with events missing **required*- inputs in your newer schemas! So far I see two options to handle it:

- 🧘‍♀️Support the old schema to the absolute best of your ability.
- ❌fail the step and send the user a message telling them to upgrade. This seems like a very bull-headed approach, and not recommended.

In some cases you may have no choice but to poke the user to update, but that's a path to mega frustration, and to be avoided if possible.

## Hypothesis on architecture

Not much to back this up, but I have a strong feeling that Workflow Builder is backed by [AWS Step Functions](https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html) under the hood - just a very simplified view of them.

## Frustrations

Workflow Builder is a pleasure to work with, though there are a few things I'd like to see in the future.

- **Low discoverability of Steps**
  - As it stands, you won't be getting any user acquisition from `that's a cool step -> finds your app -> installs it`. There's no place for users to discover Steps that could be useful for them. Would love for their to be a way to have Steps be a benefit for discovery of Slack App SaaS. Maybe an extension of the App Directory?
  - This might only be a concern for external SaaS companies built on Slack, since the use case of `I want to send a ticket to Jira` (or similar) would have a very clear app you'd want to have that Step.
- **No central commmunity templates**
  - It seems like there would be a spot to search templates from within Workflow Builder, but there's just a few default Slack ones. Users are building all these cool Workflows at different companies and don't have a place to share them. I've started [pulling together some resources](/docs/slack/workflow-builder-templates/), but that's a drop in the bucket vs how many are probably out there.
- 
