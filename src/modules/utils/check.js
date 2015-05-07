/**
 *  Appshaper Check Module
 *  @module Check
 *  @desc Contains helper methods to perform type checks and other kind of checks on values
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

    var exports = {

            /**
             *  Checks if the passed value is a DOM element.
             *  @name module:Check:isElement
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isElement: function (value) {
                return !!(value && value.nodeType === 1);
            },

            /**
             *  Checks if the passed value is a DOM node list.
             *  @name module:Check:isDomList
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isDomList: function (value) {
                return (/^\[object (HTMLCollection|NodeList|Object)\]$/).test(
                    toString.call(value)) && this.isNumber(value.length) &&
                        (value.length === 0 || (typeof value[0] === 'object' &&
                            value[0].nodeType > 0));
            },

            /**
             *  Checks if the passed value is a regular expression
             *  @name module:Check:isRegEx
             *  @method
             *  @public
             *  @param {Mixed} value - The value you want to check
             *  @return {Boolean}
             */
            isRegEx: function (value) {
                return !!(value && value.test && value.exec && (value.ignoreCase ||
                    value.ignoreCase === false));
            },

            /**
             *  Checks if the passed value is a function.
             *  @name module:Check:isFunction
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isFunction: function (value) {
                return Object.prototype.toString.call(value) === '[object Function]';
            },

            /**
             *  Checks if the passed value is a literal object.
             *  @name module:Check:isObject
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isObject: function (value) {
                return Object.prototype.toString.call(value) === '[object Object]';
            },

            /**
             *  Checks if the passed value is a boolean.
             *  @name module:Check:isBoolean
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isBoolean: function (value) {
                return value === true || value === false ||
                    Object.prototype.toString.call(value) === '[object Boolean]';
            },

            /**
             *  Checks if the passed value is a number.
             *  @name module:Check:isNumber
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isNumber: function (value) {
                return Object.prototype.toString.call(value) ===
                    '[object Number]';
            },

            /**
             *  Checks if the passed value is undefined.
             *  @name module:Check:isUndefined
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isUndefined: function (value) {
                return value === void 0;
            },

            /**
             *  Checks if the passed value is defined.
             *  @name module:Check:isDefined
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isDefined: function (value) {
                return value !== void 0;
            },

            /**
             *  Checks if the passed value is a date.
             *  @name module:Check:isDate
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isDate: function (value) {
                return Object.prototype.toString.call(value) === '[object Date]';
            },

            /**
             *  Checks if the passed value is an argument object.
             *  @name module:Check:isArgument
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isArgument: function (value) {
                return Object.prototype.toString.call(value) ===
                    '[object Arguments]';
            },

            /**
             *  Checks if the passed value is a string.
             *  @name module:Check:isString
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isString: function (value) {
                return typeof value === 'string' || value instanceof String;
            },

            /**
             *  Checks if the passed value is an integer.
             *  @name module:Check:isInt
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check
             *  @return {Boolean}
             */
            isInt: function (value) {
                return parseFloat(value) === parseInt(value, 10) && !isNaN(value);
            },

            /*  Checks if a given object has a passed property itself.
             *  @name module:Check:has
             *  @method
             *  @public
             *  @param {Object} object - The object you want to check
             *  @param {String} key - The property you want to check
             */
            has: function (object, key) {
                return Object.prototype.hasOwnProperty.call(object, key);
            },

            /**
             *  Checks if a given variable is empty.
             *  @name module:Check:isEmpty
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check.
             *  @return {Boolean}
             */
            isEmpty: function (value) {
                var item;
                if (value === '' || value === 0 || value === '0' || value === null ||
                        value === false || exports.isUndefined(value)) {
                    return true;
                }

                // Check if the array is empty
                if (Array.isArray(value) && value.length === 0) {
                    return true;
                }

                // Check if the object is empty
                if (exports.isObject(value)) {
                    for (item in value) {
                        if (exports.has(value, item)) {
                            return false;
                        }
                    }
                    return true;
                }
                return false;
            },

            /**
             *  Checks if a given variable is null.
             *  @name module:Check:isNull
             *  @method
             *  @public
             *  @param {Object} value - The value you want to check.
             *  @return {Boolean}
             */
            isNull: function (value) {
                return value === null;
            }
        };

    return exports;
});
