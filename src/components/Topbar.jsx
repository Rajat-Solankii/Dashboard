import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const Topbar = () => {
  const { toggleSidebar, theme, toggleTheme } = useAppStore();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notifRef = useRef(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifs(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchOptions = [
    { label: 'Dashboard Overview', path: '/dashboard' },
    { label: 'Analytics & Traffic', path: '/dashboard/analytics' },
    { label: 'User Management', path: '/dashboard/users' },
    { label: 'Account Settings', path: '/dashboard/settings' },
  ];

  const filteredSearch = searchOptions.filter(opt => 
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="h-16 glass border-b border-border flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu size={20} />
        </button>
        
        {/* Search */}
        <div className="hidden md:block relative" ref={searchRef}>
          <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg border border-border/50 w-64 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <Search size={18} className="text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground text-foreground"
            />
          </div>
          
          {/* Search Results Dropdown */}
          {isSearchOpen && searchQuery.length > 0 && (
            <div className="absolute top-full left-0 mt-2 w-full bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {filteredSearch.length > 0 ? (
                <div className="py-2">
                  {filteredSearch.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        navigate(option.path);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary/70 transition-colors flex items-center gap-2"
                    >
                      <Search size={14} className="text-muted-foreground" />
                      {option.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center text-sm text-muted-foreground">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => {
              setShowNotifs(!showNotifs);
              if (!showNotifs) setHasUnread(false);
            }}
            className="relative p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Bell size={20} />
            {hasUnread && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-card" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                {hasUnread && (
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-medium">
                    3 New
                  </span>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {/* Notification Item 1 */}
                <div className="p-4 border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-foreground">New user registered</p>
                  <p className="text-xs text-muted-foreground mt-1">Alice Smith just created an account.</p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-70">2 minutes ago</p>
                </div>
                {/* Notification Item 2 */}
                <div className="p-4 border-b border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-foreground">Server maintenance</p>
                  <p className="text-xs text-muted-foreground mt-1">Scheduled downtime in 2 hours.</p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-70">1 hour ago</p>
                </div>
                {/* Notification Item 3 */}
                <div className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <p className="text-sm font-medium text-foreground">Campaign milestone</p>
                  <p className="text-xs text-muted-foreground mt-1">Spring Sale campaign hit 10k clicks!</p>
                  <p className="text-xs text-muted-foreground mt-2 opacity-70">3 hours ago</p>
                </div>
              </div>
              <div className="p-3 border-t border-border text-center bg-secondary/30">
                <button 
                  onClick={() => {
                    setShowNotifs(false);
                    navigate('/settings');
                  }} 
                  className="text-sm text-primary font-medium hover:underline"
                >
                  View all settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
