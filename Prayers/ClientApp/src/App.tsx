import React from 'react';
import './App.css';
import { UserForm } from './auth/components/UserForm';
import { LogoutButton } from './auth/components/LogoutButton';
import { AuthView } from './auth/components/AuthView';
import { LoginButton } from './auth/components/LoginButton';
import { QuickForm } from './forms/QuickForm';
import { Container, CssBaseline, Typography } from '@material-ui/core';

function App() {
    return (
        <div className="App">
            <div className="app-header">
                <h1>Welcome to AlvaNaz Needs</h1>
            </div>
            <AuthView
                unauthorized={() => (
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <div className="paper">
                            <Typography component="h1" variant="h5">
                                Provide Your Name
                            </Typography>
                            <UserForm />
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