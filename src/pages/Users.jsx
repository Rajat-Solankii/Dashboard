import React from 'react';
import DataTable from '../components/DataTable';
import { cn } from '../utils/utils';

// Mock data
const usersData = [
  { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-10-25' },
  { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor', status: 'Inactive', lastLogin: '2023-10-20' },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer', status: 'Active', lastLogin: '2023-10-24' },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Editor', status: 'Active', lastLogin: '2023-10-26' },
  { id: 5, name: 'Evan Wright', email: 'evan@example.com', role: 'Viewer', status: 'Pending', lastLogin: '-' },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-10-21' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { 
    key: 'status', 
    label: 'Status',
    render: (value) => (
      <span className={cn(
        "px-2.5 py-1 rounded-full text-xs font-medium",
        value === 'Active' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
        value === 'Inactive' ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      )}>
        {value}
      </span>
    )
  },
  { key: 'lastLogin', label: 'Last Login' },
];

const Users = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">User Management</h1>
        <p className="text-muted-foreground">Manage your team members and their account permissions here.</p>
      </div>

      <DataTable columns={columns} data={usersData} />
    </div>
  );
};

export default Users;
