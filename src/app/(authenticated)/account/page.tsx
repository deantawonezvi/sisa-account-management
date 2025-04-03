'use client';

import { useEffect, useState } from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Container,
    Divider,
    Grid,
    Snackbar,
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default function AccountPage() {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [profileError, setProfileError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const supabase = createClientComponentClient();


    const getUser = async () => {
        try {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUser(data.session.user);
                setEmail(data.session.user.email || '');
                setFirstName(data.session.user.user_metadata?.first_name || '');
                setLastName(data.session.user.user_metadata?.last_name || '');
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, [getUser]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleUpdateProfile = async () => {
        setProfileLoading(true);
        setProfileError(null);

        try {
            if(!user) return;
            const { error } = await supabase.auth.updateUser({
                data: {
                    first_name: firstName,
                    last_name: lastName,
                },
            });

            if (error) {
                throw error;
            }

            setSuccessMessage('Profile updated successfully');
            setShowSuccessMessage(true);
            setEditMode(false);
        } catch (error) {
            setProfileError((error as Error).message || 'An error occurred updating your profile');

        } finally {
            setProfileLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        setPasswordLoading(true);
        setPasswordError(null);

        if (newPassword !== confirmNewPassword) {
            setPasswordError('New passwords do not match');
            setPasswordLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            setPasswordLoading(false);
            return;
        }

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) {
                throw error;
            }

            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setSuccessMessage('Password updated successfully');
            setShowSuccessMessage(true);
        } catch (error) {

            setPasswordError((error as Error).message || 'An error occurred updating your password');
        } finally {
            setPasswordLoading(false);
        }
    };

    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={6000}
                onClose={handleCloseSuccessMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
                    {successMessage}
                </Alert>
            </Snackbar>

            <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
                My Account
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            borderRadius: 2,
                            backgroundColor: 'background.paper',
                            height: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                p: 3,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    backgroundColor: 'primary.main',
                                    color: 'primary.contrastText',
                                    fontSize: 40,
                                    mb: 2,
                                    border: '4px solid',
                                    borderColor: 'background.paper',
                                }}
                            >
                                {firstName.charAt(0)}{lastName.charAt(0)}
                            </Avatar>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                {firstName} {lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {email}
                            </Typography>
                        </Box>
                        <Box sx={{ p: 3 }}>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body1">Account Information</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <SecurityIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body1">Security</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <SettingsIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                <Typography variant="body1">Preferences</Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                View Billing Details
                            </Button>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{ borderRadius: 2, backgroundColor: 'background.paper' }}>
                        <CardHeader
                            title="Account Settings"
                            titleTypographyProps={{ fontWeight: 'bold' }}
                        />
                        <Divider />
                        <CardContent>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={tabValue}
                                    onChange={handleTabChange}
                                    aria-label="account settings tabs"
                                    textColor="primary"
                                    indicatorColor="primary"
                                >
                                    <Tab
                                        label="Profile"
                                        icon={<PersonIcon />}
                                        iconPosition="start"
                                        id="profile-tab"
                                        aria-controls="profile-tabpanel"
                                    />
                                    <Tab
                                        label="Security"
                                        icon={<LockIcon />}
                                        iconPosition="start"
                                        id="security-tab"
                                        aria-controls="security-tabpanel"
                                    />
                                </Tabs>
                            </Box>

                            {/* Profile Tab */}
                            <TabPanel value={tabValue} index={0}>
                                {profileError && (
                                    <Alert severity="error" sx={{ mb: 3 }}>
                                        {profileError}
                                    </Alert>
                                )}

                                <Box component="form">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="First Name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                disabled={!editMode}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Last Name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                disabled={!editMode}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Email Address"
                                                value={email}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            {editMode ? (
                                                <Box sx={{ display: 'flex', gap: 2 }}>
                                                    <Button
                                                        variant="outlined"
                                                        onClick={() => {
                                                            setEditMode(false);
                                                            getUser(); // Reset form
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleUpdateProfile}
                                                        disabled={profileLoading}
                                                        startIcon={profileLoading ? <CircularProgress size={20} /> : <SaveIcon />}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </Box>
                                            ) : (
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => setEditMode(true)}
                                                    startIcon={<EditIcon />}
                                                >
                                                    Edit Profile
                                                </Button>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Box>
                            </TabPanel>

                            {/* Security Tab */}
                            <TabPanel value={tabValue} index={1}>
                                {passwordError && (
                                    <Alert severity="error" sx={{ mb: 3 }}>
                                        {passwordError}
                                    </Alert>
                                )}

                                <Box component="form">
                                    <Typography variant="h6" sx={{ mb: 3 }}>
                                        Change Password
                                    </Typography>

                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Current Password"
                                                type="password"
                                                value={currentPassword}
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="New Password"
                                                type="password"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label="Confirm New Password"
                                                type="password"
                                                value={confirmNewPassword}
                                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleUpdatePassword}
                                                disabled={passwordLoading || !currentPassword || !newPassword || !confirmNewPassword}
                                                startIcon={passwordLoading ? <CircularProgress size={20} /> : <LockIcon />}
                                            >
                                                Update Password
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ my: 4 }} />

                                    <Typography variant="h6" sx={{ mb: 3 }}>
                                        Two-Factor Authentication
                                    </Typography>

                                    <Box sx={{ backgroundColor: 'rgba(212, 175, 55, 0.05)', p: 3, borderRadius: 2 }}>
                                        <Typography variant="body1" sx={{ mb: 2 }}>
                                            Enhance your account security by enabling two-factor authentication.
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Enable 2FA
                                        </Button>
                                    </Box>
                                </Box>
                            </TabPanel>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}