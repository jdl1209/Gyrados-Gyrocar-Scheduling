import getConfig from 'next/config';
import mysql from 'mysql2';
// import { Sequelize, DataTypes } from 'sequelize';


const { serverRuntimeConfig } = getConfig();

export class DB {

    public connection:any;
    public sequelize:any;
    public db:any;


    constructor(){
        // const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
        const host = "localhost";
        const user = "root";
        const password = "Samson@4656";
        const port = 3306;
        const database = "ROCHESTER";
        
        this.connection = mysql.createConnection({ host, port, user, password, database });
        // this.sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
        // this.db = {}
        // this.db = { Location:locationModel(this.sequelize) };

        // // sync all models with database
        // await this.sequelize.sync({ alter: true });
    }

    // async initialize(){
        
    // }

    async getAllLocations() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT sublocationName, address, cityName, zip, sublocationID FROM location',
                    function (err: any, results: any, fields: any) {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    }
                );
            } catch (err) {
                reject(err);
            }
        })
    }



    
}

// function locationModel(sequelize: Sequelize) {
//     const attributes = {
//         subLocationID: { type: DataTypes.INTEGER, allowNull: false },
//         subLocationName: { type: DataTypes.STRING, length:30, allowNull: false },
//         address: { type: DataTypes.STRING, length:400, allowNull: false },
//         cityName: { type: DataTypes.STRING, length:30, allowNull: false },
//         zip: { type: DataTypes.STRING, length:5, allowNull: false }

//     };

//     const options = {
//         defaultScope: {
//             // exclude password hash by default
//             attributes: { exclude: ['hash'] }
//         },
//         scopes: {
//             // include hash with this scope
//             withHash: { attributes: {}, }
//         }
//     };

//     return sequelize.define('Location', attributes);
// }
