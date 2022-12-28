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
> ⚠️ _this is a peek into my brain during the writing process. Trying to better embody the idea of "Show your Work". This page is meant to grow as I let the idea ruminate in my head._

When you're considering building an app nowadays, you're flooded with choices. You can build a stand-alone application, or build on top of a thousand different platforms that already have a growing market share. After building on Slack for several years, there's a few lessons that have stuck out when building on a platform like Slack.

* Pro & Con: Slack: restrict you to use their blocks design system, just a bunch of JSON - as a backend engineer who hates moving buttons around on the frontend, absolutely essential. but their's also plenty of times where you want an input type that doesn't exist, or to add a confirmation to a modal submission, or etc and you just can't.
  * i think it's overall a benefit because it's flexible enough you're almost never blocked from doing something, sometimes you just have to get a little creative. but you save so much time because you never have to worry about fiddling with how things look - it's always exactly like the blocks you expect. You get to focus on the UX of your app, not where a button is.
* Your growth is (somewhat) limited by the platform's growth
  * This is really only a consideration if you are trying to become mega-huge, or 

## Pros

* Have to worry less about authentication and user management since they handle for you, can concentrate on solving the problem you're focused on rather than all the extraneous bits
* Many time there are design constraints which make it easier to build, then you can concentrate on making the best UX with what you're given rather than getting distracted by the million potential decisions in the design from colors to size of buttons.
* Often have a built in app market place for people to find you, get at least some exposure without having to do anything
* data security is less of a concern, because they are handling auth and etc. Most of what you store is only relevant to your application, their isn't the extra layer of people's passwords, etc.
* often have a marketplace that can give you exposure like an app store, some people that works really well for like Tettra?
* we get to take advantage of the improving underlying platform

## Cons

* Sometimes the platforms architecture will limit how you can interact with in a way that forces you to not go with the most common option
* can't get as creative with your designs
* occasionally the platform will gobble you up, like apple does with cannibalizing popular apps. Slack got us when they released scheduled messages, but we knew it was coming for a long time
* users think any issues with the platform are tied to your app since that's what they were using at the time of failure
* Since it's built on as extension of platform, people aren't as willing to pay if you compete against stand alone apps, even if you handle the same capabilities. There's a bias because you're an extension not it's own thing

## Other platforms to consider

I was flabbergasted when I realized how many places provide a platform for developers to build apps on top of them. They vary heavily in the quality of developer-experience though, so choose wisely based on the problem you are aiming to solve.

* Wordpress
* Shopify
* Salesforce
* Airtable
* Zoom
* ..a gazillion others