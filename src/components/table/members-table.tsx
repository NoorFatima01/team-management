import React from 'react';

import { memberTableSchemaType } from '@/lib/schemas';

import MembersTableShell from '@/components/shells/members-table-shell';
import { Shell } from '@/components/shells/shell';

interface MembersTableProps {
  members: memberTableSchemaType[];
}

export default function MembersTable({ members }: MembersTableProps) {
  return (
    <Shell>
      <MembersTableShell data={members} />
    </Shell>
  );
}
