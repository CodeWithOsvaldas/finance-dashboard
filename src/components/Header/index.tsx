import React from 'react';
import { faBank, faChartPie, faCreditCard, faHome } from '@fortawesome/free-solid-svg-icons';
import NavLink from './NavLink';

function Header() {
  return (
    <header className="z-40 flex h-16 w-full items-center justify-between">
      <div className="navbar bg-base-100 p-0">
        <div className="navbar-start h-16">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            <ul tabIndex={0} className="dropdown-content menu menu-compact mt-3 w-52 bg-base-100 p-2 shadow">
              <li>
                <NavLink name="Transactions" href="/transactions" icon={faBank} bottomBorder={false} />
              </li>
              <li tabIndex={0}>
                <NavLink name="Overview" href="/" icon={faHome} bottomBorder={false} />
              </li>
              <li>
                <NavLink name="Bank Accounts" href="/bank-accounts" icon={faCreditCard} bottomBorder={false} />
              </li>
              <li>
                <NavLink name="Categories" href="/categories" icon={faChartPie} bottomBorder={false} />
              </li>
            </ul>
          </div>
          <span className="pl-5 text-xl font-semibold normal-case">Finance Dashboard</span>
        </div>
        <div className="navbar-center hidden h-16 lg:flex">
          <ul className="menu menu-horizontal h-full p-0">
            <li>
              <NavLink name="Transactions" href="/transactions" icon={faBank} />
            </li>
            <li tabIndex={0}>
              <NavLink name="Overview" href="/" icon={faHome} />
            </li>
            <li>
              <NavLink name="Bank Accounts" href="/bank-accounts" icon={faCreditCard} />
            </li>
            <li>
              <NavLink name="Categories" href="/categories" icon={faChartPie} />
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
              <div />
            </label>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
