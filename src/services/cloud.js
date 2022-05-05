import awsconfig from '../aws-exports';
import { Amplify } from 'aws-amplify';
import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';
import { Auth } from '@aws-amplify/auth';

export const configCloud = () => {
  Amplify.configure(awsconfig);
  Auth.configure(awsconfig);

  applyPolyfills().then(() => {
    defineCustomElements(window);
  });

  // Vue.config.ignoredElements = [/amplify-\w*/];
};

export const auth_logout = async () => {
  try {
    await Auth.signOut();
    const result = await Auth.currentUserInfo();
    return { status: 'ok', payload: {} };
  } catch (error) {
    return { status: 'error', payload: {} };
  }
};
