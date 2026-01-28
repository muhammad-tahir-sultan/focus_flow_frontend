import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import AppLoadingSkeleton from './components/AppLoadingSkeleton';
import './styles/modal.css';
import './styles/components.css';
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
const Finance = lazy(() => import('./pages/Finance'));
const FocusFlowPage = lazy(() => import('./pages/FocusFlowPage'));
const IdentityPage = lazy(() => import('./pages/IdentityPage'));
const PracticeProjects = lazy(() => import('./pages/PracticeProjects'));
const SlowApiRescueBlog = lazy(() => import('./pages/SlowApiRescueBlog'));
const AuthRoleChaosBlog = lazy(() => import('./pages/AuthRoleChaosBlog'));
const MessyBackendRefactorBlog = lazy(() => import('./pages/MessyBackendRefactorBlog'));
const ProductionDebuggingBlog = lazy(() => import('./pages/ProductionDebuggingBlog'));
const DatabasePerformanceBlog = lazy(() => import('./pages/DatabasePerformanceBlog'));
const GraphqlPerformanceBlog = lazy(() => import('./pages/GraphqlPerformanceBlog'));
const ScalabilityStressTestBlog = lazy(() => import('./pages/ScalabilityStressTestBlog'));

const PrivateRoute = ({ children, adminOnly = false }: { children: ReactNode, adminOnly?: boolean }) => {
    const { user, loading, isAdmin } = useAuth();
    if (loading) return <AppLoadingSkeleton />;

    if (!user) return <Navigate to="/login" />;

    if (adminOnly && !isAdmin()) {
        return <Navigate to="/" />; // Or a generic Not Authorized page
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Toaster position="bottom-left" reverseOrder={false} />
            <Router>
                <Layout>
                    <Suspense fallback={<AppLoadingSkeleton />}>
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
                            <Route
                                path="/expenses"
                                element={
                                    <PrivateRoute>
                                        <Finance />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/attract_not_chase"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <FocusFlowPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/identity"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <IdentityPage />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/practice-projects"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <PracticeProjects />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/projects/slow-api-rescue"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <SlowApiRescueBlog />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/projects/auth-role-chaos"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <AuthRoleChaosBlog />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/projects/messy-backend-refactor"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <MessyBackendRefactorBlog />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/projects/production-debugging"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <ProductionDebuggingBlog />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/projects/database-performance"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <DatabasePerformanceBlog />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/projects/graphql-performance"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <GraphqlPerformanceBlog />
                                    </PrivateRoute>
                                }
                            />
                            <Route
                                path="/projects/scalability-stress-test"
                                element={
                                    <PrivateRoute adminOnly={true}>
                                        <ScalabilityStressTestBlog />
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
