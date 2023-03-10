+++
date = 2023-03-08T00:39:56Z
description = "A guide to build out the bones of your next Slack App on the Cloudflare Workers platform. Take advantage of the speed and utilities available in the Cloudflare ecosystem."
images = ["bos-cloudflare-workers-example-app-home.png"]
lastmod = 2023-03-08T00:39:56Z
lead = ""
title = "Building a Slack App on Cloudflare Workers"
toc = true
weight = 999

+++
As Cloudflare continues building out utilities on the Workers platform, it's become a more attractive option for building Slack Apps. By the end of this article, you will have the bones of a Slack App running on Cloudflare Workers. From there, you can build on top of it to create the Slack bot of your dreams.

> ℹ️ _If you want to skip the article and just dig through the starter/example repo --> [GitHub](https://github.com/I-Dont-Remember/cloudflare-workers-slack-app)._

![](/images/bos-cloudflare-workers-example-app-home.png)

## 🎁 What's in the box?

Before investing time to read this article, you probably want to know if it's worth the energy. You'll be setting up this [example repo](https://github.com/I-Dont-Remember/cloudflare-workers-slack-app), and end up with a barebones Slack App in your own repo ready to continue on with your project.

### Nitty gritty details

 The repo aims to handle to boring parts so you can get right to building an app, but without adding extra packages you might not want. It has:

* A minimal [Slack SDK](https://github.com/sagi/workers-slack), since there isn't an official version for the Cloudflare Workers runtime (as of Spring 2023).
* Request verification from the same SDK, to ensure requests from Slack ACTUALLY came from Slack.
* [A request router](https://github.com/honojs/hono#benchmarks), to avoid having to rewrite the logic yourself.
* Simple data structure for adding new handlers (for button presses, events, etc).
* A few examples of basic Slack interactions that are easy to update/remove.

## 🤔 Why Build on....

The newer Slack Platform and Cloudflare Workers are by no means the only place to host your Slack App server, but they offer a somewhat similar experience and were begging to be compared.

### Benefits of Slack Platform

Slack has been improving the developer experience with their new [Slack Platform](https://api.slack.com/future/quickstart). It comes with a few handy features:

* Built-in functions for interacting with Slack APIs
* Native-support for SDKs
* _"Run on Slack"_ lets you avoid dealing with hosting your own infra
* NoSQL [datastores](https://api.slack.com/future/datastores), so you don't have to host your own persistence

### Benefits of Cloudflare Workers

Despite not being natively supported by Slack's SDKs, running your app on Cloudflare Workers unlocks a number of commonly needed tools that may make it worth it:

* [Workers KV](https://developers.cloudflare.com/workers/wrangler/workers-kv/) - a key-value data store
* [Cron Triggers](https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/) - I've never built an app that I didn't want a way to run scheduled jobs
* [Queues](https://developers.cloudflare.com/queues/) - Useful in a lot of design patterns
* [R2](https://developers.cloudflare.com/r2/) - similar to S3 for file/blob storage
* [Durable Objects](https://developers.cloudflare.com/workers/learning/using-durable-objects) - another way to persist-data across Workers
* _(alpha)_ [D1](https://developers.cloudflare.com/d1) - SQLite at the edge

On the surface there's a lot going for the Cloudflare ecosystem - I will add the ⚠️ caveat though: _I have not used them in Production, so cannot speak to availability, uptime, etc. that are important considerations when choosing platforms._

***

## 🏗️ Setup

Now that you've considered your hosting options, let's set up the sample Cloudflare Workers app so you can get hands-on experience using it.

> _If you're a Replit user, you can skip **Prerequisites**  and **Setup sample repo** - follow the_ [_Replit x Cloudflare Workers guide_](https://blog.replit.com/cloudflare-workers)_, then  just copy the files under `src/` from the sample repo into your Repl. You'll start back with us at the **Setup Slack App** step._

### Prerequisites

* A recent version of Node.js, `16.13.0` or newer.

### Setup sample repo

* Clone the [sample repo](https://github.com/I-Dont-Remember/cloudflare-workers-slack-app).
  * `git clone git@github.com:I-Dont-Remember/cloudflare-workers-slack-app.git && cd cloudflare-workers-slack-app/`
* Update code to use a fresh Git repo.
  * From inside that cloned directory, run `rm -rf .git/` to remove the existing Git information.
  * Run `git init` .
  * Now we'll add all existing files in a first commit - that way it's easy to track your changes vs the example repo.
    * `git add . && git commit -m "inital app template from buildingonslack.com"`
* Install all the packages so it can build locally - this also installs the [Wrangler CLI]() to our local project.
  * `npm ci`

Our server isn't quite ready to run yet, but we'll pause here for a sec and go configure the other pieces we need.

### Setup Slack App

Conveniently, Slack came out with the concept of the `App Manifest` so that we could store app configuration in version control. To get your example app connected to Slack, all you need to do is:

* [Create your Slack app](https://api.slack.com/reference/manifests#creating_apps) from the `slack_app_manifest.yml` file, found in the cloned repo.
* _⚠ MAKE SURE TO CLICK `from an app manifest` WHEN THE MODAL POPS UP!_
  * Click through the couple simple confirmation modals.
  * After it's created, then go to the `OAuth & Permissions` section and click `Install App` to grant permissions for your new app on the workspace. This will generate the credentials you will need for the next steps.
    * You'll need the `Bot User OAuth Token` from that same page, as well as the `Signing Secret` from the `Basic Information` tab.

### Final Steps

* Create a `.dev.vars` file to store our secrets that will be used during local runs, follow the `.dev.vars.example` from the repo.
* Add the secrets to the worker runtime as well.
  * `echo <VALUE> | wrangler secret put <NAME>`
* login to wrangler so you can run the local server, deploys, etc.
  * `wrangler login`
* Deploy your new worker - save the URL it's set to run on once deployed.
  * `make deploy`

At this point, we should have all credentials, dependencies, and code in the right places - it's time to launch this sucker.

## 🚀 Run Server

* Update your `slack_app_manifest.yml` file `request_url` fields with your Cloudflare Workers URL _(this won't change anything, it's just good to save your progress 🙂)_
* In your [Slack App Dashboard](https://api.slack.com/apps/), copy the file contents from your `slack_app_manifest.yml` into the App Manifest section and then **Save**. This ensures the copy in your repo acts as the source of truth.
* Finally, open Slack, find your bot's name in search (default is `cloudflare-workers-test`), then go to the App Home.

If everything went well, you should see a published Home with your name on it!

![](/images/bos-cloudflare-workers-example-app-home.png)

## Continued Local Development

As you continue developing your app, you'll likely want to run the server locally while you are testing, rather than having to `publish` it every time you make changes. A common approach is use a tunnel service, which forwards a public URL (aka one that Slack's servers can interact with) to your `localhost`. Two options I've used:

* [`Ngrok`](https://ngrok.io) - simple to use, though free version gives you a randomly generated URL that you'll need to update your Slack App with each time.
* [`Cloudflared`](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/) - At the very basic level we're using it, it has been indistinguishable from Ngrok. Cloudflared is also a downloadable binary, also generates a random URL by default (though it appears you can use one of your own domains on the free tier (?). I'll update if I find it to have more handy utilities.)

Now go forth and build all the things on Slack!