import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import App from './App';

const keycloakInitOptions = {
    onLoad: 'login-required',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    useNonce: true
}

const WrappedApp = () => (
    <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakInitOptions}>
        <App />
    </ReactKeycloakProvider>
  );
  
  export default WrappedApp;