/**
 *  Appshaper View Module
 *  @module View
 *  @desc Provides logic to manage a views
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

    var nodeCount = 0;

    return function (settings) {
        var tag = settings.tag || 'div',
            doc = document,
            node = doc.createElement(tag),
            template = appshaper.templates[settings.templateId],

            /**
             *  Binds DOM events based on the event settings
             *  @name module:View.bindEvents
             *  @method
             *  @private
             *  @param {Object} node - The DOM node where the event nodes reside
             */
            bindEvents = function () {
                var eventElements = settings.events;

                // Bind template events
                Object.keys(eventElements).forEach(function (eventElement) {
                    var events = eventElements[eventElement],
                        eventElementResults = document.body.querySelectorAll(eventElement);

                    Array.prototype.forEach.call(eventElementResults, function (eventElement) {
                        Object.keys(events).forEach(function (evt) {
                            var handler = events[evt];
                            eventElement.addEventListener(evt, handler);
                        });
                    });
                });
            },
            /**
             *
             *  @name module:View.setNodeContent
             *  @method
             *  @private
             */
            setNodeContent = function () {
                if (Check.isObject(settings.data)) {
                    node.innerHTML = template(settings.data);
                } else {
                    node.innerHTML = template();
                }
            };

            node.id = 'appshaper-view' + (++nodeCount);
            setNodeContent();

        return {
            /**
             *
             *  @name module:View.render
             *  @method
             *  @public
             */
            render: function (parentNodeQuery) {
                var parentNode;
                parentNodeQuery = parentNodeQuery || settings.target || void 0;
                if (Check.isString(parentNodeQuery)) {
                    parentNode = doc.querySelector(parentNodeQuery);
                    if (Check.isElement(parentNode)) {
                        parentNode.innerHTML = '';
                        //parentNode.appendChild(node);
                        //console.log(node.innerHTML);
                        parentNode.insertAdjacentHTML('beforeend', node.innerHTML);
                    } else {
                        doc.body.insertAdjacentHTML('beforeend', node.innerHTML);
                    }
                } else {
                    doc.body.insertAdjacentHTML('beforeend', node.innerHTML);
                }
                if (Check.isObject(settings.events)) {
                    bindEvents();
                }
            },
            /**
             *
             *  @name module:View.getNode
             *  @method
             *  @public
             */
            getNode: function () {
                return node;
            },
            /**
             *
             *  @name module:View.getNodeHTML
             *  @method
             *  @public
             */
            getNodeHTML: function () {
                return node.outerHTML;
            },
            /**
             *
             *  @name module:View.setData
             *  @method
             *  @public
             */
            setData: function (data) {
                settings.data = data;
                node.innerHTML = template(settings.data);
            }
        };
    };
});
