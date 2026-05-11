import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart, Line, Area
} from 'recharts';
import { useAppStore } from '../store/useAppStore';

const monthlyData = [
  { name: 'Jan', clicks: 4000, impressions: 8400, conversions: 240 },
  { name: 'Feb', clicks: 3000, impressions: 7200, conversions: 198 },
  { name: 'Mar', clicks: 2000, impressions: 9800, conversions: 350 },
  { name: 'Apr', clicks: 2780, impressions: 8908, conversions: 200 },
  { name: 'May', clicks: 1890, impressions: 6800, conversions: 150 },
  { name: 'Jun', clicks: 2390, impressions: 7800, conversions: 180 },
  { name: 'Jul', clicks: 3490, impressions: 11000, conversions: 400 },
];

const conversionData = [
  { name: 'Mon', rate: 2.4, target: 2.0 },
  { name: 'Tue', rate: 2.8, target: 2.0 },
  { name: 'Wed', rate: 2.1, target: 2.0 },
  { name: 'Thu', rate: 3.5, target: 2.0 },
  { name: 'Fri', rate: 3.2, target: 2.0 },
  { name: 'Sat', rate: 4.1, target: 2.0 },
  { name: 'Sun', rate: 3.8, target: 2.0 },
];

const Analytics = () => {
  const { theme } = useAppStore();
  const textColor = theme === 'dark' ? '#9ca3af' : '#6b7280';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Deep dive into your campaign performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign Performance Bar Chart */}
        <div className="bg-card border border-border shadow-sm p-6 rounded-2xl h-[450px] flex flex-col">
          <h3 className="text-lg font-semibold text-foreground mb-4">Traffic Breakdown</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: theme === 'dark' ? '#1f2937' : '#f3f4f6' }}
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                    borderRadius: '8px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="impressions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="clicks" fill="hsl(var(--primary) / 0.4)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Rate Composed Chart */}
        <div className="bg-card border border-border shadow-sm p-6 rounded-2xl h-[450px] flex flex-col">
          <h3 className="text-lg font-semibold text-foreground mb-4">Conversion Rate (%)</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={conversionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: textColor, fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))',
                    borderRadius: '8px'
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="rate" fill="url(#colorRate)" stroke="#10b981" strokeWidth={3} />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--primary))" strokeDasharray="5 5" dot={false} strokeWidth={2} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
