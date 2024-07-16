import React from 'react';
import { Typography, Divider, Grid, TextField, Button, Box } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Navbar = () => {
    return (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px' }}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Typography my={"0.5%"} sx={{ fontSize: 28, fontWeight: 600, px: '4%', color: 'black' }}>
                        Simple Task Management
                    </Typography>
                </Grid>
                <Grid item container xs={12} sm={4} md={4} lg={4} xl={4} pl={'4%'} width={"120%"} justifyContent="center">
                    <Box sx={{ width: '100%', maxWidth: 400 }}>
                        <TextField
                            fullWidth
                            id="outlined-search"
                            label="Search 🔎"
                            type="search"
                            sx={{ backgroundColor: 'white' }}
                        />
                    </Box>
                </Grid>
                <Grid item container xs={12} sm={4} md={4} lg={4} xl={4} justifyContent="flex-end">
                    <Box pr={'5%'}>
                        <Button variant="contained" color="primary" startIcon={<FilterListIcon />}>
                            Filter
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}

export default Navbar;
