'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Superheroes", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "tes1",
    "created": "2018-02-26T15:15:02.569Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "Superheroes",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "name": {
                "type": Sequelize.STRING
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
}];

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
