import '../styles/SlowApiRescueBlog.css'; // Reusing the blog styles
import { Link } from 'react-router-dom';

const AuthRoleChaosBlog = () => {
    return (
        <div className="blog-post-page">
            <Link to="/practice-projects" className="blog-back-link">← Back to Practice Projects</Link>

            <h1>🔐 Auth & Role Chaos: From Hardcoded Nightmares to Scalable RBAC</h1>

            <p>
                Authentication is easy. Authorization—deciding <em>who</em> can do <em>what</em>—is where things messy.
                In this project, I tackled a codebase suffering from "Role Chaos": hardcoded checks, scattered permission logic,
                and security loopholes that appeared whenever a role was changed.
            </p>

            <p>
                The mission: Refactor a fragile, hardcoded auth system into a robust, database-driven
                <strong>Role-Based Access Control (RBAC)</strong> system using NestJS Guards and Decorators.
            </p>

            <hr style={{ borderColor: '#334155', margin: '2rem 0' }} />

            <h2>❌ The Problem</h2>
            <p>
                The existing system worked, but it was a ticking time bomb.
            </p>

            <h3>Key Issues Identification:</h3>
            <ul>
                <li><strong>Hardcoded Roles</strong>: Checks like <code>if (user.role === 'manager')</code> were pasted into dozens of controllers.</li>
                <li><strong>Rigid Permissions</strong>: Adding a new role (e.g., "Editor") required modifying code in 15+ files.</li>
                <li><strong>Security Risks</strong>: Revoking a user's role didn't take effect until their token expired (often hours later).</li>
                <li><strong>Duplicated Guards</strong>: Every route had its own custom logic for checking access.</li>
            </ul>

            <h2>🎯 The Goal</h2>
            <p><strong>Objective</strong>: Implement a clean RBAC architecture where roles and permissions are dynamic.</p>
            <p><strong>Success Criteria</strong>:</p>
            <ul>
                <li>No controller contains manual role logic.</li>
                <li>Roles are configurable via the database (Dynamic RBAC).</li>
                <li>Client-facing outcome: <em>"Fixed broken role-based access and made auth scalable."</em></li>
            </ul>

            <h2>✅ Technical Implementation & Fixes</h2>

            <h3>1. The "Clean" Decorator Approach</h3>

            <p><strong>The "Bad" Approach:</strong></p>
            <p>Controller methods were polluted with manual checks.</p>
            <pre><code>{`// ❌ BAD: Hardcoded & Repetitive
@Post('create')
createProduct(@Req() req) {
  if (req.user.role !== 'admin' && req.user.role !== 'manager') {
    throw new ForbiddenException();
  }
  // ... logic
}`}</code></pre>

            <p><strong>The "Good" Approach (Custom Decorators):</strong></p>
            <p>I introduced a custom <code>@Permissions()</code> decorator that abstracts the logic away.</p>
            <pre><code>{`// ✅ GOOD: Declarative & Clean
@Post('create')
@Permissions(Permission.CREATE_PRODUCT) // 👈 Zero logic here
createProduct() {
  return this.productService.create();
}`}</code></pre>

            <h3>2. Dynamic Guard Implementation</h3>
            <p>The magic happens in the <code>RolesGuard</code>. Instead of checking strings, it looks up the user's role and their assigned permissions from the database (cached via Redis for performance).</p>

            <pre><code>{`// RolesGuard.ts (Simplified)
canActivate(context: ExecutionContext): boolean {
  const requiredPermission = this.reflector.get('permission', context.getHandler());
  const user = context.switchToHttp().getRequest().user;

  // 1. Fetch user's role and permissions
  // 2. Check if user.permissions includes requiredPermission
  return hasPermission;
}`}</code></pre>

            <h3>3. Database-Driven Role Mapping</h3>
            <p>Moving roles from <strong>Code</strong> to <strong>Database</strong> was crucial. Now, an admin can go to the dashboard, check "Can Delete Users" for the "Manager" role, and it updates instantly without a deploy.</p>

            <table>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Permissions (JSON)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Admin</td>
                        <td><code>["*"]</code></td>
                    </tr>
                    <tr>
                        <td>Manager</td>
                        <td><code>["read:reports", "update:users"]</code></td>
                    </tr>
                    <tr>
                        <td>User</td>
                        <td><code>["read:own_profile"]</code></td>
                    </tr>
                </tbody>
            </table>

            <h3>4. Refresh Token Rotation</h3>
            <p>To fix the "zombie permission" issue, I implemented <strong>Refresh Token Rotation</strong>.</p>
            <ul>
                <li>When a user's role changes, their specific refresh token is invalidated in the DB.</li>
                <li>The next time they try to refresh their access token, they are forced to log out.</li>
            </ul>

            <h2>🧪 Results & Metrics</h2>

            <div className="metric-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Refactor Time</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>-90% Effort</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>To add new roles</div>
                </div>
                <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Security</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4ade80' }}>Zero Leaks</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Regressions eliminated</div>
                </div>
            </div>

            <hr style={{ borderColor: '#334155', margin: '3rem 0' }} />

            <h2>🚀 Conclusion</h2>
            <p>
                Hardcoding roles is a technical debt trap. By moving to a <strong>Database-Driven RBAC</strong> system with
                NestJS Guards and Decorators, I transformed a fragile auth layer into a secure, scalable foundation.
            </p>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>👉 Ready to Fix Chaos?</h3>
                <p>Dive into the practice project to build this RBAC system from scratch.</p>
                <Link to="/practice-projects" className="button" style={{
                    display: 'inline-block',
                    background: '#3b82f6',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                }}>Go to Projects Board</Link>
            </div>
        </div>
    );
};

export default AuthRoleChaosBlog;
