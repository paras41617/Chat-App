const admin = require("firebase-admin");
const { getAuth } = require('firebase/auth')
// path to service account
const serviceAccount = require('../config/ServiceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://chat-3d05a-default-rtdb.firebaseio.com"
});


// Checking if the user if authenticated or not
const isAuthenticated = (req, res, next) => {
    const temp_token = req.headers.authorization;
    if (temp_token) {
        const token = temp_token.split(" ")[1];
        admin.auth()
            .verifyIdToken(token, true)
            .then((decodedToken) => {
                const uid = decodedToken.uid;
                req.user = decodedToken;
                next();
                // ...
            })
            .catch((error) => {
                console.log("error : ", error.message);
                res.status(401).json({ message: 'Unauthorized' });
            });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Revoking the token
const signOut = (req, res, next) => {
    const temp_token = req.headers.authorization;
    if (temp_token) {
        const token = temp_token.split(" ")[1];
        admin.auth().verifyIdToken(token, true).then
            ((decodedToken) => {
                const uid = decodedToken.uid;
                return uid;
            }).then((id) => {
                admin.auth().revokeRefreshTokens(id)
                    .then(() => {
                        return admin.auth().getUser(id);
                    })
                    .then((userRecord) => {
                        return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
                    })
                    .then((timestamp) => {
                        console.log(`Tokens revoked at: ${timestamp}`);
                        next();
                    })
            }).catch((error) => {
                console.log("error : ", error.message);
                res.status(401).json({ message: 'Already logout' });
            });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    isAuthenticated,
    signOut
}