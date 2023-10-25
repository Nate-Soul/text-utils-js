# text-utils-js

## Overview

# Dynamic Slug and Excerpt Generator

This JavaScript code is a dynamic utility for generating slugs and excerpts based on user inputs in a web form. It is designed to enhance the user experience when creating content, such as articles or blog posts.

## Features

- **Slug Generation**: When a title is entered into the "Title" field, the code automatically generates a URL-friendly slug in the "Slug" field. This slug is created by converting the title to lowercase, removing non-alphanumeric characters, and applying customizable transformations such as removing unwanted keywords and replacing spaces with a specified delimiter.

- **Excerpt Creation**: When the focus is removed from the "Body" field, the code generates an excerpt in the "Excerpt" field. The excerpt is created by trimming the body text and limiting its length to a specified character count, with an optional ellipsis at the end.

- **Customization**: The code allows customization of the slug generation by specifying whether to allow or disallow non-ASCII characters, defining unwanted keywords to be removed from slugs, and selecting the delimiter for slug creation.

This JavaScript code contains two key functions, `generateSlug` and `makeExcerpt`, for text manipulation. These functions can be integrated into various web applications and services to enhance text processing and formatting.

## `generateSlug` Function

The `generateSlug` function is used for generating slugs from text, which are typically used in URLs for cleaner and SEO-friendly links. It provides several features:

- **Normalization**: It normalizes the input text by converting it to lowercase, removing non-alphanumeric characters, and dealing with whitespace.

- **Keyword Removal**: You can specify a list of unwanted keywords that should be removed from the slug. These keywords are removed as standalone words.

- **Delimiter Handling**: The function ensures consistent usage of a specified delimiter (default is "-"). It replaces spaces and repeated delimiters with a single delimiter and strips leading and trailing delimiters.

- **Unicode Support**: It optionally converts non-ASCII characters to their closest ASCII equivalents for compatibility (set `allowUnicode` to `true` to enable this feature).

## Usage:

```javascript
const slug = generateSlug("Sample Slug Generator", false, ["and", "of"], "-");
```
## `makeExcerpt` Function

The `makeExcerpt` function is designed to create excerpts from text, particularly useful for summarizing longer content. Key features include:

- **Text Trimming**: It trims the input text to a specified length (default is 50 characters) while ensuring words are not cut off abruptly.

## Usage:

```javascript
const excerpt = makeExcerpt("This is a long piece of text that will be trimmed into an excerpt.");
```

## Note:

These functions are versatile and can be used in various web applications, such as content management systems or blog platforms, to automate the generation of slugs for articles and create concise excerpts for previews.
