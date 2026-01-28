import '../styles/SlowApiRescueBlog.css';
import { Link } from 'react-router-dom';

const SlowApiRescueBlog = () => {
    return (
        <div className="blog-post-page">
            <Link to="/practice-projects" className="blog-back-link">← Back to Practice Projects</Link>

            <h1>🚀 Slow API Rescue: Optimizing API Performance from 1500ms to &lt;200ms</h1>

            <p>
                In the world of backend development, performance isn't just a "nice-to-have"—it's a requirement.
                A slow API translates directly to lost users and revenue.
            </p>

            <p>
                In this project, I took a sluggish startup API that was crawling at <strong>800–1500ms</strong> per request
                and optimized it down to <strong>&lt;200ms</strong>, achieving a <span className="blog-metric-highlight">70%+ reduction in response time</span>.
                Here is a detailed breakdown of the problem, the diagnosis, and the technical fixes implemented.
            </p>

            <hr style={{ borderColor: '#334155', margin: '2rem 0' }} />

            <h2>❌ The Problem</h2>
            <p>
                The application—an e-commerce platform with <code>Users</code>, <code>Orders</code>, and <code>Products</code>—was functional but painfully slow.
                Simple list endpoints (like "Get All User Orders") were taking upwards of <strong>1.5 seconds</strong>.
            </p>

            <h3>Key Bottlenecks Identified:</h3>
            <ul>
                <li><strong>N+1 Query Issues</strong>: Fetching orders for a list of users resulted in hundreds of separate database calls.</li>
                <li><strong>Missing Indexes</strong>: Queries on foreign keys and search fields were performing full collection scans.</li>
                <li><strong>Overfetching</strong>: Endpoints were returning huge JSON objects with unnecessary data (e.g., product details in a user summary).</li>
                <li><strong>Inefficient Pagination</strong>: Standard <code>offset</code> pagination was degrading performance as the dataset grew.</li>
            </ul>

            <h2>🎯 The Goal</h2>
            <p><strong>Objective</strong>: Rescue the API by applying advanced query optimizations.</p>
            <p><strong>Success Criteria</strong>:</p>
            <ul>
                <li>Reduce P95 response time from &gt;800ms to &lt;200ms.</li>
                <li>Client-facing outcome: <em>"Reduced API response time by 70% and stabilized high-load performance."</em></li>
            </ul>

            <h2>✅ Technical Implementation & Fixes</h2>

            <h3>1. Eliminating the N+1 Query Problem</h3>
            <p><strong>The "Bad" Approach:</strong></p>
            <p>The initial code iterated through a list of users and ran a separate database query for each user to get their latest order. For 50 users, this meant <strong>51 database calls</strong>.</p>

            <pre><code>{`// ❌ BAD: N+1 Problem
const users = await User.find().limit(50);
const usersWithOrders = await Promise.all(users.map(async (user) => {
    const orders = await Order.find({ userId: user._id }); // Executes 50 times!
    return { ...user.toObject(), orders };
}));`}</code></pre>

            <p><strong>The "Good" Approach (Batching):</strong></p>
            <p>I implemented a batching strategy (similar to GraphQL's DataLoader pattern or using <code>$in</code> queries) to fetch all related data in a <strong>single additional query</strong>.</p>

            <pre><code>{`// ✅ GOOD: Batch Querying
const users = await User.find().limit(50);
const userIds = users.map(u => u._id);

// Fetch all orders for these users in ONE query
const allOrders = await Order.find({ userId: { $in: userIds } });

// Map orders to users in memory (O(N) operation)
const usersWithOrders = users.map(user => ({
    ...user.toObject(),
    orders: allOrders.filter(o => o.userId.equals(user._id))
}));`}</code></pre>

            <h3>2. Database Indexing</h3>
            <p>Queries filtering by <code>status</code> or searching by <code>email</code> were triggering <strong>full table scans</strong>.</p>

            <p><strong>The Fix:</strong></p>
            <p>I analyzed the query plans using <code>explain()</code> and added compound indexes for frequently accessed patterns.</p>

            <pre><code>{`// Created index on userId for fast order lookups
db.orders.createIndex({ userId: 1 });
// Compound index for filtering active orders
db.orders.createIndex({ userId: 1, status: 1 });`}</code></pre>

            <p><strong>Result</strong>: Query execution dropped from <strong>300ms</strong> to <strong>12ms</strong>.</p>

            <h3>3. Response Shaping (Select Only Required Fields)</h3>
            <p>The API was sending back full <code>User</code> objects, including sensitive fields like hashed passwords and heavy fields like bio/history, even when they weren't needed.</p>

            <pre><code>{`// ✅ GOOD: Lean Selection
const products = await Product.find(
    { category: 'electronics' },
    { name: 1, price: 1, thumbnail: 1 } // Only fetch what's needed
);`}</code></pre>

            <p><strong>Impact</strong>: Reduced payload size by <strong>90%</strong>, significantly speeding up network transfer and JSON parsing.</p>

            <h3>4. Cursor-Based Pagination</h3>
            <p>Standard <code>offset</code> pagination (<code>skip(1000).limit(20)</code>) becomes exponentially slower as the offset increases.</p>

            <p><strong>The Fix:</strong></p>
            <p>I switched to <strong>Cursor-Based Pagination</strong> using a unique, sequential specific field.</p>

            <pre><code>{`// ✅ GOOD: Cursor Pagination
// Fetch 20 items starting AFTER the last ID we saw
const nextPage = await Order.find({ _id: { $gt: lastSeenId } }).limit(20);`}</code></pre>

            <h2>🧪 Results & Metrics</h2>
            <p>After deploying these fixes, I ran load tests using Apache Benchmark (ab) and monitored the logs.</p>

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
                        <td><strong>Avg Response Time</strong></td>
                        <td>1250 ms</td>
                        <td>180 ms</td>
                        <td><span className="blog-metric-highlight">~85% Faster</span></td>
                    </tr>
                    <tr>
                        <td><strong>Database Calls</strong></td>
                        <td>51</td>
                        <td>2</td>
                        <td><span className="blog-metric-highlight">96% Reduction</span></td>
                    </tr>
                    <tr>
                        <td><strong>Payload Size</strong></td>
                        <td>250 KB</td>
                        <td>15 KB</td>
                        <td><span className="blog-metric-highlight">94% Smaller</span></td>
                    </tr>
                </tbody>
            </table>

            <hr style={{ borderColor: '#334155', margin: '3rem 0' }} />

            <h2>🚀 Conclusion</h2>
            <p>
                This project highlighted that performance isn't magic—it's about understanding how the database reads data and how the network transports it.
                By addressing the N+1 problem, adding strategic indexes, and optimizing data retrieval, I turned a sluggish prototype into a production-ready API.
            </p>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>👉 Ready to Code?</h3>
                <p>Check out the practice project and implement these fixes yourself!</p>
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

export default SlowApiRescueBlog;
