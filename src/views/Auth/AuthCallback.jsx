import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    const userRaw = searchParams.get('user');

    if (token && userRaw) {
      try {
        const userObj = JSON.parse(decodeURIComponent(userRaw));

        // Strict Admin Validation Check
        if (userObj?.role?.toLowerCase() === 'admin') {
          // Unified keys sync taaki AdminGuard fail na ho
          localStorage.setItem('adminToken', token);
          localStorage.setItem('token', token);
          localStorage.setItem('adminUser', JSON.stringify(userObj));
          localStorage.setItem('user', JSON.stringify(userObj));

          // Direct Admin Root Dashboard par redirect karein
          navigate('/', { replace: true });
          return;
        }
      } catch (err) {
        console.error('User payload parsing error:', err);
      }
    }

    // Role invalid ya token na milne par admin login par drop kar de
    navigate('/login', { replace: true });
  }, [searchParams, navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <h2>Authenticating Admin Access...</h2>
    </div>
  );
};

export default AuthCallback;