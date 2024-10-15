const express = require('express')
const app = express()
const amqp = require('amqplib');
const queue = 'anubhav_fanout_queue';
const exchangeName = 'exchangeNameManyToMany'
const routingKey = 'user.created'; // Routing key for this producer

const port = 3000


app.get('/createUser', async (req, res) => {

    try {


        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertExchange(exchangeName, 'topic', { durable: true });

        const message = {name:'Lalji Yadav'}

        channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(message)));
        console.log('Producer 1: Message sent to exchange:', message);

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

