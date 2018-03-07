'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "Sd_slot" to table "Phones"
 * addColumn "Weight" to table "Phones"
 * changeColumn "Battery" on table "Phones"
 * changeColumn "Warranty" on table "Phones"
 * changeColumn "Dimensions" on table "Phones"
 * changeColumn "4G" on table "Phones"
 * changeColumn "Dual_sim" on table "Phones"
 * changeColumn "ram" on table "Phones"
 * changeColumn "cpu" on table "Phones"
 * changeColumn "model" on table "Phones"
 *
 **/

var info = {
    "revision": 2,
    "name": "added 2 properties to Phones table",
    "created": "2018-03-07T15:24:01.143Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "addColumn",
        params: [
            "Phones",
            "Sd_slot",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Phones",
            "Weight",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "Battery",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "Warranty",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "Dimensions",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "4G",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "Dual_sim",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "ram",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "cpu",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Phones",
            "model",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "defaultValue": "Не е уточнено"
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
