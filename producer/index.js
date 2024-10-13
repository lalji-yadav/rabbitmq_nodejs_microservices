const express = require('express')
const app = express()
const amqplib = require('amqplib');
const queue = 'anubhav_queue';


const port = 3000


app.get('/createUser', async (req, res) => {

    // create user
    const data = { name: 'Lalji' }

    const conn = await amqplib.connect('amqp://localhost');
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);

    // Sender
    const ch2 = await conn.createChannel();

    let datares = ch2.sendToQueue(queue, Buffer.from(JSON.stringify(data)));

    // setInterval(() => {
    //     ch2.sendToQueue(queue, Buffer.from('something to do'));
    // }, 1000);


    console.log('data ---res>', datares)

    // store in DB or send rabbitmq using queue

    // res.send(data).json()

    // apply some validations




})

app.listen(port, () => {
    console.log(`Example app listening on port producer aA11 app ${port}`)
})

