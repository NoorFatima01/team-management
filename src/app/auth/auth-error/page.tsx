import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Authentication Error',
};

const AuthError = () => {
  return <div>Authentication Error</div>;
};

export default AuthError;
