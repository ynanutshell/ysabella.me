---
published: true
slug:
title: Using marquee animations
description:
type: notes
subtype: process
cover:
tags:
  - website
  - design
planted: 2026-07-14T23:34:10+08:00
tended: 2026-08-05T14:16:12+08:00
---
Up until adding this particular scrolling banner to my homepage, I didn’t have the faintest clue there was a specific term and HTML tag for it: `<marquee>`. This might give my age away a little, but I also learned it was first introduced in early versions of Internet Explorer and phased out as early as 1996.

Nowadays, marquees aren't commonly used and there has been [countless arguments](https://ux.stackexchange.com/questions/76951/what-are-arguments-against-the-usage-of-a-ticker-marquee-on-websites) [against their use](https://overnightwebsite.com/trends-to-avoid-marquee-animation/):

1. **Visually distracting.** With any number of elements on my website's landing page, there is something to be said against cramming in even *more* visual weight. To prevent pulling attention away from the main content, I kept the banner small and minimal. I also slowed down the animation speed.
```css
.marquee:hover {
	-webkit-animation-play-state: paused;
	animation-play-state: paused;
}
```
2. **Legibility and control.** Chances are, whatever scroll speed I set will either be too fast or too slow depending on any one viewer’s reading speed. To grant some measure of control back, I added a line of CSS that pauses the animation on-hover. 
```js
const banner = document.getElementById('banner');
const marquee = document.querySelector('.marquee');

if (banner && marquee) {
	banner.addEventListener('scroll', () => {
		(marquee as HTMLElement).style.animation = 'none';
	}, { once: true });
}   
```
3. **Unpredictable content**. Marquees typically have no indicator to show the current scroll position or just how far the content stretches. While I decided against adding a scrollbar, keeping the element visually lean, I implemented a small script that overrides the animation when the reader manually scrolls.

While my implementation is passably functional, the argument against the typical use of a marquee is sound. My intent in writing this down is to put my thought process and workarounds into words. Otherwise, it all tends to slip into a void of [[design decisions]] I can't quite articulate. This also keeps the door open to other options should I end up weighing it in my head more over time.