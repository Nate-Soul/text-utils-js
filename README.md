# text-utils-js

## Overview

This repository contains two useful functions, `generateSlug()` and `makeExcerpt()`, that can simplify certain text operations in your JavaScript projects. This document provides an overview of these functions and explains how to use them effectively.

## Table of Contents
- [Functions](#functions)
  - [generateSlug()](#generateslug)
  - [makeExcerpt()](#makeexcerpt)
- [Usage](#usage)
  - [Generating Slugs](#generating-slugs)
  - [Creating Excerpts](#creating-excerpts)

## Functions

### `generateSlug()`

The `generateSlug()` function converts a given string into a URL-friendly slug. It removes non-alphanumeric characters, converts the string to lowercase, replaces spaces with a specified delimiter, and trims any leading or trailing delimiters.

**Syntax:**

const slug = generateSlug(string, delimiter = "-", unwanted_keywords = ["and", "of"]);

Parameters:

string: The input string to generate a slug from.
delimiter (optional): The character(s) used to separate words in the slug. Default is "-".
unwanted_keywords (optional): An array of keywords to be removed from the slug. Default is ["and", "of"].

Returns:

A string representing the generated slug.

### `makeExcerpt()`
The makeExcerpt() function generates a shortened excerpt from a given text. It truncates the text to a specified length and appends an ellipsis if necessary.

**Syntax:**
const excerpt = makeExcerpt(string, len = 50);

Parameters:

string: The input text to create an excerpt from.
len (optional): The maximum length of the excerpt. Default is 50.
Returns:

A string representing the generated excerpt.
Usage
Generating Slugs
To generate a slug from a string, call the generateSlug() function and provide the input string as the first argument. Optionally, you can specify the delimiter and unwanted keywords.

const slug = generateSlug("Hello World!"); // Output: "hello-world"

const slug = generateSlug("Hello World!", "_", ["world"]); // Output: "hello"

Creating Excerpts
To create an excerpt from a text, use the makeExcerpt() function and pass the input text as the first argument. You can also specify the desired length of the excerpt.

Remember to import or include these functions in your JavaScript project before using them.
