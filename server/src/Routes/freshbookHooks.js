const express = require('express');
const axios = require('axios');
const db = require('../db');
const Block = require('../Blockchain/block');

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

    dataEncode = {
        amount: invoice.amount.amount,
        organization: invoice.organization,
        type: "Invoice"
    }

    db.ref('/size').once('value', function(snapshot){
        var dt = new Date();
        var timestamp1 = dt.toString();
        let size = snapshot.val().size;

        if(size === 0){
            let firstBlock = new Block(0, timestamp1, 'Genesis Block', '0');
            
            db.ref('Block/' + firstBlock.index).set({
                timestamp: timestamp1,
                data: dataEncode,
                previousHash: 0,
                hash: firstBlock.hash,
                nonce: 0
            });

            db.ref('size/').set({
                size: 1
            })
        }
        else{
            db.ref('Block/' + (size-1)).once('value', function(prevBlock){
                let newBlock = new Block(size, timestamp1, dataEncode, prevBlock.val().hash);
                newBlock.mineBlock(4);

                db.ref('Block/' + newBlock.index).set({
                    timestamp: newBlock.timestamp,
                    data: newBlock.data,
                    previousHash: newBlock.previousHash,
                    hash: newBlock.hash,
                    nonce: 0
                });

                db.ref('size/').set({
                    size: (size+1)
                })
            })
        }
    })
    
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
    
    dataEncode = {
        amount: expense.amount.amount,
        organization: expense.vendor,
        type: "Expense"
    }

    db.ref('/size').once('value', function(snapshot){
        var dt = new Date();
        var timestamp1 = dt.toString();
        let size = snapshot.val().size;

        if(size === 0){
            let firstBlock = new Block(0, timestamp1, 'Genesis Block', '0');
            
            db.ref('Block/' + firstBlock.index).set({
                timestamp: timestamp1,
                data: dataEncode,
                previousHash: 0,
                hash: firstBlock.hash,
                nonce: 0
            });

            db.ref('size/').set({
                size: 1
            })
        }
        else{
            db.ref('Block/' + (size-1)).once('value', function(prevBlock){
                let newBlock = new Block(size, timestamp1, dataEncode, prevBlock.val().hash);
                newBlock.mineBlock(4);

                db.ref('Block/' + newBlock.index).set({
                    timestamp: newBlock.timestamp,
                    data: newBlock.data,
                    previousHash: newBlock.previousHash,
                    hash: newBlock.hash,
                    nonce: 0
                });

                db.ref('size/').set({
                    size: (size+1)
                })
            })
        }
    })
});

Router.get('/totals', async (req, res) => {
    const result = await axios.get('https://api.freshbooks.com/accounting/account/n7nxNe/reports/accounting/profitloss_entity?start_date=2019-01-01&end_date=2019-10-01', {
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