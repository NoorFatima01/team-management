import { ColumnDef } from '@tanstack/react-table';

import { type memberTableSchemaType } from '@/lib/schemas';

import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';

export const membersColumns: ColumnDef<memberTableSchemaType, unknown>[] = [
  {
    id: 'select',
    header: async ({ table }) => {
      'use server';
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='translate-y-[2px]'
        />
      );
    },
    cell: async ({ row }) => {
      'use server';
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select'
          className='translate-y-[2px]'
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: async ({ column }) => {
      'use server';
      return <DataTableColumnHeader column={column} title='Name' />;
    },
    cell: async ({ row }) => {
      'use server';
      return <div>{row.getValue('name')}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: async ({ column }) => {
      'use server';

      return <DataTableColumnHeader column={column} title='Email' />;
    },
    cell: async ({ row }) => {
      'use server';
      return <div>{row.getValue('email')}</div>;
    },
  },
];
