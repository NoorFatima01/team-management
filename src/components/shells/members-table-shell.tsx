import { type ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';

import { memberTableSchemaType } from '@/lib/schemas';

import DataTable from '@/components/table/data-table';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { DataTableRowActions } from '@/components/table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';

interface MembersTableShellProps<TData> {
  data: TData[];
}

export default function MembersTableShell({
  data,
}: MembersTableShellProps<memberTableSchemaType>) {
  const columns = useMemo<ColumnDef<memberTableSchemaType, unknown>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => {
          return (
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label='Select all'
              className='translate-y-[2px]'
            />
          );
        },
        cell: ({ row }) => {
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
        accessorKey: 'username',
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title='Name' />;
        },
        cell: ({ row }) => {
          return <div>{row.getValue('username')}</div>;
        },
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title='Email' />;
        },
        cell: ({ row }) => {
          return <div>{row.getValue('email')}</div>;
        },
      },
      {
        id: 'actions',
        cell: () => <DataTableRowActions />,
      },
    ],
    []
  );

  return <DataTable columns={columns} data={data} />;
}
