import React from 'react';
import './App.css';
import { LogoutButton } from './auth/components/LogoutButton';
import { AuthView } from './auth/components/AuthView';
import { Container, CssBaseline, Typography } from '@material-ui/core';
import { LoginForm } from './auth/components/LoginForm';

function App() {
    return (
        <div className="App">
            <div className="app-header">
                <h1>Welcome to AlvaNaz Need</h1>
            </div>
            <AuthView
                unauthorized={() => (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className="paper">
                            <Typography component="h1" variant="h5">
                                Provide Your Name
                            </Typography>
                            <LoginForm />
                        </div>
                    </Container>
                )}
                authorized={() => 
                    <>
                        <div>
                            Here's some content
                        </div>
                        <LogoutButton />
                    </>
                }
            />
        </div>
    );
}

export default App;