const express = require('express')
const app = express()
const amqplib = require('amqplib');
const queue = 'anubhav_fanout_queue';

const port = 3002


app.get('/saveData', async (req, res) => {

    const conn = await amqplib.connect('amqp://localhost');
    const channel = await conn.createChannel();
    // await channel.assertQueue(queue);

    try {
        
        await channel.assertExchange('exchangeName', 'fanout', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        
        await channel.bindQueue(queue, 'exchangeName', '');
        console.log(`Consumer 1: Waiting for messages in ${queue}...`);
    
        channel.consume(queue, (msg) => {
          if (msg !== null) {
            const message = JSON.parse(msg.content.toString());
            console.log('Consumer 1: Message received:', message);
            channel.ack(msg);
          }
        });
      } catch (error) {
        console.error('Error in Consumer 1:', error);
      }

})


// automatic proccess producer data

async function consumerDataProcess() {

    const conn = await amqplib.connect('amqp://localhost');
    const channel = await conn.createChannel();
    // await channel.assertQueue(queue);

    try {
        
        await channel.assertExchange('exchangeName', 'fanout', { durable: true });
        await channel.assertQueue(queue, { durable: true });
        
        await channel.bindQueue(queue, 'exchangeName', '');
        console.log(`Consumer 1: Waiting for messages in ${queue}...`);
    
        channel.consume(queue, (msg) => {
          if (msg !== null) {
            const message = JSON.parse(msg.content.toString());
            console.log('Consumer 1: Message received:', message);
            channel.ack(msg);
          }
        });
      } catch (error) {
        console.error('Error in Consumer 1:', error);
      }

}

consumerDataProcess()


app.listen(port, () => {
    console.log(`Example app listening on port consumer app ${port}`)
})
