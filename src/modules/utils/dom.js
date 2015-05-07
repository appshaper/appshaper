/**
 *  Appshaper Dom Module
 *  @module Dom
 *  @desc Contains helper methods for working with the Document Object Model
 *  @author Jeroen Reurings
 *
 *  @copyright Copyright © 2015 Jeroen Reurings, all rights reserved.
 *  @license Licensed under the Apache License, Version 2.0 (the "License");
 *  You may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *  or see the LICENSE file in the root of the project.
 *  @see https://github.com/appshaper/appshaper
 */

define(function () {

    'use strict';

    var doc = document,
        exports = {

            /**
             *  Shorter way of getting a data attribute.
             *  @name module:Dom:getData
             *  @method
             *  @public
             *  @param {Element} element, is the element to get/set the data from
             *  @param {String} data, is the name of the data to get/set
             */
            getData: function (element, data) {
                return element.getAttribute('data-' + data);
            },

            /**
             *  Shorter way of setting a data attribute.
             *  @name module:Dom:setData
             *  @method
             *  @public
             *  @param {Element} element, is the element to get/set the data from
             *  @param {String} data, is the name of the data to get/set
             *  @param {String} value, is the value to set
             */
            setData: function (element, data, value) {
                return element.setAttribute('data-' + data, value);
            },

            /**
             *  Shorter way of inserting a DOM element before another DOM element.
             *  @name module:Dom:insertElementBefore
             *  @method
             *  @public
             *  @param {Element} referenceNode - The reference node
             *  @param {String} evt - The new node you want to insert
             */
            insertElementBefore: function (referenceNode, newNode) {
                referenceNode.parentNode.insertBefore(newNode, referenceNode);
            },

            /**
             *  Shorter way of inserting a DOM element after another DOM element.
             *  @name module:Dom:insertElementAfter
             *  @method
             *  @public
             *  @param {Element} referenceNode - The reference node
             *  @param {String} evt - The new node you want to insert
             */
            insertElementAfter: function (referenceNode, newNode) {
                referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
            },

            /**
             *  Safe classList implementation - add.
             *  @name module:Dom:addClass
             *  @method
             *  @public
             *  @param {Element} element - The element you want to add the class to
             *  @param {Mixed} className - The classname string or array with classes
             *  @return {Function} The called function
             */
            addClass: function (element, className) {
                var i,
                    ln,
                    self = this,
                    addClass;

                if (element !== null) {
                    if (doc.documentElement.classList) {
                        addClass = function (element, className) {
                            if (Array.isArray(className)) {
                                for (i = 0, ln = className.length; i < ln; ++i) {
                                    element.classList.add(className[i]);  
                                }
                            } else {
                                element.classList.add(className);
                            }
                        };
                    } else {
                        addClass = function (element, className) {
                            if (!element) {
                                return false;
                            }
                            if (!self.containsClass(element, className)) {
                                if (Array.isArray(className)) {
                                    for (i = 0, ln = className.length; i < ln; ++i) {
                                        element.className += (element.className ? ' ' : '') + 
                                        className[i];
                                    }
                                } else {
                                    element.className += (element.className ? ' ' : '') + 
                                    className;
                                }
                            }
                        };
                    }
                    return addClass(element, className);
                }
            },

            /**
             *  Safe classList implementation - remove.
             *  @name module:Dom:removeClass
             *  @method
             *  @public
             *  @param {Element} element - The element you want to remove the class from
             *  @param {String} className - The class name
             *  @return {Function} The called function
             */
            removeClass: function (element, className) {
                var removeClass,
                    regexp;

                if (element !== null) {
                    if (doc.documentElement.classList) {
                        removeClass = function (element, className) {
                            element.classList.remove(className);
                        };
                    } else {
                        removeClass = function (element, className) {
                            if (!element || !element.className) {
                                return false;
                            }
                            regexp = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
                            element.className = element.className.replace(regexp, '$2');
                        };
                    }
                    return removeClass(element, className);
                }
            },

            /**
             *  Safe classList implementation - remove multiple classes.
             *  @name module:Dom:removeAllClasses
             *  @method
             *  @public
             *  @param {Element} element - The element you want to remove the classes from
             */
            removeAllClasses: function (element) {
                element.setAttribute('class', '');
            },

            /**
             *  Safe classList implementation - contains.
             *  @name module:Dom:containsClass
             *  @method
             *  @public
             *  @param {Element} element - The element you want to check
             *  @param {String} className - The class name you want to check for
             *  @return {Boolean} element has className
             */
            containsClass: function (element, className) {
                var containsClass,
                    re;

                if (doc.documentElement.classList) {
                    containsClass = function (element, className) {
                        return element.classList.contains(className);
                    };
                } else {
                    containsClass = function (element, className) {
                        if (!element || !element.className) {
                            return false;
                        }
                        re = new RegExp('(^|\\s)' + className + '(\\s|$)');
                        return element.className.match(re);
                    };
                }
                return containsClass(element, className);
            },

            /**
             *  Safe classList implementation - toggle.
             *  @name module:Dom:toggleClass
             *  @method
             *  @public
             *  @param {Element} element - The element you want to toggle the class from
             *  @param {String} className - The classname you want to use
             *  @return {Boolean} element had className added
             */
            toggleClass: function (element, className) {
                var toggleClass,
                    self = this,
                    returnValue;

                if (doc.documentElement.classList &&
                    doc.documentElement.classList.toggle) {
                    toggleClass = function (element, className) {
                        return element.classList.toggle(className);
                    };
                } else {
                    toggleClass = function (element, className) {
                        if (self.containsClass(element, className)) {
                            self.removeClass(element, className);
                            returnValue = false;
                        } else {
                            self.addClass(element, className);
                            returnValue = true;
                        }
                        return returnValue;
                    };
                }
                return toggleClass(element, className);
            }
        };

    return exports;
});
