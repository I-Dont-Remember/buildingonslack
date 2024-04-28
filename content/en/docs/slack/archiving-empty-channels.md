---
title: "Archiving Empty Channels"
description: ""
lead: ""
date: 2024-04-28T14:16:16-05:00
lastmod: 2024-04-28T14:16:16-05:00
draft: false
images: []
menu:
  docs:
    parent: ""
    identifier: "archiving-empty-channels-23bd8bf68df0d58f55f0de4999b0abda"
weight: 999
toc: true
---

Life tends towards entropy, and our Slack workspaces aren't immune. Every so often, an admin (or kind volunteer) will want to go through and clean up their team's workspace, whether that's old channels, unused members, or what have you. A case we've recently run into is having to clean out all the channels that have 0 remaining members in them - maybe the people have left the company, or the channel itself isn't of value going forward. For whatever reason, feel free to borrow and expand on this script to take all sorts of bulk actions against the channels of your workspace.

## Setup

This script will use the endpoints [conversations.list](https://api.slack.com/methods/conversations.list) and [conversations.archive](https://api.slack.com/methods/conversations.archive).

> ⚠️ _If you are planning to run this for Private Channels, know that the script will run [conversations.join](https://api.slack.com/methods/conversations.join) as well, because the App needs to be a part of the channel before it can archive it._

- You'll need to create a [new Slack app](https://api.slack.com/start/apps), so that the script has permissions to interact with your workspace
- Request the bot scopes you will need to request `channels:read`, `channels:manage`. (+ `groups:read`, `groups:write`, and `channels:join` if you plan to run against private channels, too)
- Set your token as an environment variable called `SLACK_TOKEN`
- Run the script using Python 3.6+

## The script

```python
import os
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

CONVERSATION_TYPES_TO_CHECK = ['public_channel'] # ['public_channel', 'private_channel']

def handle_channel(client: WebClient, channel: dict):
    cname = channel["name"] 
    channel_id = channel["id"]
    num_members = channel["num_members"]
    is_private = channel.get("is_private", False)
    ignore_list = ['general']
    
    if cname in ignore_list:
        return None

    if num_members == 0:
        print(f'Archiving {cname} for having 0 members..')
        if is_private:
            # have to join the channel before we can archive it
            client.conversations_join(channel_id=channel_id)

        try:
            # rate limiting for this endpoint handled by the client level handler we added
            client.conversations_archive(channel_id=channel_id)
        except SlackApiError as e:
            if e.response["error"] == "cant_archive_required":
                print(f'[!] unable to archive {cname} as it is required')

def search_conversations_and_archive_0_member_channels(client):
    cursor = None
    while True:
        response = client.conversations_list(
            limit=300,
            cursor=cursor,
            exclude_archived=True,
            types=','.join(CONVERSATION_TYPES_TO_CHECK),
        )
        for channel in response["channels"]:
            handle_channel(client, channel)
        cursor = response.get("response_metadata", {}).get("next_cursor")
        if not cursor:
            break

if __name__ == "__main__":
    client = WebClient(token=os.environ["SLACK_TOKEN"])
    # This handler does retries when HTTP status 429 is returned, https://slack.dev/python-slack-sdk/web/index.html
    from slack_sdk.http_retry.builtin_handlers import RateLimitErrorRetryHandler
    rate_limit_handler = RateLimitErrorRetryHandler(max_retry_count=1)
    client.retry_handlers.append(rate_limit_handler)

    search_conversations_and_archive_0_member_channels(client)
```
