import { BrowserRouter } from "react-router-dom"

import { AuthProvider } from "./app/providers/AuthProvider"
import { AppRouter } from "./app/routes/AppRouter"
import { ThemeProvider } from "./app/providers/ThemeProvider"


function App() {
    return <BrowserRouter>
        <AuthProvider>
            <ThemeProvider>
                <AppRouter />
            </ThemeProvider>
        </AuthProvider>
    </BrowserRouter>
}

export default App;