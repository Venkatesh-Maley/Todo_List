const express = require('express');
const mongoose = require('mongoose');
const Task = require('./model');
const cors = require('cors');


const app = express();


mongoose.connect('mongodb+srv://venkytodo:venkytodo@cluster0.d47qttq.mongodb.net/')
    .then(() => console.log('DB Connected...'))
    .catch(err => console.log(err));

app.use(express.json())

app.use(cors({
    origin : '*'
}))


app.post('/addtask', async (req, res) => {
    const { todo } = req.body;
    try {
        const newData = new Task({ todo: todo });
        await newData.save();
        return res.json(await Task.find());
    }catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

app.get('/gettask', async (req,res) => {
    try{
        return res.json(await Task.find())
    }
    catch(err){
        console.log(err)
    }
})

app.delete('/delete/:id', async (req,res) =>{
    try{
        await Task.findByIdAndDelete(req.params.id)
        return res.json(await Task.find())
    }catch{
        console.log(err)
    }
})


app.listen(5000, () => console.log('Server Running...'));
