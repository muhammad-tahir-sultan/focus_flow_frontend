import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Goals from './pages/Goals';
import DailyLog from './pages/DailyLog';
import History from './pages/History';
import ControlList from './pages/ControlList';
import Vision from './pages/Vision';
import Loader from './components/Loader';

import type { ReactNode } from 'react';
import MasterRoadmap from './pages/MasterRoadmap';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();
    if (loading) return <Loader />;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/goals"
                            element={
                                <PrivateRoute>
                                    <Goals />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/log"
                            element={
                                <PrivateRoute>
                                    <DailyLog />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/log/:id"
                            element={
                                <PrivateRoute>
                                    <DailyLog />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/history"
                            element={
                                <PrivateRoute>
                                    <History />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/control-list"
                            element={
                                <PrivateRoute>
                                    <ControlList />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/vision"
                            element={
                                <PrivateRoute>
                                    <Vision />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/master-roadmap"
                            element={
                                <PrivateRoute>
                                    <MasterRoadmap />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
