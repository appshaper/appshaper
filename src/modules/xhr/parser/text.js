/**
 *  Appshaper Text Parser Module
 *  @module Text
 *  @desc Used to parse JSON.
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
             *  Parses a request.
             *  @name module:Text:parse
             *  @method
             *  @public
             */
            parse: function (request) {

                return request.responseText;
            }
        };

    return exports;
});
