# $ptd

$ptd is a small, experimental (for me) javascript library.

Its goal is to replace both jquery and angular for small, simple web projects. Mostly it is a way for me to learn about vanilla javascript.

It currently supports modern browsers (IE 10+, Chrome, Safari, Firefox) with no real plans to worry about IE 9 and before.

Example usage:

Like jquery

```
$ptd.ready(function() {
  $ptd.dom('#anId').addClass('radical');
});
```

Like angular

```
// js
$ptd.controller(function(scope) {
  scope.tab = 1;
  
  scope.setTab = function(num) {
    scope.tab = num;
  }

  scope.selectedTab = function(num) {
    return scope.tab === num;
  }
});
// html
<a href="tab1" ptd-click="setTab(1)">Tab 1</a>
<p ptd-show="selectedTab(1)">Tab 1 paragraph</p>
```

TODO: Add documentation, link to example app
