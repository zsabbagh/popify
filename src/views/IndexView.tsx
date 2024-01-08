import { useState, useEffect } from 'react';
import { Button, Typography, Grow, Fade } from '@mui/material';
import loginUrl from '../utils/spotifyAuthorization';

export default function IndexView(props: { userIsAuthenticated: boolean }) {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, 200);
    }, [])

    if (!props.userIsAuthenticated) {
        return (
                <Grow in={isLoaded} timeout={2000}> 
                    <Fade in={isLoaded} timeout={1000}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100vh'
                        }}>
                                <Typography variant="h1" sx={{ marginBottom: '20px' }}>Welcome to Popify!</Typography>
                                <p style={{ fontSize: '1.5rem' }}>
                                    Get recommendations.
                                    Generate playlists.
                                </p>
                                <Button variant="outlined"
                                    sx={{
                                        width: '200px',
                                        borderWidth: '4px',
                                        background: 'transparent',
                                        color: '#041A31',
                                        height: '100px',
                                        borderRadius: '50px',
                                        marginTop: '20px',
                                        marginBottom: '20px',
                                        ':hover': {
                                            borderWidth: '4px',
                                            transition: 'background 0.8s ease-in-out',
                                        }
                                    }}
                                    onClick={() => window.location.replace(loginUrl) }>
                                    <Typography sx={{ fontSize: '1rem' }}>Login with Spotify</Typography>
                                </Button>
                    </div>
                </Fade>
                </Grow>
        );
    }
    return <></>
}