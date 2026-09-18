---
title: "The Benefits of Using REM and EM in Responsive Web Design"
description: "Why you should stop using pixels for font sizes and spacing, and switch to relative units like REM and EM for better accessibility and responsiveness."
date: "2026-09-29"
---

## The Problem with Pixels

For a long time, web developers relied on pixels (px) to set typography and layout dimensions. While pixels offer precise control, they have a major flaw: they are absolute units. If a user has vision impairments and changes their browser's default font size from 16px to 24px, a website with fonts hardcoded to 14px will remain at 14px, making it unreadable for them.

## What is REM?

REM stands for 'Root EM'. It is a relative unit that is based on the font size of the root element (the `<html>` tag). By default, most browsers set the root font size to 16px. So, `1rem` equals 16px. If you set a paragraph's font size to `1.5rem`, it evaluates to 24px. The beauty of REM is that if the user changes their default browser font size, your entire website scales proportionally.

## What is EM?

EM is also a relative unit, but instead of being relative to the root element, it is relative to the font size of its direct parent element. If a `<div>` has a font size of 20px, an element inside it with `1.5em` will be 30px. EM is extremely useful for modular components, such as buttons, where you want the padding and margins to scale relative to the button's font size.

## When to Use Which

A common best practice is to use REM for global typography (headings, paragraphs) and layout spacing (margins between major sections). Use EM for localized, component-level sizing where elements need to scale proportionally to their immediate context. Avoid using pixels for anything other than small borders or fixed-size shadows.

## Converting px to rem

Calculating REM values in your head can be tedious (e.g., 21px / 16px = 1.3125rem). To save time, you can use our free PX to REM Converter to instantly translate pixel values into their relative unit equivalents.

## Technical Considerations

## The Problem with Pixels

For a long time, web developers relied on pixels (px) to set typography and layout dimensions. While pixels offer precise control, they have a major flaw: they are absolute units. If a user has vision impairments and changes their browser's default font size from 16px to 24px, a website with fonts hardcoded to 14px will remain at 14px, making it unreadable for them.

## What is REM?

REM stands for 'Root EM'. It is a relative unit that is based on the font size of the root element (the `<html>` tag). By default, most browsers set the root font size to 16px. So, `1rem` equals 16px. If you set a paragraph's font size to `1.5rem`, it evaluates to 24px. The beauty of REM is that if the user changes their default browser font size, your entire website scales proportionally.

## What is EM?

EM is also a relative unit, but instead of being relative to the root element, it is relative to the font size of its direct parent element. If a `<div>` has a font size of 20px, an element inside it with `1.5em` will be 30px. EM is extremely useful for modular components, such as buttons, where you want the padding and margins to scale relative to the button's font size.

## When to Use Which

A common best practice is to use REM for global typography (headings, paragraphs) and layout spacing (margins between major sections). Use EM for localized, component-level sizing where elements need to scale proportionally to their immediate context. Avoid using pixels for anything other than small borders or fixed-size shadows.



## Best Practices

## What is EM?

EM is also a relative unit, but instead of being relative to the root element, it is relative to the font size of its direct parent element. If a `<div>` has a font size of 20px, an element inside it with `1.5em` will be 30px. EM is extremely useful for modular components, such as buttons, where you want the padding and margins to scale relative to the button's font size.

## When to Use Which

A common best practice is to use REM for global typography (headings, paragraphs) and layout spacing (margins between major sections). Use EM for localized, component-level sizing where elements need to scale proportionally to their immediate context. Avoid using pixels for anything other than small borders or fixed-size shadows.

