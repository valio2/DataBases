'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Os", deps: []
 * createTable "Brands", deps: []
 * createTable "Websites", deps: []
 * createTable "Phones", deps: [Websites, Brands, Os]
 *
 **/

var info = {
    "revision": 1,
    "name": "neshto",
    "created": "2018-03-06T15:42:30.920Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Os",
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
            "Brands",
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
            "Websites",
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
                "model": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "cpu": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "ram": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "Dual_sim": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "4G": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "Dimensions": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "Warranty": {
                    "type": Sequelize.STRING,
                    "allowNull": false
                },
                "Battery": {
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
                },
                "WebsiteId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Websites",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "BrandId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Brands",
                        "key": "id"
                    },
                    "allowNull": false
                },
                "OId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Os",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
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
