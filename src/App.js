import AuthProvider from './auth/AuthProvider';
import AppRouter from './routers/AppRouter'

function App() {
  return (
    <div style={{backgroundColor:"#272537"}}>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </div>
  );
}

export default App;
