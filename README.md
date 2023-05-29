
# ChatAPP

Chatapp is a realtime chatting app on which users can chat with each other using text messages.

A user can register via email or Google.

A user can connect with other user by entering email and then can chat with him/her.

A use can also create a group chat an can add as many users he/she wants.

Any user can exit from group at its own will and can also the users within the group.

Messages sent within 1 to 1 chat are restricted and private.

This platform allows realtime chats, means that the user do not to refresh continously to see the messages. Any message sent to him/her will be updated on the screen immediatedly and in real time.

## Features

- Text Messaging
- Real Time updates
- Google Authentication
- Private Chats
- Group Chats

## Tech Stack

**Frontend:** React, CSS, HTML, MaterialUI

**Backend:** Node.js, Express

**Database:** Firebase

## Deployment

Run Locally.

Create a project on firebase

Enable Google Authentication with sign-in methods (Email/Password and Google) on firebase

Enable Firestore database on firebase

Open the root folder of the repostiory and enter

```bash
  firebase login
```
this will login you into your project

update default in .firebaserc file with your project name

follow below commands
```bash
  cd backend
```
```bash
  cd functions
```
```bash
  npm install
```
```bash
  npm run serve
```
this will start your backend server

Now, open another teminal and follow below commands
```bash
  cd frontend
```
```bash
  npm install
```
```bash
  npm start
```

this will start your frontend server.

Now, try entering in your brower
```bash
  locahost:3000
```
Your local setup is done.

Play with it.

## Video Link


Demonstration of the project in Video.

https://drive.google.com/file/d/1RTx7trFiNF7RXy5r1-xEcMXcgl6T6L8S/view?usp=sharing
