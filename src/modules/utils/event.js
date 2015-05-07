/**
 *  Appshaper Event Module
 *  @module Event
 *  @desc Contains helper methods for working with DOM events
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
    'utils/check'
], function (
    Check
){

    'use strict';

    var exports = {

            /**
             *  Cross-browser helper for triggering events on elements.
             *  @name module:Event:trigger
             *  @method
             *  @public
             *  @param {Object} element - The element you want to trigger an event on
             *  @param {String} type - The event type you want to trigger on the element
             *  @param {Boolean} false
             */
            trigger: function (element, type) {
                var evt,
                    doc = document;

                if (document.createEvent) {
                    evt = doc.createEvent('MouseEvents');
                    evt.initEvent(type, true, false);
                    element.dispatchEvent(evt);
                    return true;
                } else if (doc.createEventObject) {
                    element.fireEvent('on' + type);
                    return true;
                } else if (Check.isFunction(element['on' + type])) {
                    element['on' + type]();
                    return true;
                }
                return false;
            },

            /**
             *  Cross-browser helper for adding events to elements.
             *  @name module:Event:add
             *  @method
             *  @public
             *  @param {Object} object - Object to check supported methods on
             *  @param {String} evt - The event name you want to add
             *  @param {Function} fnc - The callback function you want to use
             */
            add: function (object, evt, fnc) {
                var returnValue;

                // W3C model
                if (object.addEventListener) {
                    object.addEventListener(evt, fnc, false);
                    returnValue = true;
                } else if (object.attachEvent) {

                    // Microsoft based
                    returnValue = object.attachEvent('on' + evt, fnc);
                } else {

                    // Browser don't support W3C or MSFT model, go on with traditional
                    evt = 'on' + evt;
                    if (Check.isFunction(object[evt])) {

                        // Object already has a function on traditional
                        // Let's wrap it with our own function inside another function
                        fnc = (function (f1, f2) {
                            return function () {
                                f1.apply(this, arguments);
                                f2.apply(this, arguments);
                            };
                        }(object[evt], fnc));
                    }
                    object[evt] = fnc;
                    returnValue = true;
                }
                return returnValue;
            },

            /**
             *  Cross-browser helper for removing events from elements.
             *  @name module:Event:remove
             *  @method
             *  @public
             *  @param {Object} object - Object to check supported methods on
             *  @param {String} evt - The event name you want to remove
             *  @param {Function} fnc - The callback function you want to remove
             */
            remove: function (object, evt, fnc) {
                var returnValue;

                // W3C model
                if (object.removeEventListener) {
                    object.removeEventListener(evt, fnc, false);
                    returnValue = true;
                } else if (object.detachEvent) {

                    // Microsoft based
                    returnValue = object.detachEvent('on' + evt, fnc);
                } else {
                    object[evt] = function () {
                        return void 0;
                    };
                }
                return returnValue;
            }
        };

    return exports;
});
