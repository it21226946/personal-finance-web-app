import React from 'react';
import { Bell, CreditCard, Globe, Lock, UserCircle, HelpCircle } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-64 bg-gray-50 md:border-r border-gray-200">
            <nav className="flex flex-col p-4 md:p-0">
              <button className="flex items-center px-4 py-3 text-sm font-medium text-blue-600 bg-blue-50 md:border-l-4 border-blue-600 focus:outline-none">
                <UserCircle size={18} className="mr-3" />
                Account
              </button>
              <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none">
                <Bell size={18} className="mr-3" />
                Notifications
              </button>
              <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none">
                <CreditCard size={18} className="mr-3" />
                Payment Methods
              </button>
              <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none">
                <Lock size={18} className="mr-3" />
                Security
              </button>
              <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none">
                <Globe size={18} className="mr-3" />
                Preferences
              </button>
              <button className="flex items-center px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 focus:outline-none">
                <HelpCircle size={18} className="mr-3" />
                Help & Support
              </button>
            </nav>
          </div>
          
          {/* Content */}
          <div className="flex-1 p-6">
            <div className="pb-6 mb-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h2>
              
              <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                <div className="sm:w-32 sm:h-32 h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                  <UserCircle size={64} className="text-gray-400" />
                </div>
                
                <div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                    Change Avatar
                  </button>
                  <p className="mt-2 text-xs text-gray-500">
                    Recommended size: 200x200px. Max file size: 5MB.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="johndoe@example.com"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
            
            <div className="pb-6 mb-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Currency & Region</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select
                    defaultValue="USD"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="JPY">Japanese Yen (JPY)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timezone
                  </label>
                  <select
                    defaultValue="America/New_York"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium mr-3 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;