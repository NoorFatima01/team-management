import { type ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';

import { projectSchemaType } from '@/lib/schemas';

import DataTable from '@/components/table/data-table';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { DataTableRowActions } from '@/components/table/data-table-row-actions';
import { Checkbox } from '@/components/ui/checkbox';

interface ProjectsTableShellProps<TData> {
  data: TData[];
}

export default function ProjectsTableShell({
  data,
}: ProjectsTableShellProps<projectSchemaType>) {
  const columns = useMemo<ColumnDef<projectSchemaType, unknown>[]>(
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
        accessorKey: 'project_id',
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title='Project Id' />;
        },
        cell: ({ row }) => {
          return <div>{row.getValue('project_id')}</div>;
        },
      },
      {
        accessorKey: 'name',
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title='Name' />;
        },
        cell: ({ row }) => {
          return <div>{row.getValue('name')}</div>;
        },
      },
      {
        accessorKey: 'project_status',
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title='Status' />;
        },
        cell: ({ row }) => {
          return <div>{row.getValue('project_status')}</div>;
        },
      },
      {
        id: 'actions',
        cell: () => <DataTableRowActions />,
      },
    ],
    []
  );
  return <DataTable columns={columns} data={data} isClickable={true} />;
}

// /dashboard/projects/${ (row.original as { name: string }).name
