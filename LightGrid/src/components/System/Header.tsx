import { AppBar, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const Header = () => (<Box sx={{ flexGrow: 1 }} >
    <AppBar position="static" >
        <Toolbar >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                LightGrid
            </Typography>
        </Toolbar>
    </AppBar>
</Box>)