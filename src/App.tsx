import AppRoutes from "./routes"
import useInactivityTimeout from "./hooks/UseInactivity";

function App() {

  // Use the inactivity timeout hook (2 hours inactivity and 5 minutes warning)
  useInactivityTimeout(2 * 60 * 60 * 1000, 5 * 60 * 1000);

  return (
    <>

      <AppRoutes />
    
    </>
  )
}

export default App
