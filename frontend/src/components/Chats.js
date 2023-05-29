import React from 'react';
import { Grid, Paper } from '@mui/material';

const Chats = (props) => {
    return (
        <>
            {props.messages.map((message, i) => (
                <div key={i}>
                    {message.admin === props.user ? <MessageRight text={message.message} /> : <MessageLeft text={message.message} admin={message.admin}/>}
                </div>
            ))}
        </>
    )
}

const MessageLeft = ({ text, admin}) => {
    return (
        <Grid container justifyContent="flex-start">
            <Grid item xs={8}>
                <Paper style={{ padding: '10px', background: '#e0e0e0', marginBottom: "10px" }}>
                    {admin} : 
                    {" "+text}
                </Paper>
            </Grid>
        </Grid>
    );
};

const MessageRight = ({ text }) => {
    return (
        <div>
            <Grid container justifyContent="flex-end">
                <Grid item xs={8}>
                    <Paper style={{ padding: '10px', background: '#2196f3', color: '#fff', marginBottom: "10px" }}>
                        {text}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Chats;