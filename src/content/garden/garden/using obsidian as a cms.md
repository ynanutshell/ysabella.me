---
published: true
slug:
title: Using Obsidian as a CMS
description:
type: notes
subtype: process
cover: obsidian-as-cms.png
alt: Onboarding dashboard of the Obsidian app, featuring a quickstart button and multiple methods to create or open a vault.
tags:
  - cms
  - obsidian
  - website
  - writing
planted: 2026-05-20T10:52:00
tended: 2026-06-02T03:44:23+08:00
---
I started using [Obsidian](https://obsidian.md/) again early this year, now that I’m fully indoctrinated into the Apple ecosystem and syncing across devices is as easy as storing everything in iCloud. Since then, I very quickly played with the idea of publishing some of my thoughts to a [[on starting a digital garden|digital garden]].

I've long been drawn to the concept of using one form of note taking software or another as a content management system. From the day I set up a [TiddlyWiki](https://tiddlywiki.com/) for personal gaming notes <span class="subtle">(lol)</span> to when I hosted the first ever iteration of my online portfolio on [Notion](https://ynanutshell.com). 

## Selection Criteria
There are a few considerations that I kept in mind when choosing between platforms to write on and, eventually, to build a CMS from. It's safe to say this extends to how I decide on software in general!

### No subscription models.
It's important to me that I'm not forced into a subscription plan to retain access to basic functionality and (more importantly) my own content. If times are lean, subscriptions are the very first thing I cut down on and they're generally just a pain to keep track of. I've made it a point to simply look for alternatives if something is locked behind monthly payments.

But, I’m cheap and willing to put in the extra legwork to not shell out if I don’t have to. When it comes to supporting software I do use and enjoy, my preference leans towards: one-time purchases, flexible donations, and regional/accessible pricing. Ultimately, having multiple ways to support makes *being* able to support easier.

### Customization and flexibility.
I'm a big fan of tools that allow for a full range of customization and flexibility. This usually includes features like exposed properties, theming, and add-ons to expand (or go beyond) existing functionality. Whole communities are built on being able to personalize to individual style and different use cases!

### File ownership.
This ties into not being locked [[using obsidian as a cms#No subscription models|behind a subscription]]. Any content I create and serve through an external service, I should have the option to pull out at any time—without having to file a request that takes an indefinite amount of time. This serves two purposes: reusability and accessibility. Files should always be in a universal format that is usable outside of any one service[^1].

Obsidian has more or less met a lot of the criteria above for me! Plus points for a mobile app that has all the functionality of the desktop app. Sometimes, it's just easier to jot something down from a smaller screen, with no room for distractions.

## My personal setup
… is rather lean and basic. I haven't fully explored customizing beyond a few essentials to keep things lean, but that could change over time! I currently have three vaults for different purposes:

<div class="row start wrap">
	<div class="card column lg vertical stretch">
		<h4>Personal</h4>
		<p class="subtle">This vault holds my ideas, writing exercises, and daily journal entries, though I admittedly haven't done a great job of maintaining the habit.</p>
	</div>
	<div class="card column lg vertical stretch">
		<h4>Professional</h4>
		<p class="subtle">Most of my work notes (e.g. case studies, job search, and old projects) are still stored in Notion, but I'm in the process of slowly migrating over.</p>
	</div>
	<div class="card column lg vertical stretch">
		<h4>Garden</h4>
		<p class="subtle">This vault is what my CMS is built out of! It stores all the content from my <a aria-label="Link to garden" href="/garden">digital garden</a>, along with unpublished drafts I'm still working on.</p>
	</div>
</div>

I’ve installed a few small community plugins, mostly to keep my writing experience clean and intuitive. The running list of my current plugin setup so far:
<div class="row start wrap">
	<div class="card column lg vertical stretch">
		<div class="datapoint">
			<a href="https://github.com/automattic/harper-obsidian-plugin"><h4>Harper</h4></a>
			<p class="caption">By <a class="emphasis" href="https://github.com/automattic">Elijah Potter</a></p>
		</div>
		<p>Private grammar checking engine that runs offline and directly within Obsidian.</p>
	</div>
	<div class="card column lg vertical stretch">
		<div class="datapoint">
			<a href="https://github.com/hasanyilmaz/hide-sidebars"><h4>Hide Sidebars</h4></a>
			<p class="caption">By <a class="emphasis" href="https://github.com/hasanyilmaz">@hasanyilmaz</a></p>
		</div>
		<p>Auto-hide controls for sidebars that makes me happy as a Zen browser user.</p>
	</div>
</div>
<div class="row start wrap">
	<div class="card column lg vertical stretch">
		<div class="datapoint">
			<a href="https://github.com/coignard/obsidian-scroller"><h4>Scroller</h4></a>
			<p class="caption">By <a class="emphasis" href="https://github.com/coignard">René Coignard</a></p>
		</div>
		<p>Simple typewriter/focus mode plugin that dims text outside my current focus.</p>
	</div>
	<div class="card column lg vertical stretch">
		<div class="datapoint">
			<a href="https://github.com/mgmeyers/obsidian-smart-typography"><h4>Smart Typography</h4></a>
			<p class="caption">By <a class="emphasis" href="https://github.com/mgmeyers">@mgmeyers</a></p>
		</div>
		<p>Automatically converts quotes, dashes, and multiple periods.</p>
	</div>
</div>
<div class="row start wrap">
	<div class="card column lg vertical stretch">
		<div class="datapoint">
			<a href="https://github.com/beaussan/update-time-on-edit-obsidian"><h4>Update time on edit</h4></a>
			<p class="caption">By <a class="emphasis" href="https://github.com/beaussan">@beaussan</a></p>
		</div>
		<p>Exposes the modified time of each file so I can refer to it through the frontmatter.</p>
	</div>
</div>

 I explored a couple more advanced plugins, like [Templater](obsidian://show-plugin?id=templater-obsidian) and [Dataview](obsidian://show-plugin?id=dataview),  to expose file timestamps and word count. But I ended up simplifying with [Update time on edit](obsidian://show-plugin?id=update-time-on-edit) and using chained expressions to handle particulars like word counts when I do need them.
 
## As a Content Management System
Full disclaimer that my setup is still a bit of a mess and work-in-progress, which works for me because that gives me full control over layout and styling. My goal is to slowly and continuously build it out over time, as I write more entries into my modest garden and notice anything out of place along the way. With that said, I did hit a few snags while setting up Obsidian as a CMS, but there are a few tricks that have worked for me.

### Syncing content.
I went through a number of different methods in order to keep my content synced between my garden vault (stored in iCloud) and local working directory. Initially, I tried a simple `Make Alias` via the macOS context menu, but neither Obsidian nor VS Code (my choice of code editor) recognized it as a valid file.

#### Symbolic links.
Next, I looked into [symbolic links](https://en.wikipedia.org/wiki/Symbolic_link) (or symlinks), which has limitations and is generally not recommended[^2], but I have seen a few working instances with the [same](https://www.ssp.sh/brain/add-external-folders-git-blog-book-to-my-obsidian-vault-via-symlink/) [exact](https://www.mandalivia.com/obsidian/obsidian-with-astro-for-personal-site/#step-4-connecting-obsidian-to-astro-with-symlinks) [purpose](https://bryanhogan.com/blog/astro-obsidian) in mind. My attempts looked something like:

```json
ln -s <cloud-based vault path> <local repo path>
```

I added a symlink of my vault `iCloud/Obsidian/garden` to my working directory `src/content` first, which does allow linked content to be fully viewable and editable in VS Code. Unfortunately, Git only checks it out as a small, flat file[^3] and not the full directory from my vault.

```json
ln -s <local repo path> <cloud-based vault path>
```
I then tried reversing the logic: transfer the vault over to my working directory and leave a symlink in its place. I didn’t think this one through lol. I ended up learning *while* I was out that I couldn’t access my vault on my phone, thanks to all the actual data being on my computer.

> [!NOTE] A small note
> Alternatively, I considered storing my entire working directory as an iCloud-based vault to avoid having to sync them altogether. A [quick search](https://discussions.apple.com/thread/253527805) warns against mixing git with cloud-based version control, so that dissolved the thought.

#### rsync script.
Eventually, I landed on setting up an `rsync` script that syncs content from my vault while ignoring Obsidian-specific configuration, like templates and plugins.
```json
rsync -av --delete --exclude='.obsidian/' --exclude='plugins/' --exclude='templates/' --include='*/' --include='*.md' --exclude='*' \"$GARDEN_PATH/\" src/content/garden/
```
It’s hacky and not the most convenient method. It also means I can’t push content changes directly from my phone. But it does the job reliably and I’m usually wrapping up any writing on my computer anyway, because of styling I have to tweak along the way.

### Custom properties and templates
My properties are set up pretty similarly to standard Obsidian-published setups. I might rework things or add more over time as I move away from something blog-like and towards a truer garden setup. For now, I have templates for two different content types I have so far: writing and bookmarks.

#### Writing
- **`Published`** A toggle I use to filter out entries that should or shouldn’t be visible on my site.
- **`Slug`** Optional field for instances where I want to set a custom slug.
- **`Title`** The headline seen at the head of the article. This also dictates the OpenGraph title.
- **`Description`** Optional field to describe the body of content. Otherwise, the first 160 characters are pulled from the start of the entry.
- **`Type`** Categorizes the entry. Also serves to filter out `bookmarks`.
- **`Subtype`** Further distinguishes entries beyond `type`.
- **`Cover`** Both the header image above and OpenGraph image are pulled from this property.
- **`Tags`** Any further identifiers or categories I can think of go here.
- **`Planted`** This is updated by the plugin `Update time on edit` once on initial file creation. Set to my local timezone (GMT+8).
- **`Tended`** This is updated by the plugin `Update time on edit` when any changes are made to the file. Set to my local timezone (GMT+8).
#### Bookmarks
- **`Published`** See above.
- **`Title`** Generally the title taken from the bookmarked link.
- **`Type`** Identifies `bookmarks` against anything else that would fall under `writing`.
- **`Subtype`** Sets the bookmark category, shown at the end of the line.
- **`URL`** Where the bookmark links to.
- **`Via`**[^4] Optional field to provide the original source.
- **`Source`** Adds a link to the source label `Via`. 
- **`Planted`** Not shown, but nice to have.
- **`Tended`** Not shown, but nice to have.

I set up a keyboard shortcut for easy access to both templates and any more I might add: <kbd>⌘</kbd> + <kbd>\\</kbd>. Funnily enough, actually using templates for the first time was a little confusing. 

I first tried inserting a template as a new note with the `Templates: Insert Template` command, which seemingly did nothing. Then I settled with manually duplicating templates and dragging them out of my **templates** folder, which didn’t seem right. Then I finally realized I needed a note to actually *insert* a template into.

### Parsing Markdown to HTML.
Astro handles most Markdown conversion and formatting straight out of the box, except for a few things like wikilinks that I had to filter for manually. Otherwise, it’s mostly a matter of me accounting for edge cases I haven’t found the need to style yet… until I do. That usually ends up looking like me writing this entry and, on the side, restyling footnotes as I go, which is something I’ll continue to do over time.

[^1]: Steph Ango (CEO of Obsidian, coincidentally) writes about the philosophy “[file over app](https://stephango.com/file-over-app)”.
[^2]: Obsidian has an entire page listing the [limitations and potential risks of using symlinks](https://obsidian.md/help/symlinks).
[^3]: I particularly appreciated [this breakdown](https://stackoverflow.com/a/18791647) on how Git treats symbolic links.
[^4]: An idea borrowed from [Luke Mitchell](https://interroban.gg/colophon/post/via/).