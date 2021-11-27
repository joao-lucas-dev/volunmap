import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Home } from '../pages/Home';
import { Event } from '../pages/Event';
import { Login } from '../pages/Login';
import { CreateUser } from '../pages/CreateUser';
import { Dashboard } from '../pages/Dashboard';
import { CreateEvent } from '../pages/CreateEvent';

const RoutesApp: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/evento" element={<Event />} />
    <Route path="/login" element={<Login />} />
    <Route path="/cadastrar" element={<CreateUser />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/criar-evento" element={<CreateEvent />} />
  </Routes>
);

export { RoutesApp };