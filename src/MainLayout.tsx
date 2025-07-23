// src/Layout.tsx
import { Outlet } from 'react-router';
import Header from './layouts/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="p-4">
        <Outlet /> 
      </main>
    </>
  );
};

export default Layout;
