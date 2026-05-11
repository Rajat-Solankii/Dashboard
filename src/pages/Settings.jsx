import React, { useState } from 'react';
import { Bell, Shield, User, Globe, Key, Smartphone, Mail, Lock } from 'lucide-react';
import { cn } from '../utils/utils';
import { useAppStore } from '../store/useAppStore';

const Settings = () => {
  const { user } = useAppStore();
  const [activeTab, setActiveTab] = useState('notifications');
  
  // Notification State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [marketingNotifs, setMarketingNotifs] = useState(false);

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Navigation */}
        <aside className="lg:w-64 flex-shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon size={18} className={isActive ? "text-primary-foreground" : "text-muted-foreground"} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Settings Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            
            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground mt-1">Choose what updates you want to receive.</p>
                </div>
                
                <div className="border-t border-border pt-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 pr-4">
                      <h3 className="text-base font-medium text-foreground flex items-center gap-2">
                        <Mail size={16} className="text-muted-foreground" />
                        Email Notifications
                      </h3>
                      <p className="text-sm text-muted-foreground">Receive daily summaries and important alerts via email.</p>
                    </div>
                    <button 
                      onClick={() => setEmailNotifs(!emailNotifs)}
                      className={cn(
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        emailNotifs ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        emailNotifs ? "translate-x-5" : "translate-x-0"
                      )} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 pr-4">
                      <h3 className="text-base font-medium text-foreground flex items-center gap-2">
                        <Smartphone size={16} className="text-muted-foreground" />
                        Push Notifications
                      </h3>
                      <p className="text-sm text-muted-foreground">Receive real-time alerts directly in your browser.</p>
                    </div>
                    <button 
                      onClick={() => setPushNotifs(!pushNotifs)}
                      className={cn(
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                        pushNotifs ? "bg-primary" : "bg-muted"
                      )}
                    >
                      <span className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                        pushNotifs ? "translate-x-5" : "translate-x-0"
                      )} />
                    </button>
                  </div>
                </div>

                <div className="border-t border-border pt-6 flex justify-end">
                  <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm shadow-primary/20">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* ACCOUNT TAB */}
            {activeTab === 'account' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Account Information</h2>
                  <p className="text-sm text-muted-foreground mt-1">Update your personal details and public profile.</p>
                </div>
                
                <div className="border-t border-border pt-6 space-y-5">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-3xl border-2 border-border shadow-sm">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <button className="px-4 py-2 border border-border text-foreground hover:bg-secondary rounded-lg text-sm font-medium transition-colors">
                      Change Avatar
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={user?.name || ''} 
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={user?.email || ''} 
                        className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Bio</label>
                    <textarea 
                      rows={3}
                      placeholder="A short bio about yourself..."
                      className="w-full px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-none"
                    />
                  </div>
                </div>

                <div className="border-t border-border pt-6 flex justify-end">
                  <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm shadow-primary/20">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === 'security' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Security Settings</h2>
                  <p className="text-sm text-muted-foreground mt-1">Keep your account secure with a strong password.</p>
                </div>
                
                <div className="border-t border-border pt-6 space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Current Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input 
                        type="password" 
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">New Password</label>
                      <div className="relative">
                        <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input 
                          type="password" 
                          className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-foreground">Confirm New Password</label>
                      <div className="relative">
                        <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input 
                          type="password" 
                          className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-6 flex justify-end">
                  <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm shadow-primary/20">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">App Preferences</h2>
                  <p className="text-sm text-muted-foreground mt-1">Customize your dashboard experience.</p>
                </div>
                
                <div className="border-t border-border pt-6 space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Language</label>
                    <select className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none">
                      <option>English (US)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground">Timezone</label>
                    <select className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground appearance-none">
                      <option>Pacific Time (PT)</option>
                      <option>Eastern Time (ET)</option>
                      <option>Coordinated Universal Time (UTC)</option>
                      <option>Central European Time (CET)</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-border pt-6 flex justify-end">
                  <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm shadow-primary/20">
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
