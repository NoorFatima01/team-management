'use client';

import { Button } from '@/components/ui/button';

interface LogoutButtonProps {
  onLogout: () => void;
}

export default function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <Button variant='outline' size='sm' onClick={onLogout}>
      Logout
    </Button>
  );
}
