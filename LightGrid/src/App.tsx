import { Button, Card, CardActions, CardContent, CardHeader, CssBaseline, Typography } from "@mui/material"
import { ThemeProvider } from "@mui/system"
import { SnackbarProvider } from "notistack"
import { StageViewer } from "./components/StageViewer"
import { Header } from "./components/System/Header"
import { DesignerPage } from "./pages/DesignerPage"
import { Theme } from "./system/Theme"

export const App = () => {
    return (
        <>
            <SnackbarProvider anchorOrigin={{
                horizontal: 'right',
                vertical: 'top',
            }} maxSnack={10}>
                <ThemeProvider theme={Theme}>
                    <CssBaseline />
                    <Header />
                    <DesignerPage />
                </ThemeProvider>
            </SnackbarProvider>

        </>
    )
}