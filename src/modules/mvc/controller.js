/**
 *  Appshaper Controller Module
 *  @module Controller
 *  @desc Provides logic to be able to control your app.
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
    'appshaper/utils/check',
    'appshaper/pubsub'
], function (
    Check,
    Pubsub
) {
    'use strict';

    /**
     *  Controller Constructor
     *  @name module:Controller.Constructor
     *  @method
     *  @public
     *  @param {String} name - The controller name
     *  @param {Object} methods - The controllers methods
     *  @return {Object} The controller her public interface
     */
    return function (name, methods) {
            /**
             *
             *  @name module:Controller:onRouteEvent
             *  @method
             *  @private
             */
        var onRouteEvent = function (data) {
                if (Check.isFunction(methods['default'])) {
                    methods['default'](data);
                }
                if (Check.isFunction(methods[data.page])) {
                    methods[data.page](data);
                }
            },
            /**
             *
             *  @name module:Controller:onActionEvent
             *  @method
             *  @private
             */
            onActionEvent = function (method) {
                if (Check.isFunction(methods['default'])) {
                    methods['default'](this);
                }
                if (Check.isFunction(methods[method])) {
                    methods[method](this);
                }
            };

        if (name === 'route') {
            Pubsub.on(name, onRouteEvent);
        } else if (name.indexOf('action') !== -1) {
            Pubsub.on(name, onActionEvent);
        }
    };
});
