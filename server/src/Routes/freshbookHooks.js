const express = require('express');
const axios = require('axios');
const db = require('../db');
const Block = require('../Blockchain/block');

const Router = express.Router();
const createhook = require('./webhooks');

const urlHook = (account,id) => `https://api.freshbooks.com/events/account/${account}/events/callbacks/${id}`;
const urlVoice = (account,invoice) => `https://api.freshbooks.com/accounting/account/${account}/invoices/invoices/${invoice}`
const urlExp = (account,invoice) => `https://api.freshbooks.com/accounting/account/${account}/expenses/expenses/${invoice}`

Router.get('/total', async (req, res) => {
    let blockList = [];
    let totalInvoice = 0;
    let totalExpense = 0;
    const data = await new Promise((resolve, reject) => {
        db.ref('/size').once('value', function(snapshot){
            size = snapshot.val().size;

            db.ref('/Block').once('value', function(blocks){
                blockList = blocks;
            })

            for (let x = 0; x < size; x++){
                if (block.val().data.type === 'Invoice'){
                    totalInvoice = totalInvoice + blockList[x].val().data.amount;
                }
                else{
                    totalExpense = totalExpense + blockList[x].val().data.amount;
                }
            }
            resolve({totalInvoice, totalExpense});
        })
        
    })
    
    res.send(data);
});

Router.get('/validate', async (req, res) => {
    let isValidate = true;
    const data = await new Promise((resolve, reject) => {
        db.ref('/size').once('value', function(snapshot){
            size = snapshot.val().size;
            
            db.ref('/Block').once('value', function(blocks){
                for (let x = 1; x < size; x++){
                    const currentBlock = blocks.val()[x];
                    const previousBlock = blocks.val()[x-1];
                        if (currentBlock.hash !== currentBlock.calculateHash()) {
                            isValidate = false;
                            break;
                        }
                        if (currentBlock.previousHash !== previousBlock.hash) {
                            isValidate = false;
                            break;
                        }
                }
            })
            resolve(isValidate);
        })
        
    })
    
    res.send(data);
});

Router.get('/getBlocks', async (req, res) => {
    const data = await new Promise((resolve, reject) => {
        db.ref('/Block').once('value', function(blocks){
            resolve(blocks);
        })
    })
    res.send(data);
});

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
        type: 'Invoice'
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
        type: 'Expense'
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