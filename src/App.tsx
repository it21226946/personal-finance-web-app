import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Goals from './pages/Goals';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { FinanceProvider } from './context/FinanceContext';

function App() {
  const [activePage, setActivePage] = useState<string>('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onNavigate={setActivePage} />;
      case 'transactions':
        return <Transactions />;
      case 'budgets':
        return <Budgets />;
      case 'goals':
        return <Goals />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setActivePage} />;
    }
  };

  return (
    <FinanceProvider>
      <div 
        className="min-h-screen bg-[url('https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1920')] 
        bg-cover bg-fixed bg-center before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br 
        before:from-blue-900/90 before:via-purple-900/90 before:to-indigo-900/90 before:z-0 relative"
      >
        <div className="relative z-10">
          <Header activePage={activePage} onNavigate={setActivePage} />
          <main className="pb-24">{renderPage()}</main>
          <Footer />
        </div>
      </div>
    </FinanceProvider>
  );
}

export default App;