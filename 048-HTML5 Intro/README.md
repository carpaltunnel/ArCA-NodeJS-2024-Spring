# HTML5
https://www.tutorialspoint.com/html5/html5_overview.htm
History : HTML (blech), XHTML (better), HTML5

New stuff :
  New elements (header, footer, section)
  Form improvements
  Local storage (important!)
  Canvas (important!)
  Web sockets
  Server sent events
  Audio/video embeds
  Geolocation
  Drag and drop

Backwards compatible (as much as possible)

NOTE : White space and CR/LF's are compacted or ignored by default.


## A quick chat about browser support...
Compatibility website/chart - https://caniuse.com/

Many web developers over the years have had to suffer with the curse of Internet Explorer 6.  Microsoft chose not to follow standards and directly contributed to an unquantifiable number of developer rage and tears throughout history.  Luckily, you're learning HTML at a time when the major browsers have agreed to use the standard and therefore you can generally write a single HTML page and expect it to work correctly in all major browsers.

## Tags Intro
HTML "tags" are elements that define the content of page and how they should be structured.  Tags are composed of angle brackets `<>` with a type and, usually, properties (attributes) that define information about the tag.

For the most part, you will have a "opening" tag and later a "closing" tag.  The opening tag is simply the tag text where the closing tag is similar but begins with a forward slash.  However, not all tags require a separate open and close.  Some (like `img` in the example below) can be "self closing".  In HTML5, closing tags are not required for empty elements.  Self-closing tags are supported but not required in HTML5.

Attributes (properties) are key/value pairs where the key is not quote enclosed by the value is.  The `src` attribute in the `img` tag below is a simple example of this.

