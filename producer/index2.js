const express = require('express')
const app = express()
const amqplib = require('amqplib');
const queue = 'anubhav_fanout_queue';


const port = 3000


app.get('/createUser', async (req, res) => {


    try {

        // create user
        const data = { name: 'Lalji' }

        const conn = await amqplib.connect('amqp://localhost');
        const ch1 = await conn.createChannel();
        await ch1.assertExchange('exchangeName', 'fanout', { durable: true });

        let datares = ch1.publish('exchangeName', '', Buffer.from(JSON.stringify(data)));

        console.log('Message sent to exchange:', datares)

        // const connection = await amqp.connect(rabbitMqUrl);
        // const channel = await connection.createChannel();
        // await channel.assertExchange(exchangeName, 'fanout', { durable: true });
        // channel.publish(exchangeName, '', Buffer.from(JSON.stringify(message)));
        // console.log('Message sent to exchange:', message);

        if (datares == true) {

            console.error('processes in publishing message', datares);
            res.send('processes in publishing message').json()

        } else {

            console.error('Not process in publishing message', datares);

        }

        // setTimeout(() => {
        //     conn.close();
        // }, 500);

        // store in DB or send rabbitmq using queue
        // res.send(data).json()
        // apply some validations

    } catch (error) {

        console.error('Error in publishing message', error);

    }


})



app.listen(port, () => {
    console.log(`Example app listening on port producer aA11 app ${port}`)
})

