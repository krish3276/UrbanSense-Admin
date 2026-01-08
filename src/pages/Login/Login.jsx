import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('admin@urbansense.gov');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0B0B0B 0%, #1E1E1E 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 420,
          borderRadius: 3,
          bgcolor: '#151515',
          border: '1px solid #2A2A2A',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4A73C 0%, #B8963B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <AdminPanelSettings sx={{ fontSize: 40, color: '#0B0B0B' }} />
          </Box>
          <Typography variant="h4" fontWeight={700} color="#D4A73C">
            UrbanSense
          </Typography>
          <Typography variant="subtitle1" color="#9A9A9A">
            Admin Dashboard
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mb: 2, p: 2, bgcolor: '#1E1E1E', borderRadius: 1, border: '1px solid #2A2A2A' }}>
          <Typography variant="caption" color="#9A9A9A">
            Demo Credentials:
          </Typography>
          <Typography variant="body2" color="#D6D6D6">
            Email: admin@urbansense.gov
          </Typography>
          <Typography variant="body2" color="#D6D6D6">Password: admin123</Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            autoComplete="email"
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              background: 'linear-gradient(135deg, #D4A73C 0%, #B8963B 100%)',
              color: '#0B0B0B',
              fontWeight: 700,
              '&:hover': {
                background: 'linear-gradient(135deg, #E4C06C 0%, #D4A73C 100%)',
              },
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <Typography
          variant="caption"
          color="#9A9A9A"
          display="block"
          textAlign="center"
        >
          © 2026 UrbanSense. Government of Smart City.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
