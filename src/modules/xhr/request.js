/**
 *  Appshaper Request Module
 *  @module Request
 *  @desc Can perform XHR requests.
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
    'utils/helper',
    'xhr/parser/json',
    'xhr/parser/xml',
    'xhr/parser/text'
], function (
    Helper,
    JSON,
    XML,
    Text
) {
    'use strict';

        /**
         *
         *  @name module:Request:parsers
         *  @variable
         *  @private
         */
    var parsers = {
            json: JSON,
            xml: XML,
            text: Text
        },
        /**
         *
         *  @name module:Request:xhr
         *  @method
         *  @private
         */
        xhr = function (data) {
            var win = window,
                type = data.type || 'text',
                XHR = win.XMLHttpRequest || win.ActiveXObject,
                request = new XHR('MSXML2.XMLHTTP.3.0'),
                handlers = {
                    error: Helper.emptyFunction
                },
                exports = {
                    success: function (success) {
                        handlers.success = success;
                        return exports;
                    },
                    error: function (error) {
                        handlers.error = error;
                        return exports;
                    }
                };

            request.open(data.method, data.url, true);
            request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status >= 200 && request.status < 300) {
                        handlers.success(parsers[type].parse(request));
                    } else {
                        handlers.error(parsers[type].parse(request));
                    }
                }
            };
            request.send(data);

            return exports;
        },
        exports = {
            /**
             *
             *  @name module:Request:get
             *  @method
             *  @public
             */
            get: function (data) {
                data.method = 'GET';
                return xhr(data);
            },
            /**
             *
             *  @name module:Request:put
             *  @method
             *  @public
             */
            put: function (data) {
                data.method = 'PUT';
                return xhr(data);
            },
            /**
             *
             *  @name module:Request:post
             *  @method
             *  @public
             */
            post: function (data) {
                data.method = 'POST';
                return xhr(data);
            },
            /**
             *
             *  @name module:Request:delete
             *  @method
             *  @public
             */
            delete: function (data) {
                data.method = 'DELETE';
                return xhr('DELETE');
            }
        };

    return exports;
});
