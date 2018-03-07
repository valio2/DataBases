'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "name" on table "Os"
 * changeColumn "name" on table "Brands"
 * changeColumn "name" on table "Websites"
 *
 **/

var info = {
    "revision": 3,
    "name": "made",
    "created": "2018-03-07T15:40:53.783Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "Os",
            "name",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "unique": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Brands",
            "name",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "unique": true
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Websites",
            "name",
            {
                "type": Sequelize.STRING,
                "allowNull": false,
                "unique": true
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
