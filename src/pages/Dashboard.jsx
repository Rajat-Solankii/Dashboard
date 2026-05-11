import React from 'react';
import { DollarSign, Users, Activity, CreditCard } from 'lucide-react';
import StatCard from '../components/StatCard';
import RevenueChart from '../components/charts/RevenueChart';
import UserDemographicsChart from '../components/charts/UserDemographicsChart';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value="$45,231.89" 
          icon={DollarSign} 
          trend="up" 
          trendValue="20.1%" 
        />
        <StatCard 
          title="Active Users" 
          value="2,350" 
          icon={Users} 
          trend="up" 
          trendValue="180.1%" 
        />
        <StatCard 
          title="Sales" 
          value="+12,234" 
          icon={CreditCard} 
          trend="down" 
          trendValue="4.5%" 
        />
        <StatCard 
          title="Active Now" 
          value="+573" 
          icon={Activity} 
          trend="up" 
          trendValue="201" 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <UserDemographicsChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
