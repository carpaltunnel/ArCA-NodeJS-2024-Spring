# [Bootstrap (v5)](https://getbootstrap.com/)
In this lesson we're going to cover the CSS framework "Bootstrap".  Specifically, we'll use the newest version as of the date of this lesson creation which is v5.

Bootstrap has become the "go to" framework for easily creating responsive web applications easily.  In previous lessons I covered the basics of CSS, which still apply, but I also probably mentioned that "you don't know how good you have it" these days.  Designs that would take hundreds of hours to get working correctly in all the major browsers in the past can now be done in minutes by utilizing the F/OSS work that has gone into Bootstrap.  If you just use the provided style then your application may look like a generic copy of thousands of others, but we can also modify and extend Bootstrap to customize it.

We'll cover the basics in this lesson but for references I would recommend : 
1. The [Bootstrap Documentation](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
2. The [W3Schools introduction](https://www.w3schools.com/whatis/whatis_bootstrap.asp)
3. The [Bootstrap Cheatsheet](https://getbootstrap.com/docs/5.0/examples/cheatsheet/)

One important note about Bootstrap v5 is that the requirement for jQuery has been removed. jQuery was a cornerstone of web applications for many, many years but with the expansion and standardization of browser support it has become less of a requirement and more of a "use it if you really need it" library.

## Including Bootstrap
There are two common ways to include Bootstrap in your project.  The first and easiest way is to `link` a CDN copy into your HTML page.  This is extremely easy but has two drawbacks to consider : 
1. You can only use the default styles and class provided by Bootstrap.  You can't really customize it.
2. Your application becomes dependent on the CDN being available.  Usually this is a non-issue but by including dependencies on external sources that you do not control, you do run the risk of those sources changing, becoming unavailable, or potentially being tampered with.

The second option is to download a copy of Bootstrap, customize it if you want, and have it live in your project.

We'll use the CDN approach for this lesson due to the ease of use, but I would generally prefer to host my own dependencies for a permanent project.

To reference a common CDN version of Bootstrap you can include the following `link` in the `head` of your HTML document and include the "viewport" meta tag : 
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
```
Then, separately include the Bootstrap Javascript in the `body` of your HTML document : 
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
```

Take note that you should be using a `doctype` of `html` to indicate that your page is developed with HTML5

## Using Bootstrap
There are hundreds if not thousands of styles provided by Bootstrap but, in the interest of time, we'll only cover some of the most common ones.

First, we need to talk about breakpoints or "grid tiers".  These are the sizes provided by Bootstrap that we'll use to control the horizontal size of the elements in our page.  The predefined tiers are : 
1. Extra small (this is the default)
2. Small (sm)
3. Medium (md)
4. Large (lg)
5. Extra Large (xl)
6. Extra Extra Large (xxl)

You'll see these size indicators frequently when using Bootstrap so get accustomed to them.  Now that we know the size indicators, let's talk about the structure of our page using containers.

### Containers
Containers are the basic layout structure in Bootstrap and the easiest way to control how our content displays in the browser.  Basically, if you're going to put "stuff" on the page then it will often go into a container.

The base class for containers is, of course `.container`.  As we discussed previously, "extra small" is always the default but you can choose your target by appending a size designator to the container class like : 
1. `.container-sm`
2. `.container-md`
3. `.container-lg`
4. `.container-xl`
5. `.container-xxl`

Additionally available is `.container-fluid` which will always consume 100% of the width regardless of window size.

Each of these will indicate that the container should be centered at full size until a breakpoint is reached.  At that point, it will be resized... responsively and magically.  There is a simple example of this behavior included in the [attached code](code/containers.html)

### Grids
While containers are great for large block elements of our pages, the Bootstrap grid system allows us to split it up into smaller (still responsive) areas.  The grid system is governed by `.row` and `.col` classes, which can also be modified with size indicators.

Usage of the row and col classes will automatically scale the content to fit the screen and maintain the responsive approach.  These classes also will automatically adapt the number of rows and columns to the screen.  It's kind of like building an HTML table to control your layout (like the old days) but much more flexible.

Note that there is no requirement for your rows to have the same number of columns.  In the [attached grid example](code/grid.html) you can see row #1 has three columns, row #2 has four columns, and row #3 has only two columns.  This example looks very tabular, but keep in mind that you could provide more than the simple "Row 1 - Column 1" content and the container will automatically adjust to the length of the content.

Like many Bootstrap styles, grids are based on a twelve step width where you can define your column width based on a subset of that.  For example, if you wanted to (responsively) define that one column is much smaller than another then you might use `col-2` for one column and `col-10` for the other.  Keep in mind that these should add up to a total of twelve but there are a few guard rails built into Bootstrap that will help protect you if you mess it up... just try not to.

Of course, you can also use the standard breakpoint/grid tiers with your columns like `.col-sm`, `.col-md`, etc.

### Forms
Let's talk about forms since we'll use them for pretty much all user input.  As usual, we'll cover the high points but you can find more info in the [Bootstrap Form documentation](https://getbootstrap.com/docs/5.2/forms/)

First of all, always be sure to use the correct `type` attribute for your HTML inputs.  We've already talked about the importance of this but it bears repeating since Bootstrap will make presentation decisions based on them.

You can find examples over in [code/forms.html](code/forms.html) but we'll talk about the generics here.

For the most part, you can simply add the `.form-control` class to your basic inputs and let Bootstrap take over from there.  You'll probably also want to use `.form-label` and its related classes for correctly styling the text around your inputs.  Similarly `.form-text` can provide larger text areas that give context and instruction about the input.  The first example includes a simple button but we'll explore all our button styles in the future.

As with pretty much everything else in Bootstrap, we can append size indicators to the input classes to control the size like `.form-control-sm` and `.form-control-lg`

In addition to plain text inputs, we'll also use more specific HTML input controls like `select`, `checkbox`, `radio`, `range` and more.  As usual, we just need to add the correct styles to our HTML elements in order for Bootstrap to style them for us.  There are examples of each of these in [code/forms.html](code/forms.html) but we'll talk through the Bootstrap classes here.
1. `.form-select` - Bootstrap style for select boxes
2. `.form-check`, `.form-check-input`, `.form-check-label` - Styles for checkbox/radio containers, checkboxes, radios, and related labels
3. `role="switch"` - HTML attribute that transforms checkboxes into "switches"
4. `.form-check-inline` - Allows checkboxes/radios to be positioned on a single line
5. `.btn-check` - Checkboxes/radios presented as buttons
6. `.form-range` - Styling for range select inputs
7. `.input-group` - Styling for grouping inputs to provide context
8. `.form-floating` - Class to support "floating" labels for user context

### Components
"Components" are helpful constructs in Bootstrap that can help you with a variety of presentation approaches.  Take note that we will also talk about Angular components in the future which are somewhat logically similar but completely different things.  Many, if not all, Bootstrap components require the Bootstrap Javascript library to work.  In the first section of this lesson we included it at the same time we included the Bootstrap CSS so it will already be available in our examples.

As usual, we'll only cover the components that I think are going to be most commonly used.  You can checkout the full [Bootstrap Component Documentation](https://getbootstrap.com/docs/5.2/components/) for the full list.

Examples can be found in [code/components.html](code/components.html) and we'll simply cover the classes and information here.  Most of these examples are taken directly from the Bootstrap documentation.

1. `.accordion` - The accordion component allows us to collapse and expand sections (divs) to display or hide information.  It is similar to the `.collapse` class but a bit more specialized.
2. `.alert` - Alerts very helpful for displaying information to the user when an event occurs.  Common examples would include things like "An error occurred", "Save successful", or "New email arrived".  There are eight context classes that let us easily control the look and color of the alert such as `.alert-success`, `.alert-danger`, and `.alert-warning`.  If you need to include links inside of your alerts, the `.alert-link` class will properly style it to match the alert type.
3. `.badge` - Badges can be added to links or buttons to display a counter or indicator.  A very common example would be something like "Unread Messages (4)" where "(4)" would be our badge.  There are also different colors and styles to indicate the type of badge such as `.badge .text-bg-primary`
4. `.btn` - The button class provides consistent styling for buttons, though it can be applied to anchor and input tags as well.  Like `.badge` and `.alert`, there are multiple predefined colors and sizes available.
5. `.modal` - An extremely helpful and flexible class for creating modal windows.  These are useful for confirming actions (Are you sure you want to delete this?) and providing more information in a popup window.







Bootstrap with Angular : 
Can't be done directly with Bootstrap < v5 due to jQuery, use ng-bootstrap below that is "angularized"
https://ng-bootstrap.github.io/#/home
https://www.bootstrapdash.com/use-bootstrap-4-with-angular/

https://www.bootstrapdash.com/how-to-use-bootstrap-5-with-angular/