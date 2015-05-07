/**
 *  Appshaper Loader Module
 *  @module Loader
 *  @desc Can load scripts by appending them to the HTML head.
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
) {

    'use strict';

    var exports = {
            /**
             *  Loads a script by appending it to the head.
             *  @name module:Loader:loadScript
             *  @method
             *  @public
             */
            loadScript: function (name, callback) {
                var head,
                    script,
                    scriptSource,
                    onScriptLoaded = function () {
                        if (callback) {
                            callback();
                        }
                    };

                head = document.getElementsByTagName('head')[0];
                script = document.createElement('script');
                scriptSource = name;
                script.src = scriptSource;

                if (Check.isDefined(script.addEventListener)) {
                    script.addEventListener('load', onScriptLoaded, false);
                } else if (Check.isDefined(script.readyState)) {
                    script.onreadystatechange = onScriptLoaded;
                }
                head.insertBefore(script, head.firstChild);
            },
            /**
             *  Loads multiple scripts by appending them to the head (using the loadScript method).
             *  @name module:Loader:loadScripts
             *  @method
             *  @public
             */
            loadScripts: function (scripts, callback) {
                var loadCount = 0,
                    onLoaded = function () {
                        ++loadCount;
                        if (loadCount === scripts.length && Check.isFunction(callback)) {
                            callback();
                        }
                    };

                scripts.forEach(function (script) {
                    exports.loadScript(script, onLoaded);
                });
            }
        };

    return exports;
});
