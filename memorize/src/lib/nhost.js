import { NhostClient } from '@nhost/react';

const nhost = new NhostClient({
  backendUrl: process.env.REACT_APP_backendUrl,
});

export { nhost };
