---
title: Slack Workflow Builder HTTP Request Tool
description: Unlocking the ability to send HTTP requests from Slack Workflow Builder
  - send webhooks to trigger other services from your Slack workflow!
lead: ''
date: 2022-12-07T08:15:44.000-06:00
lastmod: 2022-12-07T08:15:44.000-06:00
images:
- "/images/bos-workflow-buddy-http-request.png"
weight: "999"
toc: true
draft: true

---
When automating your workload with no code tools like Slack Workflow Builder, flexibility is incredibly important to handle the last mile of your unique situation that existing tools haven't (or might not) handle for you. Being able to send HTTP Requests/webhooks to other services is often they key unlocking that door, but unfortunately Slack has not added a built-in Step for it. Lucky for you, there is a free open-source Slack App that can help - [Workflow Buddy](https://github.com/happybara-io/WorkflowBuddy)!

## Slack Workflow Builder Send HTTP Requests with Workflow Buddy

The Workflow Buddy app adds new [`Steps from Apps`](https://api.slack.com/workflows/steps) into your Slack Workflow Builder library of Steps. It adds a whole slew of new utilities you can use, like random member picker, delay, wait for approval, and more - but you are here because you need to send HTTP requests from Slack!

![Slack Workflow Builder Send Webhook Step - one of Workflow Buddy's many utilities.](/images/bos-workflow-buddy-http-request.png)

The HTTP Request Step (currently called `Outgoing Webhooks` or `Send a Webhook`) aims to provide the full flexibility you expect from Zapier/n8n/other no-code automation tools. As you can see in the screenshot, you can choose whether or not HTTP error codes should fail the build, the HTTP method, as well as letting you build any structure JSON you need for the request body, request headers, or request query params.

After the step runs, you get 2 Slack Workflow variables to use in future steps - the `Webhook Status Code` and `Webhook Response Text` (plain-text JSON string of the response body received).

## Workflow Buddy Send Webhook Step - Dealing with Responses

Sometimes it's enough to just send a webhook/request out, check it's a `200 OK`, and call it a day. For the real automation gurus out there though, you want to be able to call APIs and then _DO THINGS_ with the response!

Since Slack doesn't have HTTP/JSON functionality built in to their Workflow Builder types, we are only able to get a JSON string as plain-text back from the `Send Webhook` Step. That isn't good for much more than printing it out for users. We need a bit more functionality to use data from requests.

## Slack Workflow Builder JSON Extractor

[Workflow Buddy](https://github.com/happybara-io/WorkflowBuddy) adds another utility Step called `Extract values from JSON`, which lets you use the [JSONPath](https://github.com/h2non/jsonpath-ng) syntax to specify specific values from the API response - maybe you need to extract a `response_url`, or a phrase, or a data point, the sky is the limit! If you need numerous values, you can use this step multiple times in a row to get everything as Slack Workflow variables for use farther along.

![Pulling data out of JSON in Slack Workflow Builder.](/images/bos-workflow-buddy-json-extractor.png)

## Slack Workflow Send HTTP Request

If you haven't left the page already, you likely are interested in playing around with the tool that lets you send outgoing webhooks in Slack workflows.

There is a [Workflow Buddy Demo app](https://github.com/happybara-io/WorkflowBuddy#demo-app) that you can install and play around with in your workspace. If it handles your use case, you can the explore the other options for [Running Workflow Buddy](https://github.com/happybara-io/WorkflowBuddy#running-workflow-buddy) - the Cloud version is currently on a waitlist, but it is self-hostable for free.

Best of luck, and if you run into any issues, check the [docs & support resources](https://github.com/happybara-io/WorkflowBuddy#support)!