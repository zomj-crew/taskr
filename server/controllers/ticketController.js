const db = require('../models/database.js');

const ticketController = {}

ticketController.getUserTickets = async (req, res, next) => {
  console.log('entering getuserTickets middleware');
  try {
    // TO-DO db query here!
    const queryText = `SELECT * FROM tickets WHERE user_id=$1;`;
    const values = [req.headers.id]
    const userTickets = await db.query(queryText, values);
    console.log(userTickets);
    res.locals.userTickets = userTickets.rows; // TO-DO: replace 'test' string with db response
    return next();
  } catch(err) {
    const error = {
      log: 'Error at ticketController.getUserTickets middleware: ' + err,
      status: 400,
      message: {err: 'Unable to get user tickets'}
    }
    return next(error);
  }
}

ticketController.getAdminTickets = async (req, res, next) => {
  console.log('entering getuserTickets middleware');
  try {
    const queryText = `SELECT * FROM tickets;`;
    const allTickets = await db.query(queryText);
    res.locals.adminTickets = allTickets.rows; // TO-DO: replace 'test' string with db response
    return next();
  } catch(err) {
    const error = {
      log: 'Error at ticketController.getAdminTickets middleware: ' + err,
      status: 400,
      message: {err: 'Unable to get admin tickets'}
    }
    return next(error);
  }
}

ticketController.createTicket = async (req, res, next) => {
  console.log('entering createTicket middleware');
  try {
    // TO-DO db query here!
    const queryText = `INSERT INTO tickets (title, description, status, priority, user_id)
    VALUES ($1, $2, $3, $4, $5);`;
    const values = [req.body.title, req.body.description, req.body.status, req.body.priority, req.body.user_id];
    const newTicket = await db.query(queryText, values);
    return next();
  } catch(err) {
    const error = {
      log: 'Error at ticketController.newTicket middleware: ' + err,
      status: 400,
      message: {err: 'Unable to create ticket.'}
    }
    return next(error);
  }
}

ticketController.deleteTicket = async (req, res, next) => {
  console.log('entering deleteTicket middleware');
  try {
    // TO-DO db query here!
    const queryTextDelete = `
    SELECT * FROM tickets WHERE id=$1;
    `
    const queryText = `
    DELETE FROM tickets WHERE id=$1;
    `
    const values = [req.body.ticketId];
    const deletedTicket = await db.query(queryTextDelete, values);
    const deleteResponse = await db.query(queryText, values);
    res.locals.deletedTicket = deletedTicket.rows; // TO-DO: replace 'test' string with db response
    return next();
  } catch(err) {
    const error = {
      log: 'Error at ticketController.deletedTicket middleware: ' + err,
      status: 400,
      message: {err: 'Unable to delete ticket.'}
    }
    return next(error);
  }
}

ticketController.updateTicket = async (req, res, next) => {
  console.log('entering updateTicket middleware');
  try {
    // TO-DO db query here!
    const queryText = `
    UPDATE tickets
    SET status=$1
    WHERE id=$2;
    `;
    const values = [req.body.newStatus, req.body.ticketId];
    const updateResponse = await db.query(queryText, values);
    const queryTextUpdated = `
    SELECT * FROM tickets WHERE id=$1;
    `
    const updatedTicket = await db.query(queryTextUpdated, [req.body.ticketId]);
    res.locals.updatedTicket = updatedTicket.rows[0]; // TO-DO: replace test string with db response
    return next();
  } catch(err) {
    const error = {
      log: 'Error at ticketController.updateTicket middleware: ' + err,
      status: 400,
      message: {err: 'Unable to update ticket.'}
    }
    return next(error);
  }
}



module.exports =  ticketController;