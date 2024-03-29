const db = require('../models/database.js');

const userController = {};

// save new users to database
userController.signup = async (req, res, next) => {
  console.log('entering signup middleware');
  try {
    const queryText = `INSERT INTO users (email, first_name, last_name, password, phone_number, is_admin)
                        VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [req.body.email, req.body.firstName, req.body.lastName, req.body.password, req.body.phoneNum, req.body.isAdmin];

    for (let i = 0; i <  4; i++) {
      if (values[i] === '' || values[i] === null || values[i] === undefined) {
        const error = {
          log: 'Error at userController.signup middleware: ' + err,
          status: 400,
          message: {err: 'Please fill out all fields to sign up'}
        }
        return next(error);
      }
    }

    const createResponse = await db.query(queryText, values);
    const queryTextCreate = `
    SELECT * FROM users WHERE email=$1;
    `
    const newUser = await db.query(queryTextCreate, [req.body.email]);
    console.log('newUser: ', newUser);
    res.locals.newUser = newUser.rows[0]; // TO-DO: replace 'test' string with response from database
    console.log('created user: ', res.locals.newUser)
    return next();
  } catch(err) {
    const error = {
      log: 'Error at userController.signup middleware: ' + err,
      status: 400,
      message: {err: 'Unable to create user'}
    }
    return next(error);
  }
}

// log user in
userController.login = async (req, res, next) => {
  console.log('entering login middleware');
  try {
    const queryText = 'SELECT * FROM users WHERE email=$1 AND password=$2;';
    const values = [req.body.email, req.body.password];
    const queryResult = await db.query(queryText, values);
    console.log(queryResult.rows[0]);
    
    res.locals.loggedIn = queryResult.rows[0];
    if (res.locals.loggedIn === undefined) {
      res.locals.loggedIn = {err: 'User could not be verified'};
    }
    return next();
  } catch(err) {
    const error = {
      log: 'Error at userController.login middleware: ' + err,
      status: 400,
      message: {err: 'Unable to log in'}
    }
    return next(error);
  }
}

module.exports = userController;