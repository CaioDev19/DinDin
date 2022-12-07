import { GlobalStyle } from "./global/styles/GlobalStyles"
import { ThemeProvider } from "styled-components"
import { theme } from "./global/theme"
import { BrowserRouter as Router } from "react-router-dom"
import { QueryClient, QueryClientProvider, setLogger } from "react-query"
import { MainRoutes } from "./routes/MainRoutes"
import { AuthProvider } from "./context/Auth"
import { ToastContainer } from "react-toastify"
import { Slide } from "react-toastify"

import "react-toastify/dist/ReactToastify.min.css"

function App() {
  const client = new QueryClient()
  setLogger({
    log: () => { },
    warn: () => { },
    error: () => { },
  });

  return (
    <Router>
      <QueryClientProvider client={client}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainRoutes />
          </ ThemeProvider>
        </AuthProvider>
        <ToastContainer transition={Slide} autoClose={1000} />
      </QueryClientProvider>
    </Router>
  )
}

export default App;
