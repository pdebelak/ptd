"use strict";

var $ptd = {

  dom: function(selector) {
    return {
      list: selector === document ? [document] : selector instanceof Element ? [selector] : document.querySelectorAll(selector),

      each: function(callback) {
        for(var i=0;i<this.list.length;i++) {
          callback(this.list[i]);
        }
        return $ptd.dom(selector);
      },

      addClass: function(klass) {
        return this.each(function(element) {
          element.classList.add(klass);
        });
      },

      removeClass: function(klass) {
        return this.each(function(element) {
          element.classList.remove(klass);
        });
      },

      toggleClass: function(klass) {
        return this.each(function(element) {
          element.classList.toggle(klass);
        });
      },

      // the delegate is optional
      // assign to work on elements dynamically added to DOM after `on` is called
      on: function(eventType, delegate, callback) {
        if(typeof(callback) === 'undefined') {
          // delegate is actually the callback
          return this.each(function(element) {
            element.addEventListener(eventType, delegate);
          });
        } else {
          return this.each(function(element) {
            element.addEventListener(eventType, function(event) {
              // note to browser developers: implement matches!
              if(event.target.matches) {
                if(event.target.matches(delegate)) {
                  callback(event);
                }
              } else if (event.target.msMatchesSelector) {
                if(event.target.msMatchesSelector(delegate)) {
                  callback(event);
                }
              } else if (event.target.webkitMatchesSelector) {
                if(event.target.webkitMatchesSelector(delegate)) {
                  callback(event);
                }
              } else if (event.target.mozMatchesSelector) {
                if(event.target.mozMatchesSelector(delegate)) {
                  callback(event);
                }
              }
            });
          });
        }
      }
    }
  },

  ready: function(callback) {
    // apologies to jquery - http://jquery.org/
    var dcl = function() {
      document.removeEventListener("DOMContentLoaded", dcl);
      callback();
    }

    if(document.readyState === "complete") {
      // document is already ready (already)
      callback();
    } else {
      document.addEventListener("DOMContentLoaded", dcl);
    }
  },

  controller: function(callback) {
    var $PTDController = function() {
      this.self = this;
      this.elements = [];
      callback(this.self);
      this.load();
    }

    $PTDController.prototype.checkClick = function() {
      var ctrl = this;
      $ptd.dom('*').each(function(element) {
        if (element.hasAttribute('ptd-click')) {
          var attr = element.getAttribute('ptd-click');
          var funcName = attr.replace(/(.*)(\(.*\))/, '$1');
          var hasArgs = attr.match(/\(.*\)/);
          var argsName = attr.replace(/.*\((.*)\)/, '$1');
          if (hasArgs) {
            $ptd.dom(element).on('click', function(event) {
              event.preventDefault();
              ctrl[funcName](argsName);
              ctrl.broadcast();
            });
          } else {
            $ptd.dom(element).on('click', function(event) {
              event.preventDefault();
              ctrl[funcName](event.target);
              ctrl.broadcast();
            });
          }
        }
      });
    }

    $PTDController.prototype.broadcast = function() {
      var ctrl = this;
      $ptd.dom('*').each(function(element) {
        if (element.hasAttribute('ptd-show')) {
          var attr = element.getAttribute('ptd-show');
          var funcName = attr.replace(/(.*)(\(.*\))/, '$1');
          var isFunc = attr.match(/\(.*\)/);
          var argsName = attr.replace(/.*\((.*)\)/, '$1');
          if (isFunc) {
            var result = ctrl[funcName](argsName);
          } else {
            var result = ctrl[funcName];
          }
          if(result) {
            element.style.display = null;
          } else {
            element.style.display = 'none';
          }
        }
        if (element.hasAttribute('ptd-class')) {
          var attr = element.getAttribute('ptd-class');
          var funcName = attr.replace(/(.*)(\(.*\))/, '$1');
          var isFunc = attr.match(/\(.*\)/);
          var argsName = attr.replace(/.*\((.*)\)/, '$1');
          if (isFunc) {
            var result = ctrl[funcName](argsName);
          } else {
            var result = ctrl[funcName];
          }
          if(result.val) {
            element.classList.add(result.klass);
          } else {
            element.classList.remove(result.klass);
          }
        }
      });
    }

    $PTDController.prototype.load = function() {
      this.checkClick();
      this.broadcast();
    }

    return new $PTDController();
  }
};
