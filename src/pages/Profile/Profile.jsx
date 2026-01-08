import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
  IconButton,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
  CameraAlt,
  Email,
  Phone,
  Badge,
  LocationOn,
  Security,
  Notifications,
  DarkMode,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@urbansense.gov',
    phone: '+91 98765 43210',
    designation: 'System Administrator',
    department: 'Urban Management',
    location: 'City Municipal Corporation',
    employeeId: 'ADM-2024-001',
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    darkMode: true,
    twoFactorAuth: false,
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleEdit = () => {
    setEditData({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
    setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
  };

  const handleChange = (field) => (event) => {
    setEditData({ ...editData, [field]: event.target.value });
  };

  const handleSettingChange = (setting) => (event) => {
    setSettings({ ...settings, [setting]: event.target.checked });
    setSnackbar({ 
      open: true, 
      message: `${setting.replace(/([A-Z])/g, ' $1').trim()} ${event.target.checked ? 'enabled' : 'disabled'}`, 
      severity: 'info' 
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom color="#FFFFFF">
          Profile Settings
        </Typography>
        <Typography variant="body1" color="#9A9A9A">
          Manage your account information and preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent sx={{ textAlign: 'center', py: 4 }}>
              <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    bgcolor: '#D4A73C',
                    color: '#0B0B0B',
                    fontSize: 48,
                    fontWeight: 700,
                  }}
                >
                  {profileData.name.charAt(0)}
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: '#1E1E1E',
                    border: '2px solid #D4A73C',
                    '&:hover': { bgcolor: '#2A2A2A' },
                  }}
                  size="small"
                >
                  <CameraAlt sx={{ fontSize: 18, color: '#D4A73C' }} />
                </IconButton>
              </Box>
              
              <Typography variant="h5" fontWeight={700} color="#FFFFFF" gutterBottom>
                {profileData.name}
              </Typography>
              <Chip
                label={profileData.designation}
                sx={{
                  bgcolor: '#D4A73C20',
                  color: '#D4A73C',
                  fontWeight: 500,
                  mb: 2,
                }}
              />
              <Typography variant="body2" color="#9A9A9A">
                {profileData.department}
              </Typography>
              
              <Divider sx={{ my: 3, borderColor: '#2A2A2A' }} />
              
              <Box sx={{ textAlign: 'left' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Email sx={{ color: '#D4A73C', fontSize: 20 }} />
                  <Typography variant="body2" color="#D6D6D6">
                    {profileData.email}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Phone sx={{ color: '#D4A73C', fontSize: 20 }} />
                  <Typography variant="body2" color="#D6D6D6">
                    {profileData.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Badge sx={{ color: '#D4A73C', fontSize: 20 }} />
                  <Typography variant="body2" color="#D6D6D6">
                    {profileData.employeeId}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOn sx={{ color: '#D4A73C', fontSize: 20 }} />
                  <Typography variant="body2" color="#D6D6D6">
                    {profileData.location}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A', mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} color="#FFFFFF" gutterBottom>
                Activity Summary
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={6}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#1E1E1E', borderRadius: 2 }}>
                    <Typography variant="h4" fontWeight={700} color="#D4A73C">
                      156
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Actions Today
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={6}>
                  <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#1E1E1E', borderRadius: 2 }}>
                    <Typography variant="h4" fontWeight={700} color="#2ECC71">
                      98%
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Uptime
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Edit Profile & Settings */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Edit Profile Form */}
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A', mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={600} color="#FFFFFF">
                  Personal Information
                </Typography>
                {!isEditing ? (
                  <Button
                    startIcon={<Edit />}
                    onClick={handleEdit}
                    sx={{
                      color: '#D4A73C',
                      borderColor: '#D4A73C',
                      '&:hover': { borderColor: '#B8963B', bgcolor: '#D4A73C10' },
                    }}
                    variant="outlined"
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<Cancel />}
                      onClick={handleCancel}
                      sx={{ color: '#9A9A9A' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      startIcon={<Save />}
                      onClick={handleSave}
                      variant="contained"
                      sx={{
                        background: 'linear-gradient(135deg, #D4A73C 0%, #B8963B 100%)',
                        color: '#0B0B0B',
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                )}
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={isEditing ? editData.name : profileData.name}
                    onChange={handleChange('name')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={isEditing ? editData.email : profileData.email}
                    onChange={handleChange('email')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={isEditing ? editData.phone : profileData.phone}
                    onChange={handleChange('phone')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Employee ID"
                    value={profileData.employeeId}
                    disabled
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Designation"
                    value={isEditing ? editData.designation : profileData.designation}
                    onChange={handleChange('designation')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Department"
                    value={isEditing ? editData.department : profileData.department}
                    onChange={handleChange('department')}
                    disabled={!isEditing}
                  />
                </Grid>
                <Grid size={12}>
                  <TextField
                    fullWidth
                    label="Office Location"
                    value={isEditing ? editData.location : profileData.location}
                    onChange={handleChange('location')}
                    disabled={!isEditing}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A', mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Notifications sx={{ color: '#D4A73C' }} />
                <Typography variant="h6" fontWeight={600} color="#FFFFFF">
                  Notification Preferences
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: '#1E1E1E',
                    borderRadius: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="#FFFFFF">
                      Email Notifications
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Receive updates and alerts via email
                    </Typography>
                  </Box>
                  <Switch
                    checked={settings.emailNotifications}
                    onChange={handleSettingChange('emailNotifications')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#D4A73C' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#D4A73C' },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: '#1E1E1E',
                    borderRadius: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="#FFFFFF">
                      SMS Notifications
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Receive critical alerts via SMS
                    </Typography>
                  </Box>
                  <Switch
                    checked={settings.smsNotifications}
                    onChange={handleSettingChange('smsNotifications')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#D4A73C' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#D4A73C' },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: '#1E1E1E',
                    borderRadius: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="#FFFFFF">
                      Push Notifications
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Receive in-app push notifications
                    </Typography>
                  </Box>
                  <Switch
                    checked={settings.pushNotifications}
                    onChange={handleSettingChange('pushNotifications')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#D4A73C' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#D4A73C' },
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card sx={{ bgcolor: '#151515', border: '1px solid #2A2A2A' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Security sx={{ color: '#D4A73C' }} />
                <Typography variant="h6" fontWeight={600} color="#FFFFFF">
                  Security Settings
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: '#1E1E1E',
                    borderRadius: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="#FFFFFF">
                      Two-Factor Authentication
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Add an extra layer of security to your account
                    </Typography>
                  </Box>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onChange={handleSettingChange('twoFactorAuth')}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': { color: '#D4A73C' },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#D4A73C' },
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: '#1E1E1E',
                    borderRadius: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="#FFFFFF">
                      Change Password
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Update your password regularly for security
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      color: '#D4A73C',
                      borderColor: '#D4A73C',
                      '&:hover': { borderColor: '#B8963B', bgcolor: '#D4A73C10' },
                    }}
                  >
                    Update
                  </Button>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2,
                    bgcolor: '#1E1E1E',
                    borderRadius: 2,
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="#FFFFFF">
                      Active Sessions
                    </Typography>
                    <Typography variant="caption" color="#9A9A9A">
                      Manage devices logged into your account
                    </Typography>
                  </Box>
                  <Chip label="2 devices" size="small" sx={{ bgcolor: '#2ECC71', color: '#0B0B0B' }} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
