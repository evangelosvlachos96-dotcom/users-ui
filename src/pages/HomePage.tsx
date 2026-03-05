import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface Card { to: string; title: string; description: string; cta: string; icon: React.ReactNode; color: string; }

const cards: Card[] = [
  {
    to: '/users',
    title: 'Display Users',
    description: 'Browse all registered users. Search by name, filter by gender, view details, edit or delete records.',
    cta: 'View Users',
    color: 'bg-indigo-600',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    to: '/register',
    title: 'Register New User',
    description: 'Add a new user to the system. Fill in personal details, birthdate, gender and optional addresses.',
    cta: 'Register Now',
    color: 'bg-emerald-600',
    icon: (
      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
];

const HomePage: FC = () => (
  <div className="max-w-4xl mx-auto px-6 py-16">

    <div className="text-center mb-12">
      <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 inline-block" />
        Spring Boot · React · TypeScript · MySQL
      </span>
      <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
        Users Manager
      </h1>
      <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
        Manage user records with a clean REST API backed by Spring Boot and JPA/Hibernate.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {cards.map(({ to, title, description, cta, icon, color }) => (
        <Link key={to} to={to} className="no-underline group">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full
            hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-5`}>
              {icon}
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">{description}</p>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 group-hover:gap-2.5 transition-all">
              {cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          </div>
        </Link>
      ))}
    </div>

    <p className="text-center text-xs text-gray-300 mt-12 font-medium tracking-wide uppercase">
      JPA/Hibernate · Maven · React Router · Axios · TypeScript
    </p>
  </div>
);

export default HomePage;
