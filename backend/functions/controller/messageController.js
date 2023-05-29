const { app } = require('../middleware/init');
const { getFirestore, addDoc, collection, query, where, getDoc, getDocs, serverTimestamp, orderBy } = require('firebase/firestore')
const { getAuth } = require("firebase/auth")

const auth = getAuth();
const db = getFirestore(app);
const userRef = collection(db, "users")
const chatRef = collection(db, "chats");
const messageRef = collection(db, "messages");

// Creating a new message
const createMessage = async (req, res) => {
    const { message, chatId } = req.body;
    if (!message || !chatId) {
        res.status(400).json({ message: 'Fill the details' });
    }
    const curr_user_email = req.user.email;
    const q = query(userRef, where("email", "==", curr_user_email));
    var curr_doc_id = "";
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            curr_doc_id = doc.id;
        });
    }
    const new_message = {
        admin: curr_user_email,
        message: message,
        chatId: chatId,
        date: serverTimestamp(),
    }
    await addDoc(messageRef, new_message).then(() => {
        res.json({ message: 'Message Created' });
    });
};

// Getting all the messages related to a chat
const getMessages = async (req, res) => {
    const { chatId } = req.body;
    if (!chatId) {
        res.status(400).json({ message: 'Chat Id is required' });
    }
    try {
        const q = query(messageRef, where("chatId", "==", chatId), orderBy("date","desc"));
        const querySnapshot = await getDocs(q);
        const messages = []
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                messages.push({ admin: doc.data().admin, message: doc.data().message });
            });
        }
        messages.reverse()
        res.json({ messages: messages });
    }
    catch (error) {
        console.log(error.message)
    }
};

module.exports = {
    createMessage,
    getMessages
};