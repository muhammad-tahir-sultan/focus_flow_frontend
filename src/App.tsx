import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Loader from './components/Loader';
import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

// Lazy load pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Goals = lazy(() => import('./pages/Goals'));
const DailyLog = lazy(() => import('./pages/DailyLog'));
const History = lazy(() => import('./pages/History'));
const ControlList = lazy(() => import('./pages/ControlList'));
const Vision = lazy(() => import('./pages/Vision'));
const MasterRoadmap = lazy(() => import('./pages/MasterRoadmap'));
const BackendMasteryGraph = lazy(() => import('./pages/BackendMasteryGraph'));
const ProjectMasteryGraph = lazy(() => import('./pages/ProjectMasteryGraph'));
const GoogleRoadmap = lazy(() => import('./pages/GoogleRoadmap'));
const NextPath = lazy(() => import('./pages/NextPath'));
const CleanCodeGuide = lazy(() => import('./pages/CleanCodeGuide'));
const SkillsManager = lazy(() => import('./pages/SkillsManager'));

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const { user, loading } = useAuth();
    if (loading) return <Loader />;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Toaster position="bottom-left" reverseOrder={false} />
            <Router>
                <Layout>
                    <Suspense fallback={<Loader />}>
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
                            <Route
                                path="/skills"
                                element={
                                    <PrivateRoute>
                                        <SkillsManager />
                                    </PrivateRoute>
                                }
                            />
                        </Routes>
                    </Suspense>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
