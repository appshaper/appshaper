/**
 *  Appshaper Storage Module
 *  @module Storage
 *  @desc Provides logic to manage local storage and uses a storage fallback if local storage is not
 *  supported.
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

    var storage,
        /**
         *  Provides memory storage as a fallback for local storage.
         *  @name module:Storage:storageFallback
         *  @method
         *  @private
         */
        storageFallBack = {
            setItem: function (key, value) {
                var i,
                    count = 0;

                storageFallBack[key] = value;

                for (i in storageFallBack) {
                    if (storageFallBack.hasOwnProperty(i)) {
                        ++count;
                    }
                }
                this.length = count;
            },
            getItem: function (key) {
                var item = storageFallBack[key];
                return Check.isDefined(item) ? item : null;
            },
            removeItem: function (key) {
                delete storageFallBack[key];
            },
            clear: function () {
                this.length = 0;
            },
            length: 0
        };

    try {
        storage = window.localStorage;
        if (Check.isUndefined(storage)) {
            throw 'No local storage available';
        }
    } catch (e) {
        storage = storageFallBack;
    }
    return {
        /**
         *  Saves an item to storage.
         *  @name module:Storage:save
         *  @method
         *  @public
         */
        save: function (elementKey, element) {
            var storageItem;
            if (!Check.isString(elementKey)) {
                elementKey = JSON.stringify(elementKey);
            }
            storageItem = {
                data: element
            };
            storage.setItem(elementKey, JSON.stringify(storageItem));
        },
        /**
         *  Loads an item from storage.
         *  @name module:Storage:load
         *  @method
         *  @public
         */
        load: function (elementKey, defaultValue) {
            var element = storage.getItem(elementKey);
            if (Check.isNull(element)) {
                return defaultValue;
            }
            element = JSON.parse(element);
            return element.data;
        },
        /**
         *  Checks if an item key already exists.
         *  @name module:Storage:checkExists
         *  @method
         *  @public
         */
        checkExists: function (elementKey) {
            var element = storage.getItem(elementKey),
                exists = false;

            if (!Check.isNull(element)) {
                exists = true;
            }
            return exists;
        },
        /**
         *  Removes an item from storage.
         *  @name module:Storage:remove
         *  @method
         *  @public
         */
        remove: function (elementKey) {
            storage.removeItem(elementKey);
        },
        /**
         *  Clears all items from storage.
         *  @name module:Storage:clear
         *  @method
         *  @public
         */
        clear: function () {
            storage.clear();
        },
        /**
         *  Checks if the storage is empty.
         *  @name module:Storage:isEmpty
         *  @method
         *  @public
         */
        isEmpty: function () {
            return storage.length === 0;
        }
    };
});
