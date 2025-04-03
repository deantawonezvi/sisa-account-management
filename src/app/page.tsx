'use client';

import Link from 'next/link';
import { Box, Button, Card, CardContent, Container, Grid, Typography, useTheme, } from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function HomePage() {

  return (
      <Box>
        {/* Hero Section */}
        <Box
            sx={{
              position: 'relative',
              minHeight: '60vh',
              display: 'flex',
              alignItems: 'center',
              color: 'white',
              backgroundColor: 'black',
              background: 'linear-gradient(to right, rgba(18, 18, 18, 0.95), rgba(18, 18, 18, 0.8)), radial-gradient(circle at top right, rgba(212, 175, 55, 0.2), transparent 70%)',
            }}
        >
          <Container
              maxWidth="lg"
              sx={{
                position: 'relative',
                zIndex: 1,
                py: 6,
              }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={7}>
                <BalanceIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      fontWeight: 'bold',
                      mb: 3,
                    }}
                >
                  User Management Portal
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'normal',
                      mb: 4,
                      maxWidth: '600px',
                      color: 'text.secondary',
                    }}
                >
                  Manage your account, view your profile, and update your personal information securely.
                </Typography>
                <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      flexWrap: 'wrap',
                    }}
                >
                  <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      component={Link}
                      href="/auth/login"
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontWeight: 'bold',
                      }}
                  >
                    Sign In
                  </Button>
                  <Button
                      variant="outlined"
                      size="large"
                      component={Link}
                      href="/auth/signup"
                      sx={{
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          borderColor: 'primary.light',
                          backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        },
                      }}
                  >
                    Create Account
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={5}>
                <Card
                    sx={{
                      borderRadius: 2,
                      backgroundColor: 'background.paper',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                      border: '1px solid',
                      borderColor: 'divider',
                      overflow: 'hidden',
                    }}
                >
                  <Box
                      sx={{
                        p: 2,
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      Portal Features
                    </Typography>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                      {[
                        'Secure user authentication',
                        'Profile management',
                        'Account settings',
                        'Security controls',
                        'Data privacy options'
                      ].map((item, index) => (
                          <Box
                              component="li"
                              key={index}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 1.5,
                                borderBottom: index !== 4 ? '1px solid' : 'none',
                                borderColor: 'divider',
                              }}
                          >
                            <Box
                                component="span"
                                sx={{
                                  width: 24,
                                  height: 24,
                                  borderRadius: '50%',
                                  backgroundColor: 'primary.main',
                                  color: 'primary.contrastText',
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  mr: 2,
                                  fontSize: 14,
                                  fontWeight: 'bold',
                                }}
                            >
                              ✓
                            </Box>
                            <Typography variant="body1">{item}</Typography>
                          </Box>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>



        {/* Call to Action */}

        {/* Footer */}
        <Box
            component="footer"
            sx={{
              py: 4,
              backgroundColor: '#121212',
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BalanceIcon sx={{ fontSize: 24, color: 'primary.main', mr: 1 }} />
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  User Management Portal
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                © 2025 All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
  );
}