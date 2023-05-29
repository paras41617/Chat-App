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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

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

export default function AddModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputValues, setInputValues] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const create_chat = () => {
    const token = localStorage.getItem('token');
    const body_ = JSON.stringify({ 'users': [inputValues.user], 'name': inputValues.name ? inputValues.name : '', 'group':value});
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: body_
    }
    fetch('http://127.0.0.1:5001/chat-3d05a/us-central1/app/chat/create', requestOptions).
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
      <Container fixed maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div style={{ position: 'fixed', bottom: 10, display: 'flex', alignItems: 'center', padding: '8px' }}>
              <ListItemButton onClick={handleOpen}>
                <AddCircleOutlineIcon />
              </ListItemButton>
            </div>
          </Grid>
        </Grid>
        {/* <Copyright sx={{ pt: 4 }} /> */}
      </Container>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create Chat
          </Typography>
          <TextField name='user' id="outlined-basic" label="User" variant="outlined" style={{ marginTop: "10px" }} onChange={handleInput} />
          {value == "Yes" ? <TextField name='name' id="outlined-basic" label="Name" variant="outlined" style={{ marginTop: "10px" }} onChange={handleInput} />
            : ''}
          <FormControl style={{ marginLeft: "10px" }}>
            <FormLabel id="demo-radio-buttons-group-label">Group</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="No"
              name="radio-buttons-group"
            >
              <FormControlLabel value="Yes" onClick={(e) => setValue(e.target.value)} control={<Radio />} label="Yes" />
              <FormControlLabel value="No" onClick={(e) => setValue(e.target.value)} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <Button onClick={create_chat} style={{ marginLeft: "10px" }} variant="contained" size="medium">
            Summit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}