import { useState, useEffect } from 'react';
import { TextField, Button, Box, Dialog, DialogTitle, DialogActions } from '@mui/material';

interface FormData {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export default function UserForm() {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    address: '',
    email: '',
    phone: ''
  });

  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    } else {
      setFormData(prev => ({ ...prev, id: crypto.randomUUID() }));
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
        e.returnValue = '';
        setConfirmDialogOpen(true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(d => ({ ...d, [e.target.name]: e.target.value }));
    setHasChanges(true);
  };

  const handleSubmit = () => {
    localStorage.setItem('userData', JSON.stringify(formData));
    setHasChanges(false);
  };

  const handleCloseAttempt = () => {
    if (hasChanges) {
      setConfirmDialogOpen(true);
    } else {
      window.close();
    }
  };

  const handleLeave = () => {
    setConfirmDialogOpen(false);
    window.removeEventListener('beforeunload', () => {});
    window.close();
  };

  return (
    <Box component="form" p={3}>
      <TextField
        label="Name"
        name="name"
        fullWidth
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        label="Address"
        name="address"
        fullWidth
        margin="normal"
        value={formData.address}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Phone"
        name="phone"
        fullWidth
        margin="normal"
        value={formData.phone}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
        Save
      </Button>
      <Button variant="outlined" color="error" onClick={handleCloseAttempt} sx={{ mt: 2, ml: 2 }}>
        Close
      </Button>
      
      <Dialog open={confirmDialogOpen}>
        <DialogTitle>You have unsaved changes!</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Stay</Button>
          <Button onClick={handleLeave} color="error">Leave Anyway</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
