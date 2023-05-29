const { app } = require('../middleware/init');
const { getFirestore, addDoc, collection, query, where, getDoc, getDocs } = require('firebase/firestore')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } = require("firebase/auth")

const auth = getAuth();
const db = getFirestore(app);
const userRef = collection(db, "users");

// Registering a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    else {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (userCredential) {
                    const user = {
                        name,
                        email
                    };
                    await addDoc(userRef, user).then(() => {
                        res.json({ message: 'User registered successfully' });
                    }
                    )
                }

                res.status(200).json({ message: 'Complete' });
            })
            .catch((error) => {
                // console.log("error : ", error.message)
                res.status(400).json({ message: 'Some error Occured' });
            });
        return;
    }
};

// Registering user from Google
const registerGoogleUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    const q = query(userRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }
    else {
        try {
            const user = {
                name,
                email
            };
            await addDoc(userRef, user).then(() => {
                res.json({ message: 'User registered successfully' });
            }
            )
        }
        catch {
            res.status(400).json({ message: 'Some error Occured' });
        }

        return;
    }
};

// Login the user
const loginUser = (req, res) => {
    const { email, password } = req.body;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            userCredential.user.getIdToken(true)
                .then((token) => {
                    res.json({ token });
                });
        })
        .catch((error) => {
            // console.log("error : ", error.message)
            res.status(401).json({ message: 'Unauthorized' });
        });
};

// Logout User
const logoutUser = (req, res) => {
    signOut(auth).then(() => {
        res.status(200).json({ message: 'Successfull' });
    }).catch((error) => {
        // console.log("error : ", error.message)
        res.status(400).json({ message: 'Some error Occured' });
    });
}

// Get Current user and its details
const getUser = async (req, res) => {
    const curr_user_email = req.user.email;
    // console.log("email : ", curr_user_email);
    const q = query(userRef, where("email", "==", curr_user_email));
    var name = "";
    var email = "";
    // var id = "";
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        // curr_doc_id = querySnapshot[0].id;
        querySnapshot.forEach((doc) => {
            name = doc.data().name;
            email = doc.data().email;
            // id = doc.id
        });
    }
    res.status(200).json({ name: name, email: email});
    // res.status(200).json({ name: name, email: email, id:id});
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    registerGoogleUser
};