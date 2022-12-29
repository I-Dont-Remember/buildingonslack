---
title: Pros & Cons of Building on Slack as a Platform
description: ''
lead: ''
date: 2022-10-10T19:08:36.000-05:00
lastmod: 2022-12-28T23:48:23+00:00
images: []
weight: "999"
toc: false

---
When you're considering building an app nowadays, you're flooded with choices. You can build a stand-alone application, or build on top of a thousand different platforms that already have a growing market share. After building on Slack for several years, there's a few lessons that have stuck out when building on a platform like Slack.

## Pros

* Common needs are already handled for you, like authentication & user management. Spend time working on your problem-space rather than the generic pieces every application has to worry about.
* In a similar vein, you have a lower surface area to worry about with data security since common sensitive items like authentication is already handled.
* Design constraints let you concentrate on UX, rather than worrying about a million tiny design choices.
  * Slack restricts you to use their blocks design system, which is written as a bunch of JSON - as a backend engineer who hates moving buttons around web pages, absolute godsend. That said, there are still moments of frustration where I want an input type that doesn't exist, or to add a confirmation to a modal submission, or etc and you just can't. Overall, it's a pro though, because it's rare that you're completely blocked, usually a little creativity will get you a usable UX, and you avoid the rabbit hole of CSS issues and design decisions. 
* The built-in app marketplace is free marketing.
* Whenever the Slack platform improves (like adding Huddles, Shared Channels, etc.) it opens up new opportunities.

## Cons

* Sometimes the platforms architecture will limit how you can interact with in a way that forces you to not go with the most common option
* Occasionally platforms like Slack can cannibalize app features.
  * Slack ate up a bunch of scheduled message apps when they released it natively. Unlike Apple, though, it was clear for a long time that they were going to add it - build at your own risk. 
* Users think any issues with the platform are tied to your app, since that's what they were using at the time of failure.
* People aren't as willing to pay, even if you give them powerful capabilities. There's a bias because you're an extension, and not a stand-alone entity.
* Your growth is (somewhat) limited by the platform's growth.
  * This is really only a problem if you're trying to be mega-huge. Indie Hackers and small scale friends, ignore this because it's the least of your issues.

## Other platforms to consider

I was flabbergasted when I realized how many places provide a platform for developers to build apps on top of them. They vary heavily in the quality of developer-experience though, so choose wisely based on the problem you are aiming to solve.

* Wordpress
* Shopify
* Salesforce
* Airtable
* Zoom
* ..a gazillion others