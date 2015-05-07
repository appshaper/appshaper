/**
 *  Appshaper Helper Module
 *  @module Helper
 *  @desc Contains various other helper methods
 *  @author Jeroen Reurings
 *
 *  @copyright Copyright © 2015 Jeroen Reurings, all rights reserved.
 *  @license Licensed under the Apache License, Version 2.0 (the "License");
 *  You may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *  or see the LICENSE file in the root of the project.
 *  @see https://github.com/appshaper/appshaper
 */

define([
    'appshaper/utils/check'
], function (
    Check
) {

    'use strict';

    var doc = document,
        win = window,
        exports = {

            /**
             *  An empty function.
             *  @name module:Helper:emptyFunction
             *  @method
             *  @public
             *  @return {Function} The empty function
             */
            emptyFunction: function () {},

            /**
             *  Call a callback function as soon as the DOM is ready.
             *  @name module:Helper:domReady
             *  @method
             *  @public
             *  @param {Function} callback - The callback function you want to call
             */
            domReady: function (callback) {
                var state = doc.readyState;
                if (state === 'complete' || state === 'interactive') {
                    callback();
                } else {
                    if (Check.isFunction(win.addEventListener)) {
                        win.addEventListener('DOMContentLoaded', callback);
                    } else {
                        win.attachEvent('onload', callback);
                    }
                }
            },

            /**
             *  Are the two given arrays identical (even when they have a different reference).
             *  @name module:Helper:arrayMatch
             *  @method
             *  @public
             *  @param {Array} first array to check
             *  @param {Array} second array to check
             *  @return {Boolean} true if they are identical, false if they are not
             */
            arrayMatch: function (a, b) {
                var i = a.length;
                if (i !== b.length) {
                    return false;
                }
                while (i--) {
                    if (a[i] !== b[i]) {
                        return false;
                    }
                }
                return true;
            },

            /**
             *  Will clone an object.
             *  @name module:Helper:clone
             *  @method
             *  @public
             *  @param {Object} obj - The object that you want to clone.
             *  @return The cloned object.
             */
            clone: function (obj) {
                return exports.combine({}, obj, true);
            },

            /**
             *  Will check if all given arguments are of a specific type.
             *  @name module:Helper:allIs
             *  @method
             *  @public
             *  @param {String} type - The type to check for
             *  @param {Array} value - The values to check
             *  @return {Boolean} true if all arguments are of the given type,
             *  false if one of them is not
             */
            allIs: function (type, values) {
                var method = exports['is' + exports.upperFirst(type)],
                    max = values.length;

                while (max--) {
                    if (!method.call(null, values[max])) {
                        return false;
                    }
                }
                return true;
            },

            /**
             *  Creates a two-dimensional array.
             *  @name module:Helper:array2D
             *  @method
             *  @public
             *  @param {Number} rowCount - The number of rows you want to use.
             *  @param {Number} columnCount - The number of columns you want to use.
             *  @param {Mixed} initial - The initial value to use.
             *  @return {Array} The created two-dimensional array.
             */
            array2D: function (rowCount, columnCount, initial) {
                var arr = [],
                    i,
                    j,
                    columns;

                for (i = 0; i < rowCount; ++i) {
                    columns = [];
                    for (j = 0; j < columnCount; ++j) {
                        columns[j] = initial;
                    }
                    arr[i] = columns;
                }
                return arr;
            },

            /**
             *  Provides a custom bind function because the native one is slower.
             *  @name module:Helper:bind
             *  @method
             *  @public
             *  @param {function} functionToBind - The function you want to bind
             *  @param {object} context - The context you want to bind
             *  @param {array} args - The arguments you want to send along
             *  @return {function} The bound function
             */
            bind: function (functionToBind, context, args) {
                return function bound () {
                    return functionToBind.apply(context, args);
                };
            },

            /**
             *  Converts any iterable type into an array.
             *  @name module:Helper:toArray
             *  @method
             *  @public
             *  @param {Object} iterable - An iterable type
             *  @return {Array}
             */
            toArray: function (iterable) {
                var name,
                    arr = [];

                if (!iterable) {
                    return [iterable];
                } else if (Check.isArgument(iterable)) {
                    return Array.prototype.slice.call(iterable);
                } else if (Check.isString(iterable)) {
                    return iterable.split('');
                } else if (Array.isArray(iterable)) {
                    return iterable;
                } else if (Check.isDomList(iterable)) {
                    return Array.prototype.slice.call(iterable);
                }
                for (name in iterable) {
                    if (this.has(iterable, name)) {
                        arr.push(iterable[name]);
                    }
                }
                return arr;
            },

            /**
             *  Shortcut fo has own property.
             *  @name module:Helper:has
             *  @method
             *  @public
             *  @param {Object} obj - The object
             *  @param {String} key - The key you want to check for
             *  @param {String}
             */
            has: function (obj, key) {
                return Object.prototype.hasOwnProperty.call(obj, key);
            },

            /**
             *  Function to check if a string, array, or object contains a needed
             *  string.
             *  @name module:Helper:contains
             *  @method
             *  @public
             *  @param {Sting|Array|Object} obj - The object you want to check
             *  @param {String} needed - The string you want to check for
             */
            contains: function (obj, needed) {
                if (Check.isString(obj)) {
                    if (obj.indexOf(needed) !== -1) {
                        return true;
                    }
                    return false;
                }
                if (Array.isArray(obj)) {
                    if (obj.indexOf(needed) !== -1) {
                        return true;
                    }
                    return false;
                }
                return this.has(obj, needed);
            },

            /**
             *  Will combine two objects (or arrays).
             *  The properties of the second object will be added to the first
             *  If the second object contains the same property name as the first
             *  object, the property will be saved in the base property.
             *  @name module:Helper:combine
             *  @method
             *  @public
             *  @param {Object} obj1 - The first object
             *  @param {Object} obj2 - The second object
             *  @param {Boolean} useBase - If you want to use the base
             *  @return {Object} If both params are objects: The combined first
             *  object
             *  @return {Object} If one of the params in not an object
             *  (or array): The first object
             */
            combine: function (obj1, obj2, useBase) {
                var prop;
                if (Array.isArray(obj1) && Array.isArray(obj2)) {
                    return obj1.concat(obj2);
                }
                for (prop in obj2) {
                    if (Check.has(obj2, prop)) {
                        if (Check.has(obj1, prop) && useBase === true) {
                            obj1['base'] = obj1['base'] || {};
                            obj1['base'][prop] = obj1[prop];
                        }
                        if (Check.isObject(obj2[prop])) {
                            obj1[prop] = exports.combine(obj2[prop], {});
                        } else {
                            obj1[prop] = obj2[prop];
                        }
                    }
                }
                return obj1;
            },

            /**
             *  Returns a random value within a given range.
             *  @name module:Helper:getRandom
             *  @method
             *  @public
             *  @param {Number} min - The minimum value of the range
             *  @param {Number} max - The maximum value of the range
             *  @return {Number} A random whole number within the passed range
             */
            getRandom: function (min, max) {
                return min + Math.floor(Math.random() * (max - min + 1));
            },

            /**
             *  Generates a random string with a configurable length and character set.
             *  @name module:Helper:getRandomString
             *  @method
             *  @public
             *  @param {Number} length - The character length of the random string.
             *  @param {Array} characterSet - The characters that can be used in the random string.
             *  @return {String} The randomly generated string.
             */
            getRandomString: function (length, characterSet) {
                var i,
                    randomString = '',
                    randomPosition;

                characterSet = characterSet ||
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                for (i = 0; i < length; ++i) {
                    randomPosition = Math.floor(Math.random() * characterSet.length);
                    randomString += characterSet.substring(randomPosition, randomPosition + 1);
                }
                return randomString + new Date().getTime();
            },

            /**
             *  Will uppercase the first character of a given string.
             *  @name module:Helper:upperFirst
             *  @method
             *  @public
             *  @param {String} str - The sting you want to make uppercase
             *  @return {String}
             */
            upperFirst: function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

            /**
             *  Will return the size of an object.
             *  The object you pass in will be iterated.
             *  The number of iterations will be counted and returned.
             *  If you pass in another datatype, it will return the length
             *  property (if suitable).
             *  @name module:Helper:size
             *  @method
             *  @public
             *  @param {Object} obj - The object you want to know the size of.
             *  @return {Number} The size of the object.
             */
            size: function (obj) {
                var size = 0,
                    key;

                if (!obj) {
                    return 0;
                }
                if (Check.isObject(obj)) {
                    for (key in obj) {
                        if (this.has(obj, key)) {
                            ++size;
                        }
                    }
                }
                if (Check.isString(obj) || Array.isArray(obj) ||
                    Check.isArguments(obj)) {
                    size = obj.length;
                }
                if (Check.isNumber(obj)) {
                    size = obj.toString().length;
                }
                return size;
            }
        };

    return exports;
});
