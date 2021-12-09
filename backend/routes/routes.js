const express = require('express');
const router = express.Router();
const Item = require('../models/ItemModels');



// * ===== get router ===== * //
router.get('/items', async (req, res) =>{
    const Items = await Item.find();
    res.json(Items);
    // .then((users) => res.json(users))
    // .catch((err) => res.status(400).json("Error: " + err));
});

// * ===== find by user name router ===== * //
router.get('/user-items',async (req, res) => {
    const userName = {
        user: req.query.user,
    }
    // ! for debugging
    // console.log(req);

    const userItems = await Item.find(userName);
    res.json(userItems);
})

// * ===== create router ===== * //
router.post('/new-item', async (req, res) => {
    const newItem = new Item ({
        user:req.body.user,
        todo: req.body.todo,
    })
    console.log(newItem);
    newItem
        .save()
        .then((user) => console.log("Added an item successfully"))
        .catch((err) => res.status(400).json('Error ' + err));
});

// * ===== delete router ===== * //
router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    // ! for debugging
    // console.log(req.params.id);
    Item.findByIdAndDelete({_id: id}, (req, res, err) => {
        if(!(err)) {
            console.log("deleted")
        } else {
            console.log(err);
        }
    });
});

// * ===== update router ===== * //
router.put("/update/:id", (req, res) => {
    const id = req.params.id;
    const updatedItem = {
        todo: req.body.todo,
    }
    Item.findByIdAndUpdate({_id:id}, {$set: updatedItem}, (req, res, err) => {
        if(!(err)) {
            console.log('updated successfully')
        } else {
            console.log(err)
        }
    })
    // ! for debugging
    // console.log(updatedItem + id);
})


module.exports = router



// * this is to hide password
// const bcrypt = require('bcrypt');
// const saltPassword = await bcrypt.genSalt(10);
// const securePassword = await bcrypt.hash(req.body.password, saltPassword);