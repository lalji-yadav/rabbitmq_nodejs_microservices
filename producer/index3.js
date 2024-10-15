const express = require('express')
const app = express()
const amqp = require('amqplib');
const queue = 'anubhav_fanout_queue';
const exchangeName = 'exchangeNameManyToOne'
const routingKey = 'task_queue_key';

const port = 3000


app.get('/createUser', async (req, res) => {


    try {

        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertExchange(exchangeName, 'direct', { durable: true });

        const message = {name: "Lalji Yadav"}

        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
        console.log('Producer 1: Message sent to exchange:', message);

        return message

        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Error in Producer 1:', error);
    }


})



app.listen(port, () => {
    console.log(`Example app listening on port producer aA11 app ${port}`)
})

