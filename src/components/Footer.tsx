import React from 'react';
import { PiggyBank, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/10 backdrop-blur-md text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <PiggyBank size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold">FinanceTrack</span>
            </div>
            <p className="text-sm text-white/80">
              Your trusted companion for personal finance management and budgeting.
              Take control of your financial future today.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Transactions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Budgets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Goals</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>support@financetrack.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+94 11 234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Finance Street, Colombo 03, Sri Lanka</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} FinanceTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;