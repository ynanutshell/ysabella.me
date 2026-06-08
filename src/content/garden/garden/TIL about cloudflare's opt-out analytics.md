---
published: true
slug:
title: TIL about Cloudflare's opt-out analytics
description:
type: notes
subtype: pattern
cover:
tags:
  - cloudflare
  - domain
  - website
planted: 2026-06-08T16:02:54+08:00
tended: 2026-06-09T01:17:04+08:00
---

My domain provider of choice used to be [Porkbun](https://porkbun.com/), which worked great and had no notable issues that I can recall. When the time came to renew, I made the switch over to Cloudflare; at-cost pricing meant that it was the cheapest renewal option. Since then, I have hosted two domains, `ysabella.me` and `ynanutshell.com`, under [Cloudflare](https://www.cloudflare.com/).

At the time, it was also a convenient choice because I was already using [Cloudflare Workers](https://www.cloudflare.com/products/workers/) to serve my Notion-based portfolio through a custom domain. Now, I host the current iteration of my personal site through the same service, and I've had nearly no issues whatsoever.

## A Small Problem
Today, I stumbled across an unfamiliar script while inspecting my personal site for redundant code: `https://static.cloudflareinsights.com/beacon.min.js/`.

A few searches later and I learned that Cloudflare enables their own [Web Analytics](https://www.cloudflare.com/web-analytics/) (also known as Real User Monitoring) by default on [proxied websites](https://developers.cloudflare.com/web-analytics/get-started/) under a [free plan](https://developers.cloudflare.com/speed/observatory/rum-beacon/#rum-excluding-eeaeu). I have a few thoughts on automatic opt-in patterns, especially in the time of generative AI and LLMs, though I've come to accept that navigating these scenarios comes with the territory of relying on free services: *"The customer is the product."*

## Opting Out
I already use a self-hosted instance of [Umami](https://umami.is/) for web analytics, so another service that covers the same area adds unnecessary performance drain to my website. Luckily, it’s easy enough to disable the feature, if not the most intuitive process at first.
1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com/).
2. Navigate to `Analytics > Web Analytics` via [account](https://dash.cloudflare.com/?to=/:account/web-analytics) or domain-level settings.
3. Depending on how you accessed Web Analytics, click either **Manage site** for the website(s) you’re updating or **Manage RUM Settings** under `Quick Actions`. 
4. Under `Real User Measurements (RUM)`, select the option **Disable** or whichever one is most applicable in your case.
5. Lastly, click **Update** to save your changes. Based on my experience, the change should take effect almost immediately or within a few minutes.

<figure class="card lg">
    <img alt="A few radio options under the heading Real User Measurements. A description reads: Enable Real User Measurements (RUM) for your Hostname(s) to monitor how real users experience the speed of your website or application. Options range from Enable, Enable (excluding visitor data in the EU), Enable with JS Snippet installation, and Disable." class="img-dark" src="https://assets.ysabella.me/cdn-cgi/image/format=webp,quality=100,width=950/garden/cloudflare-analytics-dark.png">
    <img alt="Several radio options under the heading Real User Measurements (RUM). A description reads: Enable Real User Measurements (RUM) for your Hostname(s) to monitor how real users experience the speed of your website or application. Options range from Enable, Enable (excluding visitor data in the EU), Enable with JS Snippet installation, and Disable." class="img-light" src="https://assets.ysabella.me/cdn-cgi/image/format=webp,quality=100,width=950/garden/cloudflare-analytics.png">
    <figcaption class="caption center">Disabling Cloudflare's built-in web analytics takes effect almost immediately.</figcaption>
</figure>

## Reflections
Automatic opt-ins have increasingly become a norm across digital services—especially in a time of generative AI and LLMs. I've honestly lost track of the number of times I've had to opt out of a feature or agreement I didn't initially consent to.

I've resolved to chalk this instance up as a minor performance concern, but I generally believe that, in the modern age of the internet, it's important to be aware of and continue documenting similar implementations that might otherwise go unnoticed.