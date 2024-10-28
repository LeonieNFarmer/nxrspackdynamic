import { setRemoteDefinitions } from '@nx/react/mf';

const remoteDefinitions = {
  'remote': 'http://localhost:4201',
};

// Set the remote definitions
setRemoteDefinitions(remoteDefinitions);

import('./bootstrap')
