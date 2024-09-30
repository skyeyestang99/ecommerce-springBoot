import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8181',
  realm: 'spring-boot-microservices-realm',
  clientId: 'react-client',
});

export default keycloak;
