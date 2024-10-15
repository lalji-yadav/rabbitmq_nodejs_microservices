const express = require('express')
const app = express()
const amqplib = require('amqplib');
const queueName = 'anubhav_direct_queue';
const routingKey = 'task_queue_key';
const exchangeName = 'exchangeNameManyToOne'

const port = 3002


// app.get('/saveData', async (req, res) => {

//     const conn = await amqplib.connect('amqp://localhost');
//     const channel = await conn.createChannel();
//     // await channel.assertQueue(queue);

//     try {
//         const connection = await amqp.connect(rabbitMqUrl);
//         const channel = await connection.createChannel();

//         await channel.assertExchange(exchangeName, 'direct', { durable: true });
//         await channel.assertQueue(queueName, { durable: true });

//         // Bind the queue to the exchange with the routing key
//         await channel.bindQueue(queueName, exchangeName, routingKey);
//         console.log(`Consumer: Waiting for messages in ${queueName}...`);

//         // Consume messages from the queue
//         channel.consume(queueName, (msg) => {
//             if (msg !== null) {
//                 const message = JSON.parse(msg.content.toString());
//                 console.log('Consumer: Message received:', message);
//                 channel.ack(msg);  // Acknowledge the message
//             }
//         });
//     } catch (error) {
//         console.error('Error in Consumer:', error);
//     }

// })


// automatic proccess producer data

async function consumerDataProcess() {

    const conn = await amqplib.connect('amqp://localhost');
    const channel = await conn.createChannel();
    // await channel.assertQueue(queue);

    try {
        
        await channel.assertExchange(exchangeName, 'direct', { durable: true });
        await channel.assertQueue(queueName, { durable: true });
    
        // Bind the queue to the exchange with the routing key
        await channel.bindQueue(queueName, exchangeName, routingKey);
        console.log(`Consumer: Waiting for messages in ${queueName}...`);
    
        // Consume messages from the queue
        channel.consume(queueName, (msg) => {
          if (msg !== null) {
            const message = JSON.parse(msg.content.toString());
            console.log('Consumer: Message received:', message);
            channel.ack(msg);  // Acknowledge the message
          }
        });
      } catch (error) {
        console.error('Error in Consumer:', error);
      }

}

consumerDataProcess()


app.listen(port, () => {
    console.log(`Example app listening on port consumer app ${port}`)
})