Tags are not case sensitive but the values assigned to their attributes can be, depending on how you use them.  Generally, all of your tags should be lowercase by convention.  However, it is generally accepted for the DOCTYPE tag (discussed below in "Metadata) to be uppercase.

Any text that falls outside of the tag angle brackets is treated as plain text and displayed to the user.  

```html
<div>This is my div</div>
<img src="image1.png" />
<img src="image2.png">
```

## Metadata
All HTML documents must start with a "DOCTYPE" tag that indicates the type of the document that follows.  This tells the browser how to interpret the HTML.  Older standards like HTML4 and XHTML required long declarations that referred to a Document Type Definition (DTD) as can be seen below.  HTML5 uses a much simpler doctype of "html".  Line #1 is HTML4, line #2 is XHTML, and line #3 is HTML5
```html
 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
 <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
 <!DOCTYPE html>
```

The `meta` tag defines other metadata about your page and should be located in the `head` section of your document (discussed below).  The most common meta tag you should use specifies the character set of your page.  For the most part, this will always be UTF-8 :
```html
<meta charset="UTF-8">
```

Other common, but perhaps less important, meta tags are shown below :
```html
<meta name="description" content="Free Web tutorials">
<meta name="keywords" content="HTML, CSS, JavaScript">
<meta name="author" content="John Doe">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Comments
Like most languages, we have the ability to define comments in HTML.  Comments will be ignored by the interpreter and therefore have no effects on the document.  Comments are indicated by a tag that begins with `<!--` and ends with `-->` like so :
```html
<!-- This is a comment and will be ignored -->

<!-- These comments
  can span
  multiple
  lines -->
```

## Inline versus Block Tags
Tags that display to the user generally have one of two types : Inline or Block.

The names are pretty descriptive of how they work.  An "inline" tag can be used inline with other text or tags and simply defines a small container that can have other uses or properties.  You can think of inline tags kind of like parentheses in a sentence (like this) that define some other bit of information without starting a new sentence.  The simplest difference between an inline tag and a block tag is that inline tags do not generate a new line to claim their area of the screen.

Block type tags indicate a separate container that has a well defined area of responsibility on the page.  These are easily seen because they usually generate a new line and claim a "block" of the page.

Note : You can not natively define whether a tag is an inline or block type in HTML.  They simply are the type they are and you are expected to know which tags belong to which type.  However, we can change this behavior with styles as we'll see in future lessons.

## Standard / Old Tags
Below are HTML tags that have been around for a very long time and you may already be familiar with.  

1. html
2. head
   1. title
   2. meta
3. p - Paragraph, block container
4. span - Inline section
5. div - Divider, block container
6. br - Break tag (line break)
7. h - HTML headings.  h1 through h6 are available with h1 being the largest and h6 being the smallest.
8. img - Image tag
9. a / href - Anchor tag.  Typically used for creating hyperlinks to other pages but also for on-page navigation
10. strong - Strong text (bold)
11. em - Emphasized text (italic)
12. link - Links to an external resource (not a hyperlink).  Generally used for including stylesheets.
13. script - Used to embed client side scripts (Javascript).  This can be inline code or a reference to a separate JS document.
14. ul / ol - Unordered List / Ordered List
    1.  li - List Item
15. table - Only use this for tabular data, not for page layout.
16. form - Defines a form that will accept user input and performs some action
17. input - An input control that accepts user input.  They are many different types, listed below.
    1.  text
    2.  password
    3.  checkbox
    4.  radio
    5.  submit
    6.  file
    7.  image
    8.  hidden
    9.  select
    10. textarea
    11. button




## Standard Attributes
Attributes are key value pairs that can be applied to HTML elements to affect their behavior.
A lot of these attributes affect the display style of HTML elements and can/should be ignored once we get to Cascading Style Sheets (CSS).  The two most important attributes that we'll use to apply styles with CSS are `id` and `class`.

Keep accessibility in mind with tags like `alt` and `title` that will allow screen readers to accurately describe your page.

Below is a small subset of common standard attributes.  A full list of attributes, along with the elements they are applicable to, can be found on the [W3C Attributes page](https://www.w3schools.com/tags/ref_attributes.asp).

1. accesskey - Keyboard shortcut to reference the element
2. align
3. alt - Alternate text for an image, area, or input.  Displayed when the image can't load or for screen readers.
4. background - Background image
5. bgcolor - Removed in HTML5
6. class - One or many class names
7. contenteditable - Boolean to indicate if the element is editable
8. data-* - Developer defined data properties
9. draggable
10. height
11. hidden
12. id - Unique identifier
13. rel - Defines relationship to the linked document
14. spellcheck
15. src
16. style - Inline CSS style (avoid and use a style sheet where possible)
17. tabindex
18. title - Used for tool tips and potentially screen readers.  Works on any element.
19. type - Type of the element
20. valign
21. value - Sets the value of the element
22. width


## New Tags, Types, and Attributes
HTML5 introduces several new tags that can be used in your projects.  The majority of them can be treated as simply specialized `div` tags.  If you've already been creating `div`s that function as articles, sections, headers, footers, nav bars, etc then you won't see much difference between that and using the new tags that are specifically dedicated for those purposes.

1. section - Defines a section in a document
2. article - Self contained article section that should be independent of the rest of the content
3. aside - An aside to the content it is adjacent to
4. header - Page header
5. footer - Page footer
6. nav - Navigation container
7. dialog - Dialog box or modal window
8. figure - Self contained graphical content
9. output - Output/result from a calculation
10. svg - Container for SVG graphics

New Input Types : 
1. datetime
2. datetime-local
3. date
4. month
5. week
6. time
7. number
8. range
9. email
10. url

New Attributes : 
1. placeholder
2. autofocus
3. required

## Tag Hierarchy
HTML is a hierarchal model where the `<html>` is the root and all other elements fall below it at some level.
```html
<html>
  <head>
    <title>Page Title</title>
    <meta charset="UTF-8">
  </head>

  <body>
    <div id="main">
      Content goes here.
    </div>
  </body>
</html>
```

## Validation
There are a variety of HTML5 validators to be found online.  I tend to use the [W3C Markup Validation Service](https://validator.w3.org/).

It provides three options for validation : 
1. Validate by URI - If your HTML is hosted publicly then you can provide the address to the validator.  It will fetch the HTML from the public resource and apply validation to it.
2. Validate by File Upload - If your HTML is not hosted publicly you can upload the HTML file directly for validation.
3. Validate by Direct Input - Similar to #2, you can copy and paste HTML into this option and have it validated.  I typically use this for small pages but switch to the file upload method once they start getting large.


## HTML(5) Events
HTML events are hooks that allow us to invoke Javascript when certain things (events) occur.  Events are the most basic form of making static HTML pages dynamic by reacting to user input.  It's good to know these for very simple pages or "just in case" but we'll be able to avoid using most of these explicitly once we start working with Angular.

A large percentage of these events relate directly to streaming media which you may not need to deal with.  If that's true, then they can be ignored but remember that they exist if you ever need them.

We'll cover the most common ones in more detail in the next lesson.

1. offline - Triggers when the document goes offline
2. onabort - Triggers on an abort event
3. onafterprint - Triggers after the document is printed
4. onbeforeonload - Triggers before the document loads
5. onbeforeprint - Triggers before the document is printed
6. onblur - Triggers when the window loses focus
7. oncanplay - Triggers when media can start play, but might has to stop for buffering
8. oncanplaythrough - Triggers when media can be played to the end, without stopping for buffering
9. onchange - Triggers when an element changes
10. onclick - Triggers on a mouse click
11. oncontextmenu - Triggers when a context menu is triggered
12. ondblclick - Triggers on a mouse double-click
13. ondrag - Triggers when an element is dragged
14. ondragend - Triggers at the end of a drag operation
15. ondragenter - Triggers when an element has been dragged to a valid drop target
16. ondragleave - Triggers when an element leaves a valid drop target
17. ondragover - Triggers when an element is being dragged over a valid drop target
18. ondragstart - Triggers at the start of a drag operation
19. ondrop - Triggers when dragged element is being dropped
20. ondurationchange - Triggers when the length of the media is changed
21. onemptied - Triggers when a media resource element suddenly becomes empty.
22. onended - Triggers when media has reach the end
23. onerror - Triggers when an error occur
24. onfocus - Triggers when the window gets focus
25. onformchange - Triggers when a form changes
26. onforminput - Triggers when a form gets user input
27. onhaschange - Triggers when the document has change
28. oninput - Triggers when an element gets user input
29. oninvalid - Triggers when an element is invalid
30. onkeydown - Triggers when a key is pressed
31. onkeypress - Triggers when a key is pressed and released
32. onkeyup - Triggers when a key is released
33. onload - Triggers when the document loads
34. onloadeddata - Triggers when media data is loaded
35. onloadedmetadata - Triggers when the duration and other media data of a media element is loaded
36. onloadstart - Triggers when the browser starts to load the media data
37. onmessage - Triggers when the message is triggered
38. onmousedown - Triggers when a mouse button is pressed
39. onmousemove - Triggers when the mouse pointer moves
40. onmouseout - Triggers when the mouse pointer moves out of an element
41. onmouseover - Triggers when the mouse pointer moves over an element
42. onmouseup - Triggers when a mouse button is released
43. onmousewheel - Triggers when the mouse wheel is being rotated
44. onoffline - Triggers when the document goes offline
45. online - Triggers when the document comes online
46. ononline - Triggers when the document comes online
47. onpagehide - Triggers when the window is hidden
48. onpageshow - Triggers when the window becomes visible
49. onpause - Triggers when media data is paused
50. onplay - Triggers when media data is going to start playing
51. onplaying - Triggers when media data has start playing
52. onpopstate - Triggers when the window's history changes
53. onprogress - Triggers when the browser is fetching the media data
54. onratechange - Triggers when the media data's playing rate has changed
55. onreadystatechange - Triggers when the ready-state changes
56. onredo - Triggers when the document performs a redo
57. onresize - Triggers when the window is resized
58. onscroll - Triggers when an element's scrollbar is being scrolled
59. onseeked - Triggers when a media element's seeking attribute is no longer true, and the seeking has ended
60. onseeking - Triggers when a media element's seeking attribute is true, and the seeking has begun
61. onselect - Triggers when an element is selected
62. onstalled - Triggers when there is an error in fetching media data
63. onstorage - Triggers when a document loads
64. onsubmit - Triggers when a form is submitted
65. onsuspend - Triggers when the browser has been fetching media data, but stopped before the entire media file was fetched
66. ontimeupdate - Triggers when media changes its playing position
67. onundo - Triggers when a document performs an undo
68. onunload - Triggers when the user leaves the document
69. onvolumechange - Triggers when media changes the volume, also when volume is set to "mute"
70. onwaiting - Triggers when media has stopped playing, but is expected to resume

## Class Demo
Create a new HTML5 page with the following components, test, and ensure it passes validation : 
1. Title
2. Body
3. Top header (large)
4. Div to contain the main content
   1. Strong text
   2. Emphasized text
   3. A span with text color set to red
   4. Image (with alt/caption)
   5. Link to another page
   6. Ordered list
   7. Unordered list
5. A separate div to contain a form (method POST, empty action) with the following inputs :
   1. Text input
   2. Radio input with three options
   3. Checkbox input
   4. Datetime input
   5. Email input
   6. Submit button