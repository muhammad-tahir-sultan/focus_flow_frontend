import '../styles/SlowApiRescueBlog.css'; // Reusing the blog styles
import { Link } from 'react-router-dom';

const MessyBackendRefactorBlog = () => {
    return (
        <div className="blog-post-page">
            <Link to="/practice-projects" className="blog-back-link">← Back to Practice Projects</Link>

            <h1>🧹 Messy Backend Refactor: From Spaghetti Code to Clean Architecture</h1>

            <p>
                We've all seen it: a <code>UserController</code> that is 500 lines long, containing validation logic, database queries,
                and third-party API calls all mixed together. This is "Spaghetti Code," and it kills developer velocity.
            </p>

            <p>
                In this project, I took a chaotic, monolithic backend and refactored it into a modular, <strong>Clean Architecture</strong> system using NestJS best practices.
            </p>

            <hr style={{ borderColor: '#334155', margin: '2rem 0' }} />

            <h2>❌ The Problem</h2>
            <p>The codebase was a nightmare to maintain.</p>

            <h3>Key Issues Identified:</h3>
            <ul>
                <li><strong>Fat Controllers</strong>: Controllers were handling HTTP requests, business logic, <em>and</em> database access.</li>
                <li><strong>No Separation of Concerns</strong>: Changing a database field name required updating code in 10 different files.</li>
                <li><strong>Tightly Coupled Modules</strong>: The <code>OrderModule</code> imported the <code>UserSchema</code> directly, making it impossible to reuse or test in isolation.</li>
                <li><strong>Untestable Code</strong>: Because everything was in one big function, unit testing was impossible.</li>
            </ul>

            <h2>🎯 The Goal</h2>
            <p><strong>Objective</strong>: Refactor the codebase to separate concerns strictly: <strong>Controllers</strong> (HTTP), <strong>Services</strong> (Business Logic), and <strong>Repositories</strong> (Data Access).</p>
            <p><strong>Success Criteria</strong>:</p>
            <ul>
                <li>Add a new feature in &lt;30 minutes.</li>
                <li>Zero DB calls in Controllers.</li>
                <li>Client-facing outcome: <em>"Refactored messy backend into scalable architecture, reducing technical debt by 80%."</em></li>
            </ul>

            <h2>✅ Technical Implementation & Fixes</h2>

            <h3>1. Thinning the Controllers</h3>
            <p><strong>The "Bad" Approach:</strong></p>
            <p>Controllers doing too much work.</p>

            <pre><code>{`// ❌ BAD: Fat Controller
@Post()
async createUser(@Body() body) {
  if (!body.email.includes('@')) throw new Error('Invalid email'); // Validation logic
  const existing = await this.userModel.findOne({ email: body.email }); // DB Logic
  if (existing) throw new Error('User exists');
  // ... 50 more lines of logic
  return this.userModel.save(body);
}`}</code></pre>

            <p><strong>The "Good" Approach:</strong></p>
            <p>Controllers should only handle HTTP concerns (DTOs, headers, status codes).</p>
            <pre><code>{`// ✅ GOOD: Thin Controller
@Post()
createUser(@Body() createUserDto: CreateUserDto) {
  // Delegate EVERYTHING to the service
  return this.usersService.create(createUserDto);
}`}</code></pre>

            <h3>2. Service Layer & Dependency Injection</h3>
            <p>I moved all business logic (validation, complex calculations, orchestration) into <strong>Services</strong>.</p>

            <pre><code>{`// ✅ GOOD: Service Layer
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto) {
    await this.validateUser(dto); // Business rules
    const hashedPassword = await this.hashPassword(dto.password);
    return this.usersRepository.create({ ...dto, password: hashedPassword });
  }
}`}</code></pre>

            <h3>3. Repository Pattern Implementation</h3>
            <p>Direct Mongoose/TypeORM calls were replaced with a <strong>Repository Pattern</strong>. This decouples the business logic from the specific database being used.</p>

            <pre><code>{`// ✅ GOOD: Repository Pattern
// If we switch from MongoDB to SQL, we only change THIS file.
@Injectable()
export class UsersRepository {
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}`}</code></pre>

            <h3>4. Modularization</h3>
            <p>I broke the monolithic app into feature-based modules (<code>UserModule</code>, <code>AuthModule</code>, <code>OrderModule</code>).</p>
            <ul>
                <li><strong>Before</strong>: One giant <code>app.module.ts</code> importing everything.</li>
                <li><strong>After</strong>: Each module explicitly exports only what other modules need (Encapsulation).</li>
            </ul>

            <h2>🧪 Results & Metrics</h2>

            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Before Refactor</th>
                        <th>After Refactor</th>
                        <th>Improvement</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Lines per Controller</strong></td>
                        <td>~300 lines</td>
                        <td>~40 lines</td>
                        <td><span className="blog-metric-highlight">85% Reduction</span></td>
                    </tr>
                    <tr>
                        <td><strong>New Feature Time</strong></td>
                        <td>4 hours</td>
                        <td>30 mins</td>
                        <td><span className="blog-metric-highlight">8x Faster</span></td>
                    </tr>
                    <tr>
                        <td><strong>Test Coverage</strong></td>
                        <td>0%</td>
                        <td>90%</td>
                        <td><span className="blog-metric-highlight">Unit Testing Enabled</span></td>
                    </tr>
                </tbody>
            </table>

            <hr style={{ borderColor: '#334155', margin: '3rem 0' }} />

            <h2>🚀 Conclusion</h2>
            <p>
                Clean Architecture isn't just about making code "look nice"—it's about survival. By separating concerns and
                enforcing module boundaries, I turned a fragile codebase into one that the team can actually work with.
            </p>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>👉 Ready to Clean Up?</h3>
                <p>Grab the spaghetti code and refactor it yourself in the practice project.</p>
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

export default MessyBackendRefactorBlog;
