import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import AppLoadingSkeleton from './components/AppLoadingSkeleton';
import PrivateRoute from './components/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import './styles/modal.css';
import './styles/components.css';
import { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { lazyWithRetry } from './utils/lazyWithRetry';

// Lazy load pages with retry logic
const Login = lazyWithRetry(() => import('./pages/Login'));
const Register = lazyWithRetry(() => import('./pages/Register'));
const Dashboard = lazyWithRetry(() => import('./pages/Dashboard'));
const Goals = lazyWithRetry(() => import('./pages/Goals'));
const DailyLog = lazyWithRetry(() => import('./pages/DailyLog'));
const History = lazyWithRetry(() => import('./pages/History'));
const ControlList = lazyWithRetry(() => import('./pages/ControlList'));
const Vision = lazyWithRetry(() => import('./pages/Vision'));
const MasterRoadmap = lazyWithRetry(() => import('./pages/MasterRoadmap'));
const BackendMasteryGraph = lazyWithRetry(() => import('./pages/BackendMasteryGraph'));
const ProjectMasteryGraph = lazyWithRetry(() => import('./pages/ProjectMasteryGraph'));
const GoogleRoadmap = lazyWithRetry(() => import('./pages/GoogleRoadmap'));
const NextPath = lazyWithRetry(() => import('./pages/NextPath'));
const CleanCodeGuide = lazyWithRetry(() => import('./pages/CleanCodeGuide'));
const SkillsManager = lazyWithRetry(() => import('./pages/SkillsManager'));
const Finance = lazyWithRetry(() => import('./pages/Finance'));
const CalorieTracker = lazyWithRetry(() => import('./pages/CalorieTracker'));
const FocusFlowPage = lazyWithRetry(() => import('./pages/FocusFlowPage'));
const IdentityPage = lazyWithRetry(() => import('./pages/IdentityPage'));
const PracticeProjects = lazyWithRetry(() => import('./pages/PracticeProjects'));
const SlowApiRescueBlog = lazyWithRetry(() => import('./pages/SlowApiRescueBlog'));
const AuthRoleChaosBlog = lazyWithRetry(() => import('./pages/AuthRoleChaosBlog'));
const MessyBackendRefactorBlog = lazyWithRetry(() => import('./pages/MessyBackendRefactorBlog'));
const ProductionDebuggingBlog = lazyWithRetry(() => import('./pages/ProductionDebuggingBlog'));
const DatabasePerformanceBlog = lazyWithRetry(() => import('./pages/DatabasePerformanceBlog'));
const GraphqlPerformanceBlog = lazyWithRetry(() => import('./pages/GraphqlPerformanceBlog'));
const ScalabilityStressTestBlog = lazyWithRetry(() => import('./pages/ScalabilityStressTestBlog'));

const ClientHunting = lazyWithRetry(() => import('./pages/ClientHunting'));
const FitnessPlan = lazyWithRetry(() => import('./pages/FitnessPlan'));
const EbayBusiness = lazyWithRetry(() => import('./pages/EbayBusiness'));
const BusinessAutomation = lazyWithRetry(() => import('./pages/BusinessAutomation'));



function App() {
    return (
        <AuthProvider>
            <Toaster position="bottom-left" reverseOrder={false} />
            <Router>
                <Layout>
                    <ErrorBoundary>
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
                                    path="/calories"
                                    element={
                                        <PrivateRoute>
                                            <CalorieTracker />
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

                                <Route
                                    path="/get-clients"
                                    element={
                                        <PrivateRoute adminOnly={true}>
                                            <ClientHunting />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/fitness"
                                    element={
                                        <PrivateRoute>
                                            <FitnessPlan />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/ebay"
                                    element={
                                        <PrivateRoute adminOnly={true}>
                                            <EbayBusiness />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/ai-business"
                                    element={
                                        <PrivateRoute adminOnly={true}>
                                            <BusinessAutomation />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </Suspense>
                    </ErrorBoundary>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
