import React from 'react';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const AuthForm = ({ children }) => {
    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Grid item xs={12} md={6}>
                    {children}
                </Grid>
            </Box>
        </Container>
    )
};

export default AuthForm;
