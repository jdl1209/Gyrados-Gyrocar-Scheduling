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
        const user = "admin";
        const password = "password";
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

    // Location stuff

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

    async insertLocation(location: Location): Promise<void> {
        return new Promise<void>((resolve, reject) => {
          try {
            const values = [
              location.locationName,
              location.locationArea,
              location.address,
              location.cityName,
              location.state,
              location.lat,
              location.lon
            ];
      
            this.connection.execute(
              'INSERT INTO locations(locationName, locationArea, address, cityName, state, lat, lon) VALUES (?, ?, ?, ?, ?, ?, ?)',
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

    async removeLocationByName(locationName: string) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'DELETE FROM location WHERE locationName = ?',
                    [locationName],
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
      
    // Customer

    async insertCustomer(customer:User) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                await this.insertCustomerInfo(customer);
            } catch (err) {
                reject(err);
            }
        })
    }

    async insertCustomerInfo(customer: User) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                const values: Array<string | number | null> = [
                    customer.userID,
                    1, // Assuming roleID
                    customer.username,
                    customer.fName,
                    customer.mInitial,
                    customer.lName,
                    customer.suffix,
                    customer.phoneNum,
                    customer.email,
                    customer.address1,
                    customer.address2,
                    customer.city,
                    customer.state,
                    customer.zip,
                    0  // Assuming not activated
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
                    'INSERT INTO users (userID, roleID, username, fName, mInitial, lName, suffix, phoneNum, email, address1, address2, city, state, zip, roleID, activated) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
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
                    'SELECT * FROM users WHERE roleID = 1',
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

    async getUserByID(userID: string) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT * FROM user WHERE userID = ?',
                    [userID],
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

    async getUserByUsername(username: string) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT * FROM user WHERE username = ?',
                    [username],
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

    async getUnactivateUsers() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT * FROM user WHERE activated = 0',
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

    // Suspended Users

    async insertSuspendedUser(user: SuspendedUser) {
        return new Promise(async (resolve, reject) => {
            try {
                const values = [
                    user.userID
                ];
    
                this.connection.execute(
                    'INSERT INTO suspended_users VALUES (?)',
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

    // Can return the count 
    async getIfSuspendedUsers(userID: SuspendedUser) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT COUNT(*) FROM suspend_user WHERE userID = ?',
                    [userID],
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

    async insertEmployee(employee: User) {
        return new Promise(async (resolve, reject) => {
            try {
                const values = [
                    employee.userID,
                    employee.roleID,
                    employee.username,
                    employee.fName,
                    employee.lName,
                    employee.email,
                    employee.office
                ];
    
                this.connection.execute(
                    'INSERT INTO users(userID, roleID, username, fName, lName, email, office) VALUES (?, ?, ?, ?, ?, ?, ?)',
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

    async getCarCount() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT COUNT(*) FROM cars',
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

    async getCarCountByLocationID(locationID: string) {
        return new Promise<any>(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT COUNT(*) FROM cars WHERE locationID = ?',
                    [locationID],
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

    async removeCarByCarID(carID: string) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'DELETE FROM cars WHERE carID = ?',
                    [carID],
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
    
    async insertCar(car: Car) {
        return new Promise(async (resolve, reject) => {
            try {
                const values = [
                    car.carType, 
                    car.battery,
                    car.status,
                    car.reserved,
                    car.currentLocationID
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

    // Locations

    async getLocationIDByLocationName(locationName: string) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT locationID FROM location WHERE locationName = ?',
                    [locationName],
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

    // Reservations

    async getReservationsByLocationID(locationID: string) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT * FROM reservation WHERE locationID = ?',
                    [locationID],
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

    async insertReservation(reservation: Reservation) {
        return new Promise(async (resolve, reject) => {
            try {
                const values = [
                    reservation.userID,
                    reservation.carID,
                    reservation.dateCreated,
                    reservation.locationID,
                    reservation.locationIDToReturn,
                    reservation.timeBegin,
                    reservation.timeEnd,
                    reservation.paid
                ];
    
                this.connection.execute(
                    'INSERT INTO reservation(customerID, carID, dateCreated, locationID, locationIDToReturn, timeBegin, timeEnd, paid) VALUES (?, ?, CURDATE(), ?, ?, ?, ?, ?)',
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

    async getReservationByID(userID: string) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT * FROM reservation WHERE userID = ?',
                    [userID],
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

    async getReservationCountByID(userID: string) {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT COUNT(*) FROM reservation WHERE userID = ?',
                    [userID],
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

    // For booking

    async getReservationCountToReturn(locationID: string, locationIDToReturn: string, timeEnd: string) {
        return new Promise<number>(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT COUNT(*) FROM reservation WHERE locationID != ? AND locationIDToReturn = ? AND timeEnd <= ?',
                    [locationID, locationIDToReturn, timeEnd],
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

    async getReservationCountNotToReturn(locationIDToReturn: string, locationID: string, timeEnd: string) {
        return new Promise<number>(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT COUNT(*) FROM reservation WHERE locationIDToReturn != ? AND locationID = ? AND timeEnd <= ?',
                    [locationIDToReturn, locationID, timeEnd],
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

    async checkBookingStatus(locationID: string, bookingTime:string) {
        return new Promise(async (resolve: any, reject: any) => {

            try{
                
                let carCount = this.getCarCountByLocationID(locationID);
                let reservationCountToreturn = this.getReservationCountToReturn(locationID, locationID, bookingTime);
                let reservationCountNotReturn = this.getReservationCountNotToReturn(locationID, locationID, bookingTime);

                let totalCarsAvailable = await carCount -  await reservationCountNotReturn + await reservationCountToreturn;
                if (await carCount === 0){

                    reject("This location does not have bookable cars at this time!");

                }
                else if (totalCarsAvailable <= 0){

                    reject("This location does not have bookable cars at this time!");

                }
                else{

                    resolve("This location has cars that are able to be booked!")

                }

            }catch(err){
                reject(err);
            }
        
        });
    }

    // gets the next available car for booking

    async getNextAvailableCar(locationID: string, timeEnd: string){
        return new Promise(async (resolve: any, reject: any) => {
            try{

                this.connection.query(
                    'SELECT carID FROM cars WHERE EXISTS (SELECT * FROM reservation WHERE cars.carID = reservation.carID AND locationIDToReturn = ? AND timeEnd <= ?) UNION SELECT carID FROM cars WHERE currentLocationID = ? AND NOT EXISTS (SELECT * FROM reservation WHERE cars.carID = reservation.carID AND locationID = ? and locationIDToReturn != ? AND timeEnd <= ? ) ORDER BY carID ASC LIMIT 1;',
                    [locationID, timeEnd, locationID, locationID, locationID, timeEnd],
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
    
    // FAQ

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

    // Days

    async getAllDays() {
        return new Promise(async (resolve: any, reject: any) => {
            try {
                this.connection.query(
                    'SELECT * FROM days',
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

// Begin Interfaces
interface Roles {
    roleID: number;
    rName: string;
    description: string;
}

export interface User {
    userID: string;
    roleID: number;
    username: string;
    fName: string;
    mInitial: string | null;
    lName: string;
    suffix: string | null;
    phoneNum: string | null;
    email: string;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    activated: number | null;
    office: string | null;
}

interface CustomerCredit {
    userID: string;
    hashedCreditNumber: string;
    hashedSecurity: string;
    hashedZipcode: string;
    hashedExpiration: string;
    hashedDriversID: string;
}

interface SuspendedUser {
    userID: string;
}
  
interface Location {
    locationName: string;
    locationArea: string;
    address: string | null;
    cityName: string;
    state: string;
    lat: number;
    lon: number;
}

interface Car {
    carType: string;
    battery: number;
    status: string | null;
    reserved: number;
    currentLocationID: number;
}

interface Jobs{
    userID: string | null;
    carID: number;
    task: string;
    notes: string;
    jTimeDate: Date;
}

interface Reservation {
    userID: string;
    carID: number;
    dateCreated: string;
    locationID: number;
    locationIDToReturn: number;
    timeBegin: string;
    timeEnd: string;
    paid: boolean;
}

interface FAQ {
    faqQuestion: string;
    faqAnswer: string;
    userID: string;
}

interface Days {
    day: Date;
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
