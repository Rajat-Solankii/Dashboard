import React from 'react';
import { cn } from '../utils/utils';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, className }) => {
  return (
    <div className={cn("bg-card border border-border shadow-sm p-6 rounded-2xl flex flex-col gap-4", className)}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <Icon size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-foreground">{value}</h3>
        {trend && (
          <p className="text-sm mt-2 flex items-center gap-1">
            <span className={cn(
              "font-medium",
              trend === 'up' ? "text-green-500" : "text-red-500"
            )}>
              {trend === 'up' ? '+' : '-'}{trendValue}
            </span>
            <span className="text-muted-foreground">vs last month</span>
          </p>
        )}
      </div>
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders for static stat cards
export default React.memo(StatCard);
