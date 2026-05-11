import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const Home = () => {
  const { token, theme, toggleTheme } = useAppStore();

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/30 dark:bg-primary/20 blur-[140px] pointer-events-none animate-blob" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-blue-500/20 dark:bg-blue-600/20 blur-[140px] pointer-events-none animate-blob [animation-delay:2000ms]" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-purple-500/20 dark:bg-purple-600/20 blur-[120px] pointer-events-none animate-blob [animation-delay:4000ms]" />

      {/* Navbar */}
      <header className="h-20 flex items-center justify-between px-6 lg:px-12 z-20 bg-white/95 dark:bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/30">
            I
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">InsightDash</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {token ? (
            <Link 
              to="/dashboard" 
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-5 py-2.5 text-foreground font-medium hover:bg-secondary rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 z-10">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 space-y-6 max-w-3xl">
          <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-tight">
            Data insights that drive <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-500">growth.</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            The modern analytics dashboard for ambitious teams. Get real-time metrics, robust reporting, and intuitive data visualizations all in one place.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            {token ? (
              <Link 
                to="/dashboard" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30 w-full sm:w-auto"
              >
                Enter Dashboard
              </Link>
            ) : (
              <Link 
                to="/signup" 
                className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30 w-full sm:w-auto"
              >
                Get Started for Free
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
