/**
 *  Appshaper XML Parser Module
 *  @module XML
 *  @desc Used to parse XML.
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
             *  @name module:XML:parse
             *  @method
             *  @public
             */
            parse: function (request) {
                var win = window,
                    xmlParser,
                    response;

                if (win.DOMParser) {
                    xmlParser = new DOMParser();
                    response = xmlParser.parseFromString(request.responseText, 'text/xml');
                }
                if (win.ActiveXObject) {
                    xmlParser = new win.ActiveXObject('Microsoft.XMLDOM');
                    xmlParser.async = false;
                    response = xmlParser.loadXML(request.responseText);
                }

                return response;
            }
        };

    return exports;
});
