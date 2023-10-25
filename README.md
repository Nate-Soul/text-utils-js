# text-utils-js

## Overview

# Dynamic Slug and Excerpt Generator

This JavaScript code is a dynamic utility for generating slugs and excerpts based on user inputs in a web form. It is designed to enhance the user experience when creating content, such as articles or blog posts.

## Features

- **Slug Generation**: When a title is entered into the "Title" field, the code automatically generates a URL-friendly slug in the "Slug" field. This slug is created by converting the title to lowercase, removing non-alphanumeric characters, and applying customizable transformations such as removing unwanted keywords and replacing spaces with a specified delimiter.

- **Excerpt Creation**: When the focus is removed from the "Body" field, the code generates an excerpt in the "Excerpt" field. The excerpt is created by trimming the body text and limiting its length to a specified character count, with an optional ellipsis at the end.

- **Customization**: The code allows customization of the slug generation by specifying whether to allow or disallow non-ASCII characters, defining unwanted keywords to be removed from slugs, and selecting the delimiter for slug creation.

## Usage

Integrate this code into your web forms for content creation, such as articles, blog posts, or any other content that requires slugs and excerpts. Here's a sample HTML structure for using this code:

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Add CSS styling for input fields and elements -->
</head>
<body>
    <input id="title" type="text" placeholder="Title">
    <input id="slug" type="text" placeholder="Slug">
    <textarea id="body" placeholder="Body"></textarea>
    <textarea id="excerpt" placeholder="Excerpt"></textarea>

    <script src="slug-and-excerpt-generator.js"></script>
</body>
</html>

