import 'server-only';
// This file is used to create a Sanity client for writing data.

import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId, token } from '../env';

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // `false` for write operations
  token,
});

if (!writeClient.config().token) {
  throw new Error('write token not found');
}
