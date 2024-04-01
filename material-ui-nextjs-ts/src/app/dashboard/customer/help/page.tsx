'use client'
import React, { useState } from "react";
import { Box, Container, TextField, Button, Typography, Paper } from '@mui/material';
import { Send } from '@mui/icons-material';

const ContactFormPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // backend form submission 
    console.log({ name, email, message });
    // For demonstration, Needs replacement.
    alert("Thank you, we've received your message and will be in touch soon!");
    // Reset form 
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={3}>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button variant="contained" color="primary" type="submit" endIcon={<Send />}>
              Send Message
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default ContactFormPage;
