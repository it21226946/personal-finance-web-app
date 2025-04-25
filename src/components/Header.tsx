import React, { useState } from 'react';
import { X, Menu, User, BarChart, Home, Wallet, Target, PiggyBank, Settings } from 'lucide-react';

interface NavLinkProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
        active
          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
          : 'text-white/80 hover:bg-white/10 hover:text-white hover:shadow-md'
      }`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};

interface HeaderProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'dashboard', text: 'Dashboard', icon: <Home size={20} /> },
    { id: 'transactions', text: 'Transactions', icon: <Wallet size={20} /> },
    { id: 'budgets', text: 'Budgets', icon: <PiggyBank size={20} /> },
    { id: 'goals', text: 'Goals', icon: <Target size={20} /> },
    { id: 'reports', text: 'Reports', icon: <BarChart size={20} /> },
    { id: 'settings', text: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <header className="bg-white/5 backdrop-blur-md shadow-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg shadow-lg">
              <PiggyBank size={28} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">
              FinanceTrack
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all ${
                  activePage === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                    : 'text-white/80 hover:bg-white/10 hover:text-white hover:shadow-md'
                }`}
              >
                {item.icon}
                <span>{item.text}</span>
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all text-white">
              <User size={20} />
              <span className="text-sm">John Doe</span>
            </button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-white/80 hover:text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/5 backdrop-blur-md border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                icon={item.icon}
                text={item.text}
                active={activePage === item.id}
                onClick={() => handleNavigate(item.id)}
              />
            ))}
            <div className="border-t border-white/10 pt-2 mt-2">
              <NavLink
                icon={<User size={20} />}
                text="Profile"
                active={false}
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;