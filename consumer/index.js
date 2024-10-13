const express = require('express')
const app = express()
const amqplib = require('amqplib');
const queue = 'anubhav_queue';

const port = 3001

app.get('/saveUser', async (req, res) => {

    const conn = await amqplib.connect('amqp://localhost');

    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);

    // Listener
    ch1.consume(queue, (msg) => {
        if (msg !== null) {
            console.log('Received:', msg.content.toString());
            ch1.ack(msg);
        } else {
            console.log('Consumer cancelled by server');
        }
    });


    res.send('Hello World! consumer app')

})

app.listen(port, () => {
    console.log(`Example app listening on port consumer app ${port}`)
})
