const express = require('express')
const app = express()
const amqplib = require('amqplib');
const queue = 'anubhav_queue';

const port = 3002


app.get('/saveData', async (req, res) => {

    const conn = await amqplib.connect('amqp://localhost');
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);

    try {

        // Listener
        ch1.consume(queue, (msg) => {

            try {

                if (msg !== null) {
                    console.log('Received:', msg.content.toString());
                    ch1.ack(msg);

                    res.send(msg).json()

                } else {
                    console.log('Consumer cancelled by server');
                }

            } catch (error) {

                ch1.nack(msg, false, false); // Do not requeue the message

            }
        });

    } catch (error) {

        console.error('Error processing user data:', error.message);

        res.send(error).json()

    }


})


// automatic proccess producer data

async function consumerDataProcess() {

    const conn = await amqplib.connect('amqp://localhost');
    const ch1 = await conn.createChannel();
    await ch1.assertQueue(queue);

    try {

        // Listener
        ch1.consume(queue, (msg) => {

            try {

                if (msg !== null) {
                    console.log('Received:', msg.content.toString());
                    ch1.ack(msg);

                    // res.send(msg).json()

                    return msg

                } else {
                    console.log('Consumer cancelled by server');
                }

            } catch (error) {

                ch1.nack(msg, false, false); // Do not requeue the message

            }
        });

    } catch (error) {

        console.error('Error processing user data:', error.message);

        // res.send(error).json()

        return error

    }

}

consumerDataProcess()


app.listen(port, () => {
    console.log(`Example app listening on port consumer app ${port}`)
})
