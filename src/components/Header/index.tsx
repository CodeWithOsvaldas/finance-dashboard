import UserLink from '@/components/Header/UserLink';
import React from 'react';
import { faBank, faChartPie, faCreditCard, faHome } from '@fortawesome/free-solid-svg-icons';
import NavLink from './NavLink';

function Header() {
  return (
    <div className="flex h-16 items-center justify-between">
      <h2 className="pl-5 text-2xl font-bold tracking-tight">Finance Dashboard</h2>
      <nav className="space-x-4 lg:space-x-6">
        <NavLink name="Transactions" href="/transactions" icon={faBank} />
        <NavLink name="Overview" href="/" icon={faHome} />
        <NavLink name="Bank Accounts" href="/bank-accounts" icon={faCreditCard} />
        <NavLink name="Categories" href="/categories" icon={faChartPie} />
      </nav>
      <div className="mx-6 flex">
        <UserLink />
      </div>
    </div>
  );
}

export default Header;
