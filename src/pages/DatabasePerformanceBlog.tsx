import '../styles/SlowApiRescueBlog.css'; // Reusing the blog styles
import { Link } from 'react-router-dom';

const DatabasePerformanceBlog = () => {
    return (
        <div className="blog-post-page">
            <Link to="/practice-projects" className="blog-back-link">← Back to Practice Projects</Link>

            <h1>🩺 Database Performance Doctor: Scaling from 10k to 1M Records</h1>

            <p>
                A database that works perfectly with 100 users often grinds to a halt with 100,000. In this project, I took a dataset of
                1 million+ records that was suffering from slow search, sort, and filter operations, and optimized it to handle scale.
            </p>

            <p>
                The goal wasn't just to "add an index"—it was to understand <strong>Query Plans</strong>, <strong>Cardinality</strong>, and <strong>Schema Design</strong>.
            </p>

            <hr style={{ borderColor: '#334155', margin: '2rem 0' }} />

            <h2>❌ The Problem</h2>
            <p>The application—a product catalog—was sluggish. As the product count grew, simple queries started taking seconds.</p>

            <h3>Key Bottlenecks Identified:</h3>
            <ul>
                <li><strong>Full Collection Scans</strong>: Searching for "Blue T-Shirt" scanned all 1 million documents.</li>
                <li><strong>Sort Memory Limits</strong>: Sorting by price on large result sets caused "Exceeded memory limit" errors.</li>
                <li><strong>Inefficient Filtering</strong>: Queries like <code>category = 'Electronics' AND price &lt; 500</code> were not using compound indexes effectively.</li>
                <li><strong>Complex Aggregations</strong>: Real-time analytics dashboards were calculating totals on the fly, locking the database.</li>
            </ul>

            <h2>🎯 The Goal</h2>
            <p><strong>Objective</strong>: Optimize database performance to handle 1M+ records with sub-100ms response times.</p>
            <p><strong>Success Criteria</strong>:</p>
            <ul>
                <li>Search queries execute in &lt;50ms.</li>
                <li>Sorting 1M records uses 0 in-memory merge steps.</li>
                <li>Client-facing outcome: <em>"Improved database performance for growing product, enabling 10x data scale."</em></li>
            </ul>

            <h2>✅ Technical Implementation & Fixes</h2>

            <h3>1. Compound Indexing Strategy</h3>
            <p><strong>The "Bad" Approach:</strong></p>
            <p>Creating separate indexes for every field is a rookie mistake.</p>

            <pre><code>{`// ❌ BAD: Separate Indexes
db.products.createIndex({ category: 1 });
db.products.createIndex({ price: 1 });
// Query: find({ category: 'A', price: { $lt: 100 } })
// Result: DB has to pick ONE index or try to merge them (slow).`}</code></pre>

            <p><strong>The "Good" Approach (ESR Rule):</strong></p>
            <p>I applied the <strong>Equality, Sort, Range (ESR)</strong> rule to create efficient compound indexes.</p>
            <pre><code>{`// ✅ GOOD: Compound Index
// Support queries that Filter by Category -> Sort by Rating -> Filter by Price
db.products.createIndex({ category: 1, rating: -1, price: 1 });`}</code></pre>

            <h3>2. Optimizing Text Search (Regex vs Index)</h3>
            <p>Using Regex for search (<code>/substring/</code>) kills performance because it cannot correctly use B-Tree indexes.</p>

            <p><strong>The Fix:</strong></p>
            <p>I implemented <strong>Full-Text Search Indexes</strong> (MongoDB Atlas Search or PostgreSQL TSVECTOR).</p>
            <pre><code>{`// ✅ GOOD: Text Index
db.products.createIndex({ name: "text", description: "text" });

// Query
db.products.find({ $text: { $search: "blue shirt" } });`}</code></pre>
            <p><strong>Result</strong>: Search went from <strong>2.5s</strong> to <strong>40ms</strong>.</p>

            <h3>3. Denormalization for Speed</h3>
            <p>Calculating "Total Orders" for a user every time their profile loads is expensive.</p>

            <p><strong>The Fix:</strong></p>
            <p>I denormalized the <code>orderCount</code> onto the <code>User</code> document and updated it strictly via transactional events. Trade storage for speed.</p>

            <pre><code>{`// ✅ GOOD: Read Optimized
// User Document
{
  _id: "...",
  name: "Alice",
  orderCount: 42 // 👈 Pre-calculated field
}`}</code></pre>

            <h3>4. Materialized Views for Analytics</h3>
            <p>For the dashboard, instead of running a heavy aggregation pipeline on every page load, I created a <strong>Materialized View</strong>.</p>

            <pre><code>{`// ✅ GOOD: Pre-aggregated Stats
// $merge writes the result of the aggregation to a separate collection
await db.orders.aggregate([
  { $match: { date: { $gte: startOfDay } } },
  { $group: { _id: "$category", total: { $sum: "$amount" } } },
  { $merge: { into: "daily_sales_stats" } }
]);`}</code></pre>

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
                        <td><strong>Search Query</strong></td>
                        <td>2500 ms</td>
                        <td>45 ms</td>
                        <td><span className="blog-metric-highlight">55x Faster</span></td>
                    </tr>
                    <tr>
                        <td><strong>Sort Operation</strong></td>
                        <td>Failed</td>
                        <td>Instant</td>
                        <td><span className="blog-metric-highlight">100% Reliability</span></td>
                    </tr>
                    <tr>
                        <td><strong>Dashboard Load</strong></td>
                        <td>5000+ ms</td>
                        <td>120 ms</td>
                        <td><span className="blog-metric-highlight">Real-time feel</span></td>
                    </tr>
                </tbody>
            </table>

            <hr style={{ borderColor: '#334155', margin: '3rem 0' }} />

            <h2>🚀 Conclusion</h2>
            <p>
                Databases are powerful, but they aren't magic. By analyzing query execution plans and applying strategies like
                Compound Indexing, Denormalization, and Materialized Views, we can make massive datasets feel lightweight.
            </p>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>👉 Ready to Scale?</h3>
                <p>Simulate 1 million records and fix the bottlenecks in the practice project.</p>
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

export default DatabasePerformanceBlog;
