const { app } = require('../middleware/init');
const { doc, getFirestore, addDoc, collection, query, where, getDoc, getDocs, updateDoc, arrayUnion, arrayRemove } = require('firebase/firestore')

const db = getFirestore(app);
const userRef = collection(db, "users")
const chatRef = collection(db, "chats");

// Creating new chat whether private or group

const createChat = async (req, res) => {
    const { users, name, group } = req.body;
    if (users.empty) {
        res.status(400).json({ message: 'Give Users' });
    }
    const curr_user_email = req.user.email;
    users.push(curr_user_email)
    const user_ids = [];
    await Promise.all(users.map(async (user_) => {
        const q = query(userRef, where("email", "==", user_));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const email = doc.data().email
                user_ids.push(email)
            });
        }
    }));
    if (user_ids.length == 1) {
        res.json({ message: 'User does not exist' });
    }
    else {
        const chat = {
            admin: curr_user_email,
            users: user_ids,
            isGroup: group == "Yes" ? true : false,
            name: group == "Yes" ? name : ''
        }
        await addDoc(chatRef, chat).then(() => {
            res.json({ message: 'Chat Created' });
        }
        )
    }
};


// Adding user in a group

const addUser = async (req, res) => {
    const { chatId, user } = req.body;
    // console.log("chatid : ", chatId)
    if (!chatId || !user) {
        res.status(400).json({ message: 'Give Details' });
    }
    const targetRef = doc(db, "chats", chatId);
    try {
        await updateDoc(targetRef, {
            users: arrayUnion(user)
        }).then(() => {
            res.json({ message: 'User Added' });
        })
    }
    catch {
        res.json({ message: 'Message does not exist' });
    }
};


// Exiting from a group

const removeUser = async (req, res) => {
    const { chatId, user } = req.body;
    if (!chatId || !user) {
        res.status(400).json({ message: 'Give Details' });
    }
    const targetRef = doc(db, "chats", chatId);
    try {
        await updateDoc(targetRef, {
            users: arrayRemove(user)
        }).then(() => {
            res.json({ message: 'User Removed' });
        })
    }
    catch {
        res.json({ message: 'Message does not exist' });
    }
};

// Getting chats for a particular user

const myChats = async (req, res) => {
    const curr_user_email = req.user.email;
    const q = query(userRef, where("email", "==", curr_user_email));
    var curr_doc_id = "";
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            curr_doc_id = doc.id;
        });
    }
    const chats = [];
    const q_chat = query(chatRef, where("users", "array-contains", curr_user_email));
    const querySnapshotChat = await getDocs(q_chat);
    querySnapshotChat.forEach((doc) => {
        chats.push({ id: doc.id, users: doc.data().users, isGroup: doc.data().isGroup, name: doc.data().name });
    });
    res.json({ chats: chats });
};

module.exports = {
    createChat,
    myChats,
    addUser,
    removeUser
};