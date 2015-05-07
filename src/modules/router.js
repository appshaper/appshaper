/**
 *  Appshaper Router Module
 *  @module Router
 *  @desc Provides a front-end router which uses the history API if available, else it falls back
 *  on hash change events.
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

    var win = window;

    /**
     *  Router Constructor
     *  @name module:Router.Constructor
     *  @method
     *  @public
     *  @param {Object} settings - The router settings you want to use
     *  @return {Object} exports - The external interface
     */
    return function (settings) {
        var routes = {},
            currentPath,
            baseUrl = settings && settings.baseUrl ? settings.baseUrl + '/' : '',
            mode = settings && settings.mode ? settings.mode : '',
            paused = false,
            navigated = false,
            /**
             *
             *  @name module:Router:checkHashChange
             *  @method
             *  @private
             */
            checkHashChange = function () {
                return 'onhashchange' in win;
            },
            /**
             *
             *  @name module:Router:checkHistoryApi
             *  @method
             *  @private
             */
            checkHistoryApi = function () {
                var has = false;
                if (mode !== '') {
                    has = mode === 'history' ? true : false;
                } else {
                    has = !!(window.history && history.pushState);
                    mode = has ? 'history' : 'hash';
                }
                return has;
            },
            /**
             *
             *  @name module:Router:hasHistoryApi
             *  @method
             *  @private
             */
            hasHistoryApi = checkHistoryApi(),
            /**
             *
             *  @name module:Router:hasHashChange
             *  @method
             *  @private
             */
            hasHashChange = checkHashChange(),
            /**
             *
             *  @name module:Router:clearSlashes
             *  @method
             *  @private
             */
            clearSlashes = function (path) {
                return path.toString().replace(/\/$/, '').replace(/^\//, '');
            },
            /**
             *
             *  @name module:Router:getCurrentSegment
             *  @method
             *  @private
             */
            getCurrentSegment = function () {
                var segment = '',
                    match;

                if (hasHistoryApi) {
                    segment = decodeURI(win.location.pathname.replace(baseUrl, ''));
                } else {
                    match = win.location.href.match(/#(.*)$/);
                    segment = match ? match[1] : '';
                }
                return clearSlashes(segment);
            },
            /**
             *
             *  @name module:Router:onPopState
             *  @method
             *  @private
             */
            onPopState = function (e) {
                exports.route('js', {
                    event: e
                });
            },
            /**
             *
             *  @name module:Router:listenPopState
             *  @method
             *  @private
             */
            listenPopState = function () {
                win.addEventListener('popstate', onPopState);
            },
            /**
             *
             *  @name module:Router:forgetPopState
             *  @method
             *  @private
             */
            forgetPopState = function () {
                win.removeEventListener('popstate', onPopState);
            },
            /**
             *
             *  @name module:Router:onHashChange
             *  @method
             *  @private
             */
            onHashChange = function (e) {
                if (!navigated) {
                    exports.route('js', {
                        event: e
                    });
                }
                navigated = false;
            },
            /**
             *
             *  @name module:Router:listenHashChange
             *  @method
             *  @private
             */
            listenHashChange = function () {
                win.addEventListener('hashchange', onHashChange);
            },
            /**
             *
             *  @name module:Router:forgetHashChange
             *  @method
             *  @private
             */
            forgetHashChange = function () {
                win.removeEventListener('hashchange', onHashChange);
            },
            /**
             *
             *  @name module:Router:forget
             *  @method
             *  @private
             */
            forget = function () {
                if (hasHistoryApi) {
                    forgetPopState();
                } else {
                    if (hasHashChange) {
                        forgetHashChange();
                    }
                }
            },
            /**
             *
             *  @name module:Router:listen
             *  @method
             *  @private
             */
            listen = function () {
                if (hasHistoryApi) {
                    listenPopState();
                } else {
                    if (hasHashChange) {
                        listenHashChange();
                    }
                }
            },
            exports = {
                /**
                 *
                 *  @name module:Router:setLocationHash
                 *  @method
                 *  @public
                 */
                setLocationHash: function (value) {
                    win.location.hash = value;
                },
                /**
                 *
                 *  @name module:Router:getLocationHash
                 *  @method
                 *  @public
                 */
                getLocationHash: function () {
                    return win.location.hash.substring(1);
                },
                /**
                 *
                 *  @name module:Router:addRoute
                 *  @method
                 *  @public
                 */
                addRoute: function (path, callback) {
                    routes[clearSlashes(path)] = callback;
                },
                /**
                 *
                 *  @name module:Router:addRoutes
                 *  @method
                 *  @public
                 */
                addRoutes: function (routes) {
                    Object.keys(routes).forEach(function(key) {
                        exports.addRoute(key, routes[key]);
                    });
                },
                /**
                 *
                 *  @name module:Router:removeRoute
                 *  @method
                 *  @public
                 */
                removeRoute: function (path) {
                    delete routes[path];
                },
                /**
                 *
                 *  @name module:Router:lookupRoute
                 *  @method
                 *  @public
                 */
                lookupRoute: function (path, data, refreshType) {
                    if (Check.isFunction(routes[path])) {
                        currentPath = path;
                        data.path = path;
                        data.refreshType = refreshType;
                        routes[path](data);
                    }
                },
                /**
                 *
                 *  @name module:Router:getCurrentPath
                 *  @method
                 *  @public
                 */
                getCurrentPath: function () {
                    return currentPath === '' ? '/' : currentPath;
                },
                /**
                 *
                 *  @name module:Router:navigate
                 *  @method
                 *  @public
                 */
                navigate: function (path, data, refreshType) {
                    this.lookupRoute(path, data, refreshType);
                    if (path === '/') {
                        path = '';
                    }
                    if (hasHistoryApi) {
                        history.pushState(null, '', path);
                    } else {
                        win.location.href = win.location.href.replace(/#(.*)$/, '') + '#' + path;
                    }
                    navigated = true;
                },
                /**
                 *
                 *  @name module:Router:route
                 *  @method
                 *  @public
                 */
                route: function (refreshType, data) {
                    var currentSegment = getCurrentSegment();
                    this.lookupRoute(currentSegment, data || {}, refreshType || 'browser');
                },
                /**
                 *
                 *  @name module:Router:pause
                 *  @method
                 *  @public
                 */
                pause: function () {
                    paused = true;
                    forget();
                },
                /**
                 *
                 *  @name module:Router:resume
                 *  @method
                 *  @public
                 */
                resume: function () {
                    if (paused === true) {
                        listen();
                        paused = false;
                    }
                },
                /**
                 *
                 *  @name module:Router:destroy
                 *  @method
                 *  @public
                 */
                destroy: function () {
                    forget();
                }
            };

        // Listen for location changes
        listen();

        return exports;
    };
});
