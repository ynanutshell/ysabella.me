---
published: true
slug:
title: Using Obsidian as a CMS
description:
type: notes
subtype:
cover:
tags:
  - obsidian
  - cms
  - writing
planted: 2026-05-20T10:52:00
tended: 2026-05-21T18:59:52+08:00
---
I started using Obsidian earlier in the year and very quickly played with the idea of publishing some of my personal notes to a digital garden—from unfinished drafts, working notes, and bookmarks of interesting finds. This entry is a work-in-progress on the technical side of starting a digital garden and how I went about setting up Obsidian as a CMS. Here are some of the points I'll try to include:

- For a long time, I've been drawn to the idea of using a note taking tool as a personal knowledge base and content management system, from back when I used [TiddlyWiki](https://tiddlywiki.com/) for gaming notes and then when I hosted the first iteration of my online portfolio on [Notion](https://ynanutshell.com).
- **Syncing through iCloud.** I tried [symlinks](https://macsecurity.net/view/541-create-remove-symlink-mac), [hard links](https://web.archive.org/web/20071018024615/http://www.mikerubel.org/computers/rsync_snapshots/), and finally a prebuild script to keep content synced between iCloud and production.
- **Community plugins** to achieve automatic timestamp updates and word count tracking: I tried [Templater](obsidian://show-plugin?id=templater-obsidian) and [Dataview](obsidian://show-plugin?id=dataview) and ended up going with [Update time on edit](obsidian://show-plugin?id=update-time-on-edit) and chained expressions to handle particulars like word count and reading time when I do need them.
- **Setting up templates via core plugins.** I set up a keyboard shortcut for easy access: <kbd>⌘</kbd> + <kbd>\\</kbd>, but actually using my templates for the first time was a little confusing. I tried inserting a template as a new note with the `Templates: Insert Template` command, then I settled with manually duplicating templates and dragging them out of my **templates** folder, before I finally realized I need a new note to insert a template into; today I learned.