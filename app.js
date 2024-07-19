const admin = require('firebase-admin');
const serviceAccount = require('./credentials.json'); // Ensure the correct path to your service account JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendNotification = async (data) => {
    const message = {
        topic: data.topic,  // Use the topic provided in the data parameter
        notification: {
            title: data.title || 'Notification',  // Allow custom titles from the data parameter
            body: data.body || 'New message from user',  // Allow custom body messages from the data parameter
        },
        data: {
            body: data.body || 'New message from user',  // Custom data fields from the data parameter
            message: data.message || 'message',
            sender_id: data.sender_id || '1',
            receiver_id: data.receiver_id || '2',
        },
    };

    try {
        const response = await admin.messaging().send(message);
        console.log('Successfully sent message:', response);
        return response;
    } catch (error) {
        console.error('Error sending message:', error);
        return error;
    }
};

// Example usage
sendNotification({
    topic: 'Topic', 
    title: 'Notification Title',
    body: 'Notification Body',
    message: 'Your custom message',
    sender_id: '1',
    receiver_id: '2',
});
