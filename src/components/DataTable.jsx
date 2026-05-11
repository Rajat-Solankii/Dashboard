import React, { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../utils/utils';

const DataTable = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // useMemo for filtering to prevent unnecessary calculations on re-renders
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowercasedSearch = searchTerm.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some(
        (val) => String(val).toLowerCase().includes(lowercasedSearch)
      )
    );
  }, [data, searchTerm]);

  // useMemo for sorting
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="bg-card border border-border shadow-sm rounded-2xl overflow-hidden flex flex-col">
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h3 className="text-lg font-semibold text-foreground">Recent Users</h3>
        <div className="flex items-center gap-2 px-3 py-2 bg-background/50 rounded-lg border border-border/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
          <Search size={16} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-48 placeholder:text-muted-foreground text-foreground"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 border-b border-border">
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  className={cn("px-6 py-4 font-medium", col.sortable !== false && "cursor-pointer select-none")}
                  onClick={() => col.sortable !== false && requestSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {col.sortable !== false && sortConfig.key === col.key && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                    {col.sortable !== false && sortConfig.key !== col.key && (
                      <ChevronUp size={14} className="opacity-20" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length > 0 ? (
              sortedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className="bg-transparent border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4 whitespace-nowrap">
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-muted-foreground">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
        <span>Showing {sortedData.length} of {data.length} entries</span>
        {/* Pagination placeholder if needed */}
      </div>
    </div>
  );
};

export default React.memo(DataTable);
