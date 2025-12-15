# Text Tools by NateSoul

A lightweight collection of practical text utilities built with plain HTML, CSS, and vanilla JavaScript. Designed to solve common text problems with a clean UI, instant feedback, and zero dependencies.

Live site:
[https://texttoolsbynatesoul.netlify.app/](https://texttoolsbynatesoul.netlify.app/)

---

## Overview

**Text Tools by NateSoul** is a small web app that groups multiple focused text tools under a single landing page. Each tool is accessible from the home screen and runs entirely in the browser without frameworks or external libraries.

The goal is simple:
**fast, useful text tools with no setup and no distractions.**

---

## Available Tools

### 1. Slugifier

A tool for converting text into clean, URL-safe slugs.

#### Use cases

* Blog post URLs
* CMS slugs
* SEO-friendly links
* API endpoints

#### Features

* Input field for original text
* Delimiter selection (e.g. dash)
* Toggle options:

  * Remove numbers
  * Allow Unicode characters
  * Exclude stop words
* Built-in stop word list displayed as removable chips
* Ability to add custom stop words using comma-separated values
* Live generated slug output
* Copy-to-clipboard button
* Reset form action

All transformations happen instantly in the browser.

---

### 2. Excerpt Maker

A tool for generating short excerpts from long-form content.

#### Use cases

* Blog previews
* Meta descriptions
* Content cards
* Summaries

#### Features

* Large text area for original content
* Character counter (up to 5,000 characters)
* Target word count slider
* Excerpt type options:

  * Smart Detection (breaks at sentence boundaries)
  * Fixed Length (cuts at exact word count)
* Optional settings:

  * Add ellipsis (...)
  * Preserve formatting
* Generated excerpt output
* Copy-to-clipboard button
* Statistics:

  * Word count
  * Character count
  * Sentence count
  * Compression percentage

---

## Landing Page / Tool Switcher

The homepage acts as a **tool switcher**, allowing users to select and open any available tool from a single entry point.

There is no account system, onboarding flow, or configuration required. Tools are immediately usable.

---

## Tech Stack

* HTML
* CSS
* Vanilla JavaScript
* No frameworks
* No build tools
* No external APIs

The entire app runs client-side.

---

## Design Principles

* Keep tools focused and single-purpose
* Prefer clarity over feature overload
* Make everything work instantly
* Mobile-first and touch-friendly
* No dependencies unless truly necessary

---

## Deployment

The project is deployed on **Netlify** as a static site.

---

## Author

Built by **NateSoul**

Text Tools by NateSoul is an ongoing experiment in building small, useful tools with clean interfaces and minimal technology.