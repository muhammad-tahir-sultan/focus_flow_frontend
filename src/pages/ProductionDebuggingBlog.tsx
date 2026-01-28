import '../styles/SlowApiRescueBlog.css'; // Reusing the blog styles
import { Link } from 'react-router-dom';

const ProductionDebuggingBlog = () => {
    return (
        <div className="blog-post-page">
            <Link to="/practice-projects" className="blog-back-link">← Back to Practice Projects</Link>

            <h1>🐛 Production Bug Debugging: Taming the Chaos of Random Failures</h1>

            <p>
                "It works on my machine." — The last words of a developer before a production incident.
            </p>

            <p>
                In this project, I stepped into a simulation of a buggy production environment plagued by random failures:
                users getting logged out unexpectedly, requests failing intermittently, and data becoming inconsistent.
            </p>

            <p>
                The goal? Stop guessing and start <strong>debugging</strong> with engineering rigor.
            </p>

            <hr style={{ borderColor: '#334155', margin: '2rem 0' }} />

            <h2>❌ The Problem</h2>
            <p>The system was riddled with "Heisenbugs"—bugs that seemed to disappear when looked at, but caused chaos at scale.</p>

            <h3>Key Symptoms:</h3>
            <ul>
                <li><strong>Silent Failures</strong>: Promises were rejecting without <code>catch()</code> blocks, causing mostly invisible memory leaks or process crashes.</li>
                <li><strong>Race Conditions</strong>: Two users booking the same seat simultaneously resulted in double bookings.</li>
                <li><strong>Ambiguous Logs</strong>: Logs like <code>Error: undefined</code> gave zero context.</li>
                <li><strong>Token Expiry Loops</strong>: Users were forced to re-login every 15 minutes because edge cases in token rotation weren't handled.</li>
            </ul>

            <h2>🎯 The Goal</h2>
            <p><strong>Objective</strong>: Stabilize the production environment by implementing <strong>Observability</strong> and <strong>Resilience</strong>.</p>
            <p><strong>Success Criteria</strong>:</p>
            <ul>
                <li>Zero unhandled exceptions.</li>
                <li>100% of errors have a structured log with correlation IDs.</li>
                <li>Client-facing outcome: <em>"Helped debug and stabilize production backend, eliminating 95% of user-reported errors."</em></li>
            </ul>

            <h2>✅ Technical Implementation & Fixes</h2>

            <h3>1. Structured Logging (Goodbye <code>console.log</code>)</h3>
            <p><strong>The "Bad" Approach:</strong></p>
            <p>Standard logs are just text streams.</p>

            <pre><code>{`// ❌ BAD: Useless Log
console.log('Error happened', err); 
// Output: "Error happened [Object object]"`}</code></pre>

            <p><strong>The "Good" Approach (Structured Logging):</strong></p>
            <p>I implemented <strong>Winston/Pino</strong> to log JSON objects. This allows searching by <code>userId</code> or <code>orderId</code> in tools like Datadog or ELK.</p>
            <pre><code>{`// ✅ GOOD: Contextual & Searchable
logger.error('Payment failed', { 
  userId: user.id, 
  amount: 50.00, 
  error: err.message, 
  stack: err.stack 
});`}</code></pre>

            <h3>2. Centralized Exception Handling</h3>
            <p>Instead of <code>try-catch</code> blocks in every service, I implemented a <strong>Global Exception Filter</strong> (NestJS).</p>

            <pre><code>{`// ✅ GOOD: Global Guard for Errors
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // Log CRITICAL errors automatically
    this.logger.error('Critical Crash:', exception);

    response.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error', // Don't leak stack traces to client!
    });
  }
}`}</code></pre>

            <h3>3. Fixing Race Conditions (Optimistic Locking)</h3>
            <p>The double-booking issue was caused by concurrent updates.</p>

            <p><strong>The Fix:</strong></p>
            <p>I added a <code>version</code> field to the document.</p>

            <pre><code>{`// ✅ GOOD: Optimistic Concurrency Control
const ticket = await Ticket.findOne({ _id: ticketId });
// Only update if version matches what we just read
const result = await Ticket.updateOne(
  { _id: ticketId, version: ticket.version },
  { $set: { status: 'SOLD' }, $inc: { version: 1 } }
);

if (result.modifiedCount === 0) {
  throw new ConflictException('Ticket already sold, please retry.');
}`}</code></pre>

            <h3>4. Retry Logic with Exponential Backoff</h3>
            <p>Network blips happen. Instead of failing immediately, I implemented intelligent retries.</p>

            <pre><code>{`// ✅ GOOD: Resilience
await retry(async () => {
    return await externalApi.chargeCard();
}, {
    retries: 3,
    minTimeout: 1000, // Wait 1s, then 2s, then 4s
});`}</code></pre>

            <h2>🧪 Results & Metrics</h2>

            <table>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Before Optimization</th>
                        <th>After Optimization</th>
                        <th>Improvement</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Unhandled Rejections</strong></td>
                        <td>~50/day</td>
                        <td>0</td>
                        <td><span className="blog-metric-highlight">100% Stability</span></td>
                    </tr>
                    <tr>
                        <td><strong>Debug Time</strong></td>
                        <td>Hours searching logs</td>
                        <td>Minutes w/ ID search</td>
                        <td><span className="blog-metric-highlight">95% Faster</span></td>
                    </tr>
                    <tr>
                        <td><strong>Data Integrity</strong></td>
                        <td>Double-Bookings</td>
                        <td>Zero</td>
                        <td><span className="blog-metric-highlight">Transaction Safe</span></td>
                    </tr>
                </tbody>
            </table>

            <hr style={{ borderColor: '#334155', margin: '3rem 0' }} />

            <h2>🚀 Conclusion</h2>
            <p>
                You cannot fix what you cannot see. By moving from "logging text" to "logging events" and implementing safety nets
                like Global Filters and Optimistic Locking, I replaced superstition with engineering.
            </p>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>👉 Ready to Debug?</h3>
                <p>Jump into the simulator and fix these production bugs yourself.</p>
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

export default ProductionDebuggingBlog;
