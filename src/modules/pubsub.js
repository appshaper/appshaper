/* eslint consistent-return: 0 */

/**
 *  Appshaper Pubsub Module
 *  @module Pubsub
 *  @desc Provides a Publish/Subscribe message system.
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
    'appshaper/utils/helper'
], function (
    Check,
    Helper
) {
    'use strict';

        /**
         *
         *  @name module:Pubsub:topics
         *  @variable
         *  @private
         */
    var topics = {},
        /**
         *
         *  @name module:Pubsub:id
         *  @method
         *  @private
         */
        id = 0,
        exports = {
            /**
             *
             *  @name module:Pubsub:on
             *  @method
             *  @public
             */
            on: function (topic, callback) {
                var token = 'token-' + (++id);

                if (!Helper.has(topics, topic)) {
                    topics[topic] = {};
                }
                topics[topic][token] = callback;

                return token;
            },
            /**
             *
             *  @name module:Pubsub:off
             *  @method
             *  @public
             */
            off: function (value) {
                var isTopic = Check.isString(value) && Check.has(topics, value),
                    isToken = Check.isString(value) && !isTopic,
                    result = false;

                if (isTopic) {
                    delete topics[value];
                    return;
                }

                Object.keys(topics).every(function (key) {
                    var topic = topics[key];

                    if (isToken && topic[value]) {
                        delete topic[value];
                        return false;
                    } else if (Check.isFunction(value)) {
                        Object.keys(topic).forEach(function (key) {
                            if (topic[key] === value) {
                                delete topic[key];
                            }
                        });
                        return true;
                        // Remove all listeners that use the given callback
                    }

                });

                return result;
            },
            /**
             *
             *  @name module:Pubsub:offAll
             *  @method
             *  @public
             */
            offAll: function () {
                topics = {};
            },
            /**
             *
             *  @name module:Pubsub:fire
             *  @method
             *  @public
             */
            fire: function (topic, data, scope) {
                Object.keys(topics).forEach(function (key) {

                    var listeners;

                    if (key === topic) {
                        listeners = topics[key];

                        Object.keys(listeners).forEach(function (key) {
                            var listener = listeners[key];
                            listener.apply(scope || {}, [data] || []);
                        });
                    }

                });
            },
            /**
             *
             *  @name module:Pubsub:list
             *  @method
             *  @public
             */
            list: function () {
                return topics;
            }
        };

    return exports;
});
