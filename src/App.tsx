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
import BackendMasteryGraph from './pages/BackendMasteryGraph';
import ProjectMasteryGraph from './pages/ProjectMasteryGraph';
import GoogleRoadmap from './pages/GoogleRoadmap';
import NextPath from './pages/NextPath';
import CleanCodeGuide from './pages/CleanCodeGuide';
import { Toaster } from 'react-hot-toast';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();
    if (loading) return <Loader />;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Toaster position="top-right" reverseOrder={false} />
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
                        <Route
                            path="/backend-graph"
                            element={
                                <PrivateRoute>
                                    <BackendMasteryGraph />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/project-graph"
                            element={
                                <PrivateRoute>
                                    <ProjectMasteryGraph />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/google-roadmap"
                            element={
                                <PrivateRoute>
                                    <GoogleRoadmap />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/next-path"
                            element={
                                <PrivateRoute>
                                    <NextPath />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/clean-code"
                            element={
                                <PrivateRoute>
                                    <CleanCodeGuide />
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
