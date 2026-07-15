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
tended: 2026-07-15T10:57:04+08:00
---
Up until adding this particular scrolling banner to my homepage, I had no idea there was an HTML tag for this specific element: `<marquee>`. I learned it was first introduced in early versions of Internet Explorer but was phased out as early as 1996 (I realize this might give my age away a little).

Nowadays, marquees aren't commonly used and there has been [countless arguments](https://ux.stackexchange.com/questions/76951/what-are-arguments-against-the-usage-of-a-ticker-marquee-on-websites) [against their use](https://overnightwebsite.com/trends-to-avoid-marquee-animation/):

1. **Visually distracting.** With any number of elements on my homepage, there is something to be said against cramming in even *more* visual weight. To prevent pulling attention away from the main content, I kept the banner small and minimal. I also slowed down the animation speed.
```css
.marquee:hover {
	-webkit-animation-play-state: paused;
	animation-play-state: paused;
}
```
2. **Lack of control.** Chances are, whatever scroll speed I set is either too fast or too slow depending on reading speed. To grant some measure of control back, I added a line of CSS that pauses the animation on-hover. 
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

While I'm okay with my implementation of a passably functional marquee, the argument against their typical usage is sound. My intent in writing this down is to put my thought process into words. Otherwise, it all tends to slip into a void of [[design decisions]] I can't quite articulate. Hopefully, this keeps the door open to other options should I end up weighing it in my head more over time.