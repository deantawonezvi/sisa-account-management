'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BalanceIcon from '@mui/icons-material/Balance';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { createClientComponentClient, User } from "@supabase/auth-helpers-nextjs";

const drawerWidth = 240;

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const router = useRouter();
    const pathname = usePathname();

    const isAuthenticated = !!user;

    const supabase = createClientComponentClient();


    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const checkUser = async () => {
        try {
            const { data } = await supabase.auth.getSession();
            if (data.session) {
                setUser(data.session.user);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error checking user:', error);
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    setUser(session.user);
                } else if (event === 'SIGNED_OUT') {
                    setUser(null);
                }
            }
        );

        return () => {
            if (authListener && authListener.subscription) {
                authListener.subscription.unsubscribe();
            }
        };
    }, []);

    const publicPages = [
        { name: 'Home', href: '/' },
    ];

    const authenticatedPages = [
        { name: 'Dashboard', href: '/dashboard', icon: <DashboardIcon /> },
        { name: 'Account', href: '/account', icon: <AccountCircleIcon /> },
    ];

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, color: 'primary.main', fontWeight: 'bold' }}>
                SISA@LAW
            </Typography>
            <Divider sx={{ borderColor: 'divider' }} />
            <List>
                {publicPages.map((item) => (
                    <ListItem key={item.name} disablePadding>
                        <ListItemButton
                            component={Link}
                            href={item.href}
                            sx={{
                                textAlign: 'center',
                                color: pathname === item.href ? 'primary.main' : 'text.primary',
                            }}
                        >
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}

                {isAuthenticated ? (
                    <>
                        {authenticatedPages.map((item) => (
                            <ListItem key={item.name} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href={item.href}
                                    sx={{
                                        textAlign: 'center',
                                        color: pathname === item.href ? 'primary.main' : 'text.primary',
                                    }}
                                >
                                    <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                        {item.icon}
                                    </Box>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={handleSignOut}
                                sx={{ textAlign: 'center' }}
                            >
                                <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                    <LogoutIcon />
                                </Box>
                                <ListItemText primary="Sign Out" />
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href="/auth/login"
                                sx={{
                                    textAlign: 'center',
                                    color: pathname === '/auth/login' ? 'primary.main' : 'text.primary',
                                }}
                            >
                                <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                    <LockIcon />
                                </Box>
                                <ListItemText primary="Login" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href="/auth/signup"
                                sx={{
                                    textAlign: 'center',
                                    color: pathname === '/auth/signup' ? 'primary.main' : 'text.primary',
                                }}
                            >
                                <ListItemText primary="Sign Up" />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
            </List>
        </Box>
    );

    if (loading) {
        return null; // Or return a loading indicator
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* Logo for larger screens */}
                        <BalanceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            SISA@LAW
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleDrawerToggle}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        {/* Logo for mobile */}
                        <BalanceIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'primary.main' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'primary.main',
                                textDecoration: 'none',
                            }}
                        >
                            SISA@LAW
                        </Typography>

                        {/* Desktop navigation */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {publicPages.map((page) => (
                                <Button
                                    key={page.name}
                                    component={Link}
                                    href={page.href}
                                    sx={{
                                        my: 2,
                                        color: pathname === page.href ? 'primary.main' : 'text.primary',
                                        display: 'block',
                                        '&:hover': {
                                            color: 'primary.light',
                                        },
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        {/* User menu */}
                        <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                            {isAuthenticated ? (
                                <>
                                    {authenticatedPages.map((page) => (
                                        <Button
                                            key={page.name}
                                            component={Link}
                                            href={page.href}
                                            startIcon={page.icon}
                                            sx={{
                                                mx: 0.5,
                                                color: pathname === page.href ? 'primary.main' : 'text.primary',
                                                '&:hover': {
                                                    color: 'primary.light',
                                                },
                                            }}
                                        >
                                            {page.name}
                                        </Button>
                                    ))}

                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2 }}>
                                            <Avatar sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                                                {user?.email?.charAt(0).toUpperCase() || 'U'}
                                            </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleCloseUserMenu} component={Link} href="/account">
                                            <Typography textAlign="center">Profile</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleCloseUserMenu} component={Link} href="/dashboard">
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleSignOut}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Button
                                        component={Link}
                                        href="/auth/login"
                                        startIcon={<LockIcon />}
                                        sx={{
                                            color: 'text.primary',
                                            '&:hover': {
                                                color: 'primary.light',
                                            },
                                        }}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/auth/signup"
                                        variant="contained"
                                        color="primary"
                                        sx={{ ml: 2 }}
                                    >
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        backgroundColor: 'background.paper',
                    },
                }}
            >
                {drawer}
            </Drawer>
        </Box>
    );
}