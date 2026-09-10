import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  CssBaseline,
} from '@mui/material';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const AdminAuth = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAdminAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Dynamic API & E-commerce URLs
  const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  
  // Yahan aapka Vercel URL direct fallback ya env variable se set kar diya hai
  const ECOMMERCE_SITE_URL = import.meta.env.VITE_ECOMMERCE_URL || 'https://shop-ecommerce-frontend.vercel.app';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Email and Password are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('token', data.token);
      }

      loginAdmin(data.user, data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = (e) => {
    e.preventDefault();
    // Agar single page app ke andar hi root par jana hai toh navigate('/') karein,
    // aur agar Vercel ke main site par redirect karna hai toh window.location.href use hoga.
    window.location.href = ECOMMERCE_SITE_URL;
  };

  return (
    <Box
      sx={{
        background: 'radial-gradient(circle at 10% 20%, rgba(216, 241, 255, 0.8) 0%, rgba(255, 226, 246, 0.8) 90.1%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CssBaseline />

      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
          top: '10%',
          left: '15%',
          filter: 'blur(80px)',
          opacity: 0.6,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
          bottom: '10%',
          right: '15%',
          filter: 'blur(80px)',
          opacity: 0.6,
        }}
      />

      <Card
        elevation={0}
        sx={{
          maxWidth: 420,
          width: '100%',
          borderRadius: '28px',
          p: { xs: 3, sm: 4 },
          backgroundColor: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: '#0F172A',
                letterSpacing: '-1px',
                fontSize: '2rem',
              }}
            >
              SHOP.CO
            </Typography>
            <Typography variant="body2" sx={{ color: '#475569', mt: 0.5, fontWeight: 500 }}>
              Admin Portal • Sign in to continue
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5, borderRadius: '12px' }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              placeholder="Email address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.925rem',
                  '& fieldset': { borderColor: 'rgba(226, 232, 240, 0.8)' },
                  '&:hover fieldset': { borderColor: '#94A3B8' },
                  '&.Mui-focused fieldset': { borderColor: '#0F172A', borderWidth: '1.5px' },
                },
              }}
            />

            <TextField
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        sx={{ color: '#475569' }}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlinedIcon fontSize="small" />
                        ) : (
                          <VisibilityOutlinedIcon fontSize="small" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(10px)',
                  fontSize: '0.925rem',
                  '& fieldset': { borderColor: 'rgba(226, 232, 240, 0.8)' },
                  '&:hover fieldset': { borderColor: '#94A3B8' },
                  '&.Mui-focused fieldset': { borderColor: '#0F172A', borderWidth: '1.5px' },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              size="large"
              sx={{
                mt: 1,
                py: 1.5,
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                borderRadius: '14px',
                textTransform: 'none',
                fontSize: '0.95rem',
                fontWeight: 700,
                boxShadow: '0 10px 20px rgba(15, 23, 42, 0.15)',
                '&:hover': { backgroundColor: '#1E293B', boxShadow: '0 12px 24px rgba(15, 23, 42, 0.25)' },
              }}
            >
              {loading ? (
                <CircularProgress size={22} sx={{ color: '#FFFFFF' }} />
              ) : (
                'Sign In to Dashboard'
              )}
            </Button>
          </Box>

          <Box sx={{ mt: 2.5, textAlign: 'center' }}>
            <Button
              onClick={handleGoHome}
              startIcon={<HomeOutlinedIcon fontSize="small" />}
              sx={{
                color: '#475569',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.875rem',
                borderRadius: '12px',
                px: 2,
                py: 0.8,
                '&:hover': {
                  backgroundColor: 'rgba(15, 23, 42, 0.05)',
                  color: '#0F172A',
                },
              }}
            >
              Go to Home Page
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminAuth;