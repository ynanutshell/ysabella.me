---
published: true
slug:
title: TIL about Cloudflare's opt-out analytics
description:
type: notes
subtype: til
cover:
tags:
  - cloudflare
  - domain
  - website
planted: 2026-06-08T16:02:54+08:00
tended: 2026-06-16T11:18:01+08:00
---
## Context
I made the switch over to [Cloudflare’s](https://www.cloudflare.com/) domain hosting a few years back because at-cost pricing made them the cheapest renewal option. Since then, I have relied on them when it comes to hosting both of my domains: `ysabella.me` and `ynanutshell.com`.

At the time, it was a convenient choice because I was already using [Cloudflare Workers](https://www.cloudflare.com/products/workers/) to serve my Notion-based portfolio through a custom domain. Now, I've been hosting the current iteration of my personal site through the same service with nearly no issues whatsoever.

## A Small Problem
Today, I stumbled across an unfamiliar script while inspecting my personal site: `https://static.cloudflareinsights.com/beacon.min.js/`.

A few searches later and I learned that Cloudflare enables their own [Web Analytics](https://www.cloudflare.com/web-analytics/) (also known as Real User Monitoring) by default on [proxied websites](https://developers.cloudflare.com/web-analytics/get-started/) under a [free plan](https://developers.cloudflare.com/speed/observatory/rum-beacon/#rum-excluding-eeaeu). I have a few thoughts on opt-out frameworks, especially in the time of generative AI and LLMs, though I'll save that for a later entry.

## Opting Out
I already use a self-hosted instance of [Umami](https://umami.is/) for web analytics, so another service that covers the same area adds unnecessary performance drain to my website. Luckily, it’s easy enough to disable the feature, if not the most intuitive process at first.
1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Navigate to `Analytics > Web Analytics` via [account](https://dash.cloudflare.com/?to=/:account/web-analytics) or domain-level settings.
3. Depending on how you accessed Web Analytics, click either **Manage site** for the website(s) you’re updating or **Manage RUM Settings** under `Quick Actions`. 
4. Under `Real User Measurements (RUM)`, select the option **Disable** or whichever one is most applicable in your case.
5. Lastly, click **Update** to save your changes. Based on my experience, it should take effect almost immediately or within a few minutes at most.

<figure class="card lg">
    <img alt="A few radio options under the heading Real User Measurements. A description reads: Enable Real User Measurements (RUM) for your Hostname(s) to monitor how real users experience the speed of your website or application. Options range from Enable, Enable (excluding visitor data in the EU), Enable with JS Snippet installation, and Disable." class="img-dark" src="https://assets.ysabella.me/cdn-cgi/image/format=webp,quality=100,width=950/garden/cloudflare-analytics-dark.png">
    <img alt="Several radio options under the heading Real User Measurements (RUM). A description reads: Enable Real User Measurements (RUM) for your Hostname(s) to monitor how real users experience the speed of your website or application. Options range from Enable, Enable (excluding visitor data in the EU), Enable with JS Snippet installation, and Disable." class="img-light" src="https://assets.ysabella.me/cdn-cgi/image/format=webp,quality=100,width=950/garden/cloudflare-analytics.png">
    <figcaption class="caption center">Disabling Cloudflare's built-in web analytics takes effect almost immediately.</figcaption>
</figure>

## My Thoughts
Opt-out models have long existed as a pattern and are increasingly becoming a norm across digital services—typically at the expense of consumer data privacy. I honestly lost track of the number of times I've had to dig through account settings to opt out of something I didn't initially consent to.

At this point, it's kind of a given that navigating these scenarios comes with the territory of relying on free products[^1]. There is a common saying: *"If you're not paying for the product, you are the product."*

While I’ve chalked this particular instance up as a minor performance concern, I generally believe that, in the modern age of the internet, it's important to be aware of and continue documenting similar implementations that might otherwise go unnoticed.

[^1]:Though it should go without saying that this principle doesn't apply to every free product out there.
