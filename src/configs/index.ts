import authApiConfig from './authApiConfig';
import googleConfig from './googleConfig';
import graphqlConfig from './graphqlConfig';

declare global {
  interface Window {
    config: {
      graphqlUrl: string;
      authApiUrl: string;
      authApiClientId: string;
      googleClientId: string;
    };
  }
}

export { authApiConfig, googleConfig, graphqlConfig };
