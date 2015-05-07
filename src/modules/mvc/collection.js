/**
 *  Appshaper Collection Module
 *  @module Collection
 *  @desc Provides logic to manage a collection of Appshaper models.
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
    'appshaper/data/storage',
    'appshaper/mvc/model'
], function (
    Check,
    Helper,
    Storage,
    Model
) {
    'use strict';

    /**
     *  Definition Constructor
     *  @name module:Collection.Definition Constructor
     *  @method
     *  @public
     *  @param {Object} definition - The collection definition
     *  @return {Function} The Collection constructor
     */
    return function (name, definition) {

        var definitionModel = definition.model();

        /**
         *  Collection Constructor
         *  @name module:Collection.Collection Constructor
         *  @method
         *  @public
         *  @param {Array} models - The models you want to initially add to the collection.
         *  @return {Object} The collection her internal interface.
         */
        return function (models) {

            var exports,
                methods = Check.isObject(definition.methods) ? Helper.clone(definition.methods) : {},

                /**
                 *  Validates if all models in the collection meet the model definition.
                 *  @name module:Collection.checkModelDefinition
                 *  @method
                 *  @private
                 *  @throws 'model is invalid' if one of the models doesn't meet the definition.
                 */
                checkModelDefinition = function () {

                    // Iterate over the models and check if they meet their definition.
                    if (Check.isDefined(models)) {
                        models.forEach(function (model) {
                            if (!definitionModel.checkValid(model.getData())) {
                                throw new Error('model is invalid');
                            }
                        });
                    } else {
                        models = [];
                    }
                },

                /**
                 *  Creates a new storage entry if it doesn't exists yet, else it will retrieve the
                 *  saved data and convert it the model instances of the current definitionModel.
                 *  @name module:Collection.initDataStorage
                 *  @method
                 *  @private
                 */
                initDataStorage = function () {
                    if (definition.useStorage) {
                        if (!Storage.checkExists(name)) {
                            Storage.save(name, models);
                        } else {
                            var storageData = Storage.load(name);
                            storageData.forEach(function (modelData) {
                                models.push(Model(name, definitionModel.getDefinition())(modelData));
                            });
                        }
                    }
                };

            // Check if the models passed in the constructor meet the model definition.
            checkModelDefinition();

            // Initialize data storage storage.
            initDataStorage();

            // Define the module her internal interface
            exports = {

                /**
                 *  Adds a new model to the collection.
                 *  @name module:Collection.add
                 *  @method
                 *  @public
                 */
                add: function (model) {
                    if (!definitionModel.checkValid(model.getData())) {
                        throw new Error('model is invalid');
                    }
                    models.push(model);
                    exports.save();
                },

                /**
                 *  Saves the current collection.
                 *  @name module:Collection.save
                 *  @method
                 *  @public
                 */
                save: function () {
                    if (definition.useStorage) {
                        Storage.save(name, this.getFlatData());
                    }
                },

                /**
                 *  Removes a model from the collection.
                 *  @name module:Collection.remove
                 *  @method
                 *  @public
                 *  @param {Object} model: A reference to the model instance you want to remove from
                 *  the collection.
                 */
                remove: function (model) {
                    var returnValue;
                    return models.every(function (savedModel, i) {
                        if (model === savedModel) {
                            models.splice(i, 1);
                            returnValue = false;
                            exports.save();
                        } else {
                            returnValue = true;
                        }
                        return returnValue;
                    });
                },

                /**
                 *  Returns the first model that contains the passed properties.
                 *  The every method will break a loop if it returns false. We return true if one
                 *  of the properties is not equal with the current models properties. Else we
                 *  return the found model.
                 *  @name module:Collection.get
                 *  @method
                 *  @public
                 *  @return {Object} The first model that contains the passed properties.
                 */
                get: function (properties, flat) {
                    var foundModel;

                    models.every(function (model) {
                        var modelData = model.getData(),
                            returnValue = false;

                        Object.keys(properties).forEach(function (property) {
                            if (modelData[property] !== properties[property]) {
                                returnValue = true;
                            }
                        });
                        if (returnValue === false) {
                            foundModel = flat === true ? model.getData() : model;
                        }
                        return returnValue;
                    });
                    return foundModel;
                },

                /**
                 *  Returns the models that contain the passed properties.
                 *  @name module:Collection.get
                 *  @method
                 *  @public
                 *  @return {Array} The models that contain the passed properties.
                 */
                getAll: function (properties, flat) {
                    var filteredModels = models.filter(function (model) {
                            var modelData = model.getData(),
                                returnValue = true;

                            Object.keys(properties).forEach(function (property) {
                                if (modelData[property] !== properties[property]) {
                                    returnValue = false;
                                }
                            });
                            return returnValue;
                        });

                    return flat ? filteredModels.map(function (model) {
                        return model.getData();
                    }) : filteredModels;
                },
                /**
                 *  Returns the models that are currently inside the collection.
                 *  @name module:Collection.getData
                 *  @method
                 *  @public
                 *  @return {Array} The models that are currently inside the collection.
                 */
                getData: function () {
                    return models;
                },
                /**
                 *  Returns the number of models that are currently inside the collection.
                 *  @name module:Collection.getLength
                 *  @method
                 *  @public
                 *  @return {Array} The number of models that are currently inside the collection.
                 */
                getLength: function () {
                    return models.length;
                },
                /**
                 *  returns an array with data objects instead of models (model.getData()).
                 *  @name module:Collection.getFlatData
                 *  @method
                 *  @public
                 *  @return {Array} A flat version of the models that are currently inside the
                 *  collection.
                 */
                getFlatData: function () {
                    return models.map(function (model) {
                        return model.getData();
                    });
                },
                data: models
            };

            // Return the external interface
            return Helper.combine(methods, exports);
        };
    };
});
