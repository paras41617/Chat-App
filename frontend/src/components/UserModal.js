import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserModal(props) {
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState('')

  const fun_close = () => {
    setId('')
    setOpen(false)
  }

  const func_open = (id_) => {
    setId(id_)
    setOpen(true)
  }

  const [inputValues, setInputValues] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const add_user = () => {
    const token = localStorage.getItem('token');
    const body_ = JSON.stringify({ 'chatId': props.id, 'user': inputValues.user });
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: body_
    }
    fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/chat/add_user', requestOptions).
      then((response) => response.json()).
      then((data) => {
        if (data) {
          var data = data
        }
        else {
          localStorage.setItem('token', undefined);
          window.location.reload();
          alert("Some error occured")
        }
      }).
      catch((error) => {
        console.log("error : ", error.message)
      })
  }

  const remove_user = () => {
    const token = localStorage.getItem('token');
    const body_ = JSON.stringify({ 'chatId': props.id, 'user': props.user });
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: body_
    }
    fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/chat/remove_user', requestOptions).
      then((response) => response.json()).
      then((data) => {
        if (data) {
          var data = data
        }
        else {
          alert("Some error occured")
        }
      }).
      catch((error) => {
        console.log("error : ", error.message)
      })
  }

  return (
    <div>
      <Container fixed maxWidth="lg" sx={{ mt: 0, mb: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <ListItemButton onClick={() => func_open('users')}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Users
                </Typography>
              </ListItemButton>
              <ListItemButton onClick={() => func_open('icon')}>
                <AddCircleOutlineIcon />
              </ListItemButton>
              <ListItemButton onClick={remove_user}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Exit
                </Typography>
              </ListItemButton>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={fun_close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {id === "users" ? (
          <div>
            <Box sx={style}>
              {props.users.map((user, id) => (
                <Typography key={id} id="modal-modal-title" variant="h6" component="h2">
                  {user}
                </Typography>
              ))}
            </Box>
          </div>
        ) : (
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add User
            </Typography>
            <TextField name='user' id="outlined-basic" label="User" variant="outlined" style={{ marginTop: "10px" }} onChange={handleInput} />
            <Button onClick={add_user} style={{ marginLeft: "10px" }} variant="contained" size="medium">
              Summit
            </Button>
          </Box>
        )}
      </Modal>
    </div>
  );
}