# $ptd

$ptd is a small javascript library.

The goal of $ptd is to only have functions that are useful to programmers and annoying to write in pure javascript (i.e. without the help of [jQuery](http://jquery.com/)).

It comes with two functions: `$ptd.ready()` and `$ptd.on()`. Each function is available separately, or together as a single library.

It supports modern browsers (IE 9+, Chrome, Safari, Firefox).

Usage:

`$ptd.ready()` functions like jQuery's `$(document).ready()` function. It fires when all DOM content is loaded and then no longer listens for that event.

```
$ptd.ready(function() {
	document.getElementById('#new_user_form').addEventListener('submit', function(event){
		event.preventDefault();
	});
});
```

`$ptd.on()` is like jQuery's `$(selector).on(event, delegate, callback)` function. It is meant to create event listeners on items that do not yet exist in the DOM.

The syntax is: `$ptd.on(event, selector, delegate, callback)` with the `selector` being something currently existing in the DOM that is a parent of the items that you want to add the event listener to. `'body'` is usually a safe bet, but being more specific is better, if possible.

```
$ptd.on('click', 'body', '#new-item', function() {
	console.log('Works!');
});
document.getElementsByTagName('body').innerHTML += '<p id="new-item">Click me!</p>';
document.getElementById('new-item').click();
// Works! will be outputted to the console.
```

The minified version of the library is 591 bytes, so have fun! You can grab the pretty version `ptd.js` or the minified version `ptd.min.js` from the bin folder of this repository. If you only want one function you can get `ptd-ready.js` or `ptd-on.js` or their minified siblings from the same directory.