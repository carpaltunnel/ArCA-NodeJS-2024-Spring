# HTML5 with Javascript
HTML is static content that does not allow for dynamic changes/updates.  In order to make our HTML change and respond to user actions we need to use Javascript.  By this time, you should be very familiar with Javascript with Node.js on the server side but now we're going to use it on the client side.  One note of warning - since client side Javascript does **not** run in the Node.js engine, you are limited to only vanilla/core Javascript.  You will not be able to use Node.js core modules like File System (fs).  But, many of the third party libraries we use on the Node.js/server side are also available for client side usage.  The ability to use the same language, and often the same libraries, on both the server side and client side is one of the strengths of Javascript and, therefore, Node.js.

## The DOM (Document Object Model)
When a HTML web page is loaded by the browser, a Document Object Model (DOM, hereon) is created.  The DOM is a tree of objects that represent the HTML structure of the page.  We've seen how HTML is structured in a parent/child relationship of tags.  The DOM allows us to use that tree to find HTML elements and work with them.

While we have the ability to traverse the entire DOM tree manually, it is much more common to use `id` and `class` HTML attributes to directly access the elements we wish to find.  We can also use CSS selectors (discussed further in lesson 055 and 055.2) as a sort of query language to simplify our search.

Below is a visualized example of a simple DOM tree from [w3schools.com](https://w3schools.com)

![](slides/images/w3school-dom-tree.gif)

There are many great DOM visualizers.  The [DOM visualizer by bioub](http://bioub.github.io/dom-visualizer/) is a nice interactive visualizer that can help you learn how the DOM is built and maintained.

In client side Javascript, the DOM is referenced by the global `document` object.  We'll see how to use this object in the next section.

## Interacting with the DOM
In the previous lesson we briefly discussed the `<script>` HTML tag that allows us to embed Javascript in our HTML pages.  Now, we'll actually use that tag to interact with the DOM.  First, let's look at a simple example that executes the Javascript when the `<script>` tag is parsed by the browser.  The HTML has been truncated for readability but it is assumed that you would create a proper HTML document.
```html
<body>
  <script type="text/javascript">
    console.log('Script has been parsed!');
  </script>
<body>
```
When you load this example into a browser, the string "Script has been parsed!" will appear in the console when the browser finds and interprets our Javascript code.  You can see that this happened automatically on load because we provided a simple statement that will get executed as soon as it is read by the browser.

### Finding HTML Elements
Executing Javascript is all well and good, but we're talking about making our HTML more responsive so lets look at how to find, then inspect/change HTML elements.

The three functions we can use to get a reference to an HTML element are : 
1. `document.getElementById(id)`
2. `document.getElementsByTagName(tagName)`
3. `document.getElementsByClassName(className)`
4. `document.querySelectorAll(selector)` - We'll save this for the CSS lesson

The easiest way to find an element in the DOM is definitely by using the element's `id` attribute with the `getElementById()` function.  If you remember from the previous lesson, `id`s will be unique in a page so we know that for a specific `id` there should always only be one element associated with it.  We'll use the following example to demonstrate how to find unique `id` HTML elements with Javascript :

```html
<html>
  <body>
    <h1 id="example">Example Page</h1>
    <div id="content">
      This is the <span id="main" class="spanner">main content</span> of the <span id="page" class="spanner">page</span>.
    </div>
  </body>
</html>
```

You can see in the example above that we have four HTML elements with unique ids : 
1. h1 : example
2. div : content
3. span : main
4. span : page

We also have two HTML elements with class attributes `spanner`.  Both are `<span>` tags with different contents and different `id` attributes.

<a name="element-properties"></a>
Once we have found the HTML element we'll [have access to all of its properties](https://developer.mozilla.org/en-US/docs/Web/API/Element).  I'll briefly introduce the most commonly used ones here, then show examples of their usage in the future : 
1. attributes
2. children
3. classList
4. className
5. id
6. innerHTML 
7. outerHTML

We also have access to all the functions available on the element but we'll save that for a later discussion.

Now, let's use the `document.getElementById()` function to get a reference to these objects and access the `innerHTML` property to print the contents.
```html
<html>
  <body>
    <script type="text/javascript">
      const main = document.getElementById('main');
      console.log(`The contents of the tag with id='main' are : ${main.innerHTML}`);
    </script>
    <h1 id="example">Example Page</h1>
    <div id="content">
      This is the <span id="main" class="spanner">main content</span> of the <span id="page" class="spanner">page</span>.
    </div>
  </body>
</html>
```

When we load this HTML in our browser we see the following output to the console : `The contents of the tag with id='main' are : null`.  
... That doesn't seem right does it?  However, when we look at how the HTML is parsed into the DOM tree we'll see why it makes sense.  HTML is parsed sequentially from top to bottom.  So, at the time our Javascript is executed, the `div` and `span` tags contained with it haven't been parsed and therefore don't exist yet.  Therefore, we get `null`.  If we were to move our script after the `div` then we know that it has been parsed and the value should be available :

```html
<html>
  <body>
    <h1 id="example">Example Page</h1>
    <div id="content">
      This is the <span id="main" class="spanner">main content</span> of the <span id="page" class="spanner">page</span>.
    </div>
    <script type="text/javascript">
      const main = document.getElementById('main');
      console.log(`The contents of the tag with id='main' are : ${main.innerHTML}`);
    </script>
  </body>
</html>
```

Now, if we refresh the page we'll see the following output to the console : `The contents of the tag with id='main' are : main content`.  That's more like it.  Always keep the load order in mind when writing inline Javascript.  However, we will discuss ways to handle this more cleanly in the future.

Let's look at `getElementsByClassName()` while we're finding HTML elements in the DOM :
```html
<html>
  <body>
    <h1 id="example">Example Page</h1>
    <div id="content">
      This is the <span id="main" class="spanner">main content</span> of the <span id="page" class="spanner">page</span>.
    </div>
    <script type="text/javascript">
      const spanElements = document.getElementsByClassName('spanner');
      console.log(`There are ${spanElements.length} elements with class 'spanner' and their contents are :`);
      for (const el of spanElements) {
        console.log(`\t${el.innerHTML}`);
      }
    </script>
  </body>
</html>
```

You might expect the return of `document.getElementsByClassName('spanner')` to be an array, and therefore `spanElements` to be an array - I know I would.  However, it's actually an `HTMLCollection` class which is array-like, and iterable, but it is not truly an array.  Therefore, we can't use the array function `.forEach()` on it.  But, since it is iterable we can easily use `for... of` with it.

Similar to `getElementsByClassName()`, we can use `getElementsByTagName()` to find all HTML elements of a specific type of tag.  This is seldom useful in applications because you're likely to have many, many elements of the same tag type/name but it is presented here for completeness.

```html
<html>
  <body>
    <h1 id="example">Example Page</h1>
    <div id="content">
      This is the <span id="main" class="spanner">main content</span> of the <span id="page" class="spanner">page</span>.
    </div>
    <script type="text/javascript">
      const divElements = document.getElementsByTagName('div');
      console.log(`There is ${divElements.length} element with tag name 'div' and its contents are :`);
      for (const el of divElements) {
        console.log(`\t${el.innerHTML}`);
      }
    </script>
  </body>
</html>
```

Take note that `getElementsByTagName()` returns an `HTMLCollection` just like `getElementsByClassName()`.  Also, it contains the **innerHTML** of the element which includes any child tags.  Therefore, in the example above, the output is `This is the <span id="main" class="spanner">main content</span> of the <span id="page" class="spanner">page</span>.`

I'll mention `document.querySelectorAll(selector)` one more time since it provides a very powerful and flexible way of locating specific elements but we'll talk about CSS selectors in the CSS lesson (coming up soon) so I won't go into detail here.

### Modifying HTML Elements
Now that we know how to find HTML elements and retrieve their contents, let's look at how to change them.  Since `innerHTML` is a property of the HTML element, not only can we retrieve it, we can also modify it.

Lets locate the `main` span tag and replace its contents with something different.
```html
<html>
  <body>
    <h1 id="example">Example Page</h1>
    <div id="content">
      This is the <span id="main" class="spanner">main content</span> of the <span id="page" class="spanner">page</span>.
    </div>
    <script type="text/javascript">
      const main = document.getElementById('main');
      const originalContents = main.innerHTML;
      const newContents = 'good content';
      main.innerHTML = newContents;
      console.log(`The contents of the tag with id='main' were originally ${originalContents} but we changed it to : ${main.innerHTML}`);
    </script>
  </body>
</html>
```
In this example we used `document.getElementById()` to get a reference to the `span` tag with id `main`, stored the original innerHTML value in a new variable (`originalContents`), changed the innerHTML to be a new value of `good content`, then logged what we did to the console.  This method of locating a specific tag and changing its contents with Javascript can be used for any HTML tag.

While we replaced plain text with plain text, we saw earlier that `innerHTML` holds any HTML tags that are contained within the element as well.  Knowing that, we can also write HTML into the `innerHTML`, not just text.

We already talked about a few [element properties](#element-properties), there are also many [element functions](https://developer.mozilla.org/en-US/docs/Web/API/Element#methods) available but we're not go into much detail on them except when we need to use them.


## Events
Events in HTML/Javascript are similar to EventEmitters/EventListeners that we discussed previously.  We can attach events to HTML elements that trigger Javascript when certain behavior occurs.

### alert()
I want to take a quick detour to talk about the `alert()` function in client side Javascript.  While it has no valid modern applications that I can think of, being replaced by much more user friendly HTML modals, it can be mildly helpful for "shotgun" debugging when you're researching an issue.  The `alert()` function opens an alert box in the browser and takes focus from the page, forcing the user to interact with it before continuing.  Again, usage of `alert()` is generally considered poor design in favor of more modern alternatives but it can be used sparingly during research to determine when a certain event is triggered.  `console.log()` can fill the same niche but `alert()` is much more "in your face" and impossible to miss.  We'll use it in some of our examples below.

### Static / Hardcoded Events
We can easily attach events to HTML elements by referencing the event name as an attribute of the element and assigning it a value of the Javascript function to invoke.  All of the HTML attributes that define an event are prefixed with "on" to denote that when something happens, the following function should be invoked.  The most obvious is probably `onClick` but there are a multitude that can be helpful for different purposes.

HTML Event Attributes (most common) : 
1. onLoad - Fires when the page has completed loading
2. onUnload - Fires when the page has unloaded (closed, left, etc)
3. onFocus - Fires when the element receives focus
4. onBlur - Fires when the element loses focus
5. onChange - Fires when the value of the element changes
6. onSubmit - Fires when a form is submitted
7. onKeydown - Fires when a key is pressed down
8. onKeypress - Fires when a key pressed
9. onKeyup - Fires when a key is released
10. onClick - Fires when the mouse is clicked on a specific element
11. onDblclick - Fires when the mouse is double clicked on a specific element
12. onMousedown - Fires when the mouse button is pressed down on a specific element
13. onMouseup - Fires when the mouse button is released on a specific element
14. onMouseOver - Fires when the mouse pointer moves over a specific element


In the example below, we make use of the `onClick` event on the `h1` header.  When the header is clicked the Javascript `clicker()` function will be invoked and display an alert box.  This type of usage applies to all available events and is the most common application - invoke a Javascript function when the event occurs.

```html
  <body>
    <h1 id="example" onClick="clicker()" style="color: blue">Example Page</h1>
    <div id="content">
      This is the <span id="main" class="spanner">main content</span> of the <span id="page" class="spanner">page</span>.
    </div>

    <script type="text/javascript">
      const clicker = () => {
        alert('You clicked the header!');
      };
    </script>
  </body>
```

A more useful example might be dynamically adding HTML elements using the `onClick` event.  In the following example we have an ordered list with one initial item but we'll add new items every time a button is clicked.

```html
  <body>
    <h1 id="example">Example Page</h1>
    <div id="content">
      This is the <span id="main" class="spanner">main content</span> of the <span id="page" class="spanner">page</span>.
      <br /><br />
      List of items : 
      <ol id="itemlist">
        <li>First item</li>
      </ol>
      <button onClick="addListItem()">Add new item</button>
    </div>

    <script type="text/javascript">
      const addListItem = () => {
        const list = document.getElementById('itemlist');

        const node = document.createElement('li');
        const textnode = document.createTextNode(`New item added @ ${new Date()}`);
        node.appendChild(textnode)

        list.appendChild(node);
      };
    </script>
  </body>
```

A [full list of HTML Element events](https://developer.mozilla.org/en-US/docs/Web/API/Element#events) is available in the documentation.
