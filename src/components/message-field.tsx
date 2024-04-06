'use client';

import React, { useState } from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function MessageField() {
  const [message, setMessage] = useState('');
  const [placeholder, setPlaceholder] = useState('Type your message here...');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text: string) => {
    const response = await fetch('/api/message', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      setPlaceholder('Type your message...');
      setMessage('');
    } else {
      setPlaceholder('Failed to send message');
    }
    setIsLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    setIsLoading(true);
    sendMessage(message);
  };

  return (
    <div className='grid w-full items-center gap-4 p-6'>
      <Label>Message</Label>
      <div className='flex w-full items-center space-x-2'>
        <Input
          type='text'
          placeholder={placeholder}
          value={message}
          onChange={handleChange}
        />
        <Button size='sm' onClick={handleClick} disabled={isLoading}>
          {isLoading && (
            <Icons.spinner
              className='mr-2 size-4 animate-spin'
              aria-hidden='true'
            />
          )}
          Send
        </Button>
      </div>
    </div>
  );
}
