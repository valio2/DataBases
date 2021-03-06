'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Characteristics", deps: []
 * createTable "Phones", deps: []
 * createTable "phonesCharacteristics", deps: [Phones, Characteristics]
 * addIndex ["name","value"] to table "Characteristics"
 *
 **/

var info = {
    "revision": 1,
    "name": "created",
    "created": "2018-03-11T14:14:01.099Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Characteristics",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "value": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Phones",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "Model": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "defaultValue": "Не е уточнено"
                },
                "Dimensions": {
                    "type": Sequelize.STRING,
                    "allowNull": false,
                    "defaultValue": "Не е уточнено"
                },
                "Price": {
                    "type": Sequelize.INTEGER,
                    "allowNull": false,
                    "defaultValue": 0
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "phonesCharacteristics",
            {
                "PhoneId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Phones",
                        "key": "id"
                    },
                    "unique": "phonesCharacteristics_PhoneId_CharacteristicId_unique",
                    "primaryKey": true,
                    "allowNull": false
                },
                "CharacteristicId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Characteristics",
                        "key": "id"
                    },
                    "unique": "phonesCharacteristics_PhoneId_CharacteristicId_unique",
                    "primaryKey": true,
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "addIndex",
        params: [
            "Characteristics", ["name", "value"],
            {
                "indicesType": "UNIQUE"
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
