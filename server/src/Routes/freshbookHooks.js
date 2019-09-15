const express = require('express');
const axios = require('axios');

const Router = express.Router();
const createhook = require('./webhooks');

const urlHook = (account,id) => `https://api.freshbooks.com/events/account/${account}/events/callbacks/${id}`;
const urlVoice = (account,invoice) => `https://api.freshbooks.com/accounting/account/${account}/invoices/invoices/${invoice}`
const urlExp = (account,invoice) => `https://api.freshbooks.com/accounting/account/${account}/expenses/expenses/${invoice}`


Router.post('/invoice', async (req, res) => {
    res.send();
    const invoiceToken = req.body.object_id;
    const accountID = req.body.account_id;
    console.log(urlVoice(accountID, invoiceToken));
    const result = await axios.get(urlVoice(accountID, invoiceToken), {
        headers:{
            Authorization: `Bearer ${process.env.BEARER}`
        }
    })
    const invoice = result.data.response.result.invoice;
    
});

Router.post('/expense', async (req, res) => {
    res.send();
    const expenseToken = req.body.object_id;
    const accountID = req.body.account_id;
    const result = await axios.get(urlExp(accountID, expenseToken), {
        headers:{
            Authorization: `Bearer ${process.env.BEARER}`
        }
    })
    const expense = result.data.response.result.expense;
    
});

Router.get('/totals', async (req, res) => {
    console.log('hello');
    const result = await axios.get('https://api.freshbooks.com/accounting/account/n7nxNe/reports/accounting/profitloss_entity', {
        headers:{
            Authorization: `Bearer aa694c1478b49f7499e5ebc9957afddf67a7c047b15f70652a6642f70ca38fde`
        }        
    })

    incomeTotal = result.data.response.result.profitloss.income[0].total.amount;
    expensesTotal = result.data.response.result.profitloss.expenses[0].total.amount;

    res.send({
        expenses: expensesTotal,
        income: incomeTotal
    });

});

module.exports = Router;

/*
const { verifier, object_id } = req.body;
    console.log(url("n7nxNe", object_id));
    const result = await axios.put(url("n7nxNe", object_id), {
        'callback': {
            'callback_id': object_id,
            'verifier': verifier
        }
    }, {
        headers:{
            Authorization: "Bearer aa694c1478b49f7499e5ebc9957afddf67a7c047b15f70652a6642f70ca38fde"
        }
    });
    console.log(result);


*/