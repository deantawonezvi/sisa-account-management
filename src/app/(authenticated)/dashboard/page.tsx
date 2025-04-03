'use client';

import { useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Snackbar,
    Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";

export default function DashboardPage() {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleteRequested, setDeleteRequested] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [error] = useState<string | null>(null);
    const supabase = createClientComponentClient();


    const getUser = async () => {
        try {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUser(data.session.user);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleDeleteRequest = () => {
        setDeleteRequested(true);
        setShowMessage(true);
    };

    const handleCloseMessage = () => {
        setShowMessage(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Snackbar
                open={showMessage}
                autoHideDuration={6000}
                onClose={handleCloseMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseMessage} severity="info" sx={{ width: '100%' }}>
                    Account deletion request has been submitted. Our team will contact you shortly.
                </Alert>
            </Snackbar>

            {error && (
                <Alert severity="error" sx={{ mb: 4 }}>
                    {error}
                </Alert>
            )}

            <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
                Dashboard
            </Typography>

            <Card
                sx={{
                    borderRadius: 2,
                    backgroundColor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        p: 3,
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                    }}
                >
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Account Information
                    </Typography>
                </Box>

                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PersonIcon sx={{ color: 'primary.main', mr: 2 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Name
                                </Typography>
                                <Typography variant="body1">
                                    {user?.user_metadata?.first_name || ''} {user?.user_metadata?.last_name || ''}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <EmailIcon sx={{ color: 'primary.main', mr: 2 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    Email
                                </Typography>
                                <Typography variant="body1">
                                    {user?.email || 'No email found'}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ mt: 4 }}>
                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
                            Account Actions
                        </Typography>
                        <Button
                            variant="outlined"
                            color="error"
                            startIcon={<DeleteOutlineIcon />}
                            onClick={handleDeleteRequest}
                            disabled={deleteRequested}
                        >
                            Request Account Deletion
                        </Button>
                        {deleteRequested && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Your account deletion request has been submitted. Please check your email for further instructions.
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
}