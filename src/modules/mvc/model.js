/**
 *  Appshaper Model Module
 *  @module Model
 *  @desc Represents an Appshaper data model providing a model fields.
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
    'appshaper/utils/helper',
    'handlebars',
    'appshaper/pubsub'
], function (
    Check,
    Helper,
    handlebars,
    Pubsub
) {
    'use strict';

    /**
     *  Model Definition Constructor
     *  @name module:View.DefinitionConstructor
     *  @method
     *  @public
     */
    return function (name, definition) {
        var hasDefinition = Check.isObject(definition),
            fields = hasDefinition === true ? definition.fields : void 0;

        /**
         *  Model Instance Constructor
         *  @name module:View.InstanceConstructor
         *  @method
         *  @public
         */
        return function (initialData) {
            var data = initialData || {},
                /**
                 *
                 *  @name module:Model:methods
                 *  @variable
                 *  @private
                 */
                methods = hasDefinition === true && Check.isObject(definition.methods) ?
                    Helper.clone(definition.methods) : {},
                /**
                 *
                 *  @name module:Model:checkValid
                 *  @method
                 *  @private
                 */
                checkValid = function (field, value) {
                    var returnValue;
                    if (fields[field] === 'dynamic') {
                        returnValue = true;
                    } else {
                        returnValue = (Object.prototype.toString.call(value)).toLowerCase() ===
                            ('[object ' + fields[field] + ']').toLowerCase();
                    }
                    return returnValue;
                },
                /**
                 *
                 *  @name module:Model:checkValidObject
                 *  @method
                 *  @private
                 */
                checkValidObject = function (object) {
                    return Object.keys(object).every(function (field) {
                        return checkValid(field, object[field]);
                    });
                },
                /**
                 *
                 *  @name module:Model:exports
                 *  @variable
                 *  @public
                 */
                exports = {
                    /**
                     *
                     *  @name module:Model:data
                     *  @variable
                     *  @public
                     */
                    data: data,
                    /**
                     *
                     *  @name module:Model:set
                     *  @method
                     *  @public
                     */
                    set: function (field, value) {
                        if (Check.isString(field)) {
                            if (!Check.isUndefined(value)) {
                                if (Check.isUndefined(fields) || (!Check.isUndefined(fields[field])
                                        && checkValid(field, value))) {
                                    data[field] = value;
                                    Pubsub.fire('model.' + name + '.set', {
                                        field: field,
                                        value: value
                                    });
                                } else {
                                    throw new Error('field ' + field + ' is invalid');
                                }
                            } else {
                                throw new Error('pass a value');
                            }
                        } else {
                            throw new Error('field should be a String');
                        }
                    },
                    /**
                     *
                     *  @name module:Model:get
                     *  @method
                     *  @public
                     */
                    get: function (field) {
                        if (Check.isString(field)) {
                            if (!Check.isUndefined(data[field])) {
                                Pubsub.fire('model.' + name + '.get', {
                                    field: field,
                                    value: data[field]
                                });
                                return data[field];
                            }
                            throw new Error('field ' + field + ' is not found');
                        } else {
                            throw new Error('field should be a String');
                        }
                    },
                    /**
                     *
                     *  @name module:Model:getData
                     *  @method
                     *  @public
                     */
                    getData: function () {
                        return data;
                    },
                    /**
                     *
                     *  @name module:Model:setData
                     *  @method
                     *  @public
                     */
                    setData: function (values) {
                        Object.keys(values).forEach(function (field) {
                            exports.set(field, values[field]);
                        });
                    },
                    /**
                     *
                     *  @name module:Model:checkValid
                     *  @method
                     *  @public
                     */
                    checkValid: function (data) {
                        return checkValidObject(data);
                    },
                    /**
                     *
                     *  @name module:Model:getDefinition
                     *  @method
                     *  @public
                     */
                    getDefinition: function () {
                        return definition;
                    }
                };

            if (!Check.isUndefined(initialData) && !Check.isUndefined(fields) &&
                !exports.checkValid(initialData)) {
                throw new Error('Invalid initial data passed');
            }

            return Helper.combine(methods, exports);
        };
    };
});
