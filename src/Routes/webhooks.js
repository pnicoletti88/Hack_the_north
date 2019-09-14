const axios = require('axios');

const url = (accountID) => `https://api.freshbooks.com/events/account/${accountID}/events/callbacks`;

const createHook = async (action, accountID) => {
  console.log(process.env.BEARER);
  const result = await axios.post(`${url(accountID)}?Authorization: Bearer ${process.env.BEARER}`, {
    event: action,
    uri: `${process.env.uri}/hooks/${action}`,
  });
  console.log(result);
};

module.exports = createHook;
