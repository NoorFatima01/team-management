'use client';
import React from 'react';

import { Button } from '@/components/ui/button';

const SendEmail = () => {
  const handleEmailClick = async () => {
    await fetch('/api/send', {
      method: 'POST',
    });
  };

  return (
    <div>
      <Button onClick={handleEmailClick}>Send Email</Button>
    </div>
  );
};

export default SendEmail;
