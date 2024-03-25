import getConfig from 'next/config';
import mysql from 'mysql2';
// import { Sequelize, DataTypes } from 'sequelize';


const { serverRuntimeConfig } = getConfig();

export class DB {
    map(arg0: (item: any, idx: number) => import("react").JSX.Element): import("react").ReactNode {
      throw new Error('Method not implemented.');
    }

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

    // Customers

    async getAllLocations() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT sublocationName, address, cityName, sublocationID FROM location',
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

    async insertLocation(location: Location): Promise<void> {
        return new Promise<void>((resolve, reject) => {
          try {
            const values = [
              location.sublocationName,
              location.address,
              location.cityName,
              location.zip
            ];
      
            this.connection.execute(
              'INSERT INTO locations(sublocationName, address, cityName, zip) VALUES (?, ?, ?, ?)',
              values,
              function (err: any, results: any, fields: any) {
                if (err) {
                  reject(err);
                }
                resolve();
              }
            );
          } catch (err) {
            reject(err);
          }
        });
      }
      

    async insertCustomer(customer:Customer) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                await this.insertCustomerInfo(customer);
            } catch (err) {
                reject(err);
            }
        })
    }

    async insertCustomerInfo(customer: Customer) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                const values: Array<string | number | null> = [
                    customer.fName,
                    customer.mInitial,
                    customer.lName,
                    customer.suffix,
                    customer.phoneNum,
                    customer.loginId,
                    customer.username,
                    customer.email,
                    customer.address1,
                    customer.address2,
                    customer.city,
                    customer.state,
                    customer.zip,
                    1, // Assuming roleID
                    1  // Assuming activated
                ];
                console.log(values);
                console.log(customer.fName);
    
                // Check each value for undefined and replace it with null
                for (let i = 0; i < values.length; i++) {
                    if (values[i] === undefined) {
                        values[i] = null;
                    }
                }
    
                this.connection.execute(
                    'INSERT INTO customer (fName, mInitial, lName, suffix, phoneNum, loginId, username, email, address1, address2, city, state, zip, roleID, activated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                    values,
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
        });
    }

    async getAllCustomers() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT fName, lName, phoneNum, username, address1, city, state, zip, customerID FROM customer',
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

    async getCustomerByID(customerId: string) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT fName, lName, phoneNum, username, address1, city, state, zip, customerID FROM customer WHERE loginId = ?',
                    [customerId],
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
        });
    }

    // Employees

    async getAllEmployees() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT employeeID, roleID, username, fullname, office FROM employees',
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

    async insertEmployee(employee: Employee) {
        return new Promise(async (resolve, reject) => {
            try {
                const values = [
                    employee.roleID,
                    employee.username,
                    employee.fullname,
                    employee.office
                ];
    
                this.connection.execute(
                    'INSERT INTO employees(roleID, username, fullname, office) VALUES (?, ?, ?, ?)',
                    values,
                    function (err:any, results:any, fields:any) {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    }
                );
            } catch (err) {
                reject(err);
            }
        });
    }
    
    

    //Cars

    async getAllCars() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT * FROM cars',
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

    async insertCar(car: Car) {
        return new Promise(async (resolve, reject) => {
            try {
                const values = [
                    car.carType, 
                    car.battery,
                    car.status,
                    car.reserved,
                    car.sublocationID
                ];
    
                this.connection.execute(
                    'INSERT INTO cars(carType, battery, status, reserved, sublocationID) VALUES (?, ?, ?, ?, ?)',
                    values,
                    function (err:any, results:any, fields:any) {
                        if (err) {
                            reject(err);
                        }
                        resolve(results);
                    }
                );
            } catch (err) {
                reject(err);
            } finally {
                this.connection.end(); // Close the connection
            }
        });
    }

    async getAllFAQ() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT * FROM faq',
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

    // Function to get user role by user ID
    async getUserRole(userID: any) {
        return new Promise((resolve, reject) => {
            try {
                this.connection.query('SELECT roleID FROM users WHERE userId = ?', [userID], (err:any, results:any) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (results.length > 0) {
                            resolve(results[0].roleID);
                        } else {
                            reject(new Error('User not found'));
                        }
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}



export interface Customer {
    fName: string;
    mInitial: string;
    lName: string;
    suffix: string;
    phoneNum: string;
    loginId: string,
    username: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
}
export interface Employee {
    roleID: number;
    username: string;
    fullname: string;
    office?: string | null; // Optional field
}

interface FAQ {
    faqID: number;
    faqQuestion: string | null;
    faqAnswer: string | null;
    employeeAdded: number | null;
  }

interface Car {
    carType: string;
    battery: number;
    status: string | null;
    reserved: number;
    sublocationID: number;
  }
  
  interface Location {
    sublocationID: number;
    sublocationName: string;
    address: string;
    cityName: string;
    zip: string;
  }
  

// export interface InsertCustomer extends Customer {
//     password: string;
// }


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
