import '../styles/SlowApiRescueBlog.css'; // Reusing the blog styles
import { Link } from 'react-router-dom';

const GraphqlPerformanceBlog = () => {
    return (
        <div className="blog-post-page">
            <Link to="/practice-projects" className="blog-back-link">← Back to Practice Projects</Link>

            <h1>⚡ GraphQL Performance: Killing the N+1 Monster</h1>

            <p>
                GraphQL is amazing for frontend developers ("Fetch exactly what you need!"), but it can be a nightmare for backend performance.
                A single innocent-looking query can trigger <strong>thousands</strong> of database calls.
            </p>

            <p>
                In this project, I took a GraphQL API that was choking on nested queries and optimized it to serve complex data trees
                with <strong>O(1)</strong> database efficiency.
            </p>

            <hr style={{ borderColor: '#334155', margin: '2rem 0' }} />

            <h2>❌ The Problem</h2>
            <p>The API allowed users to fetch their <code>Orders</code>, and for each order, fetch <code>Products</code>.</p>

            <h3>The Deadly Query:</h3>
            <pre><code>{`query {
  users {
    name
    orders {
      total
      products {
        name
        price
      }
    }
  }
}`}</code></pre>

            <p><strong>What happened on the server:</strong></p>
            <ol>
                <li>Fetch 50 Users (1 Query)</li>
                <li>Fetch Orders for <em>each</em> User (50 Queries)</li>
                <li>Fetch Products for <em>each</em> Order (500 Queries)</li>
            </ol>
            <p><strong>Total: 551 Database Calls for one request.</strong> 😱</p>

            <h2>🎯 The Goal</h2>
            <p><strong>Objective</strong>: Eliminate the N+1 problem and protect the server from malicious queries.</p>
            <p><strong>Success Criteria</strong>:</p>
            <ul>
                <li>Serve the above query in <strong>3 Database Calls</strong> (Users, Orders, Products).</li>
                <li>Reject query depths &gt; 5.</li>
                <li>Client-facing outcome: <em>"Optimized GraphQL API and eliminated N+1 queries, reducing load by 99%."</em></li>
            </ul>

            <h2>✅ Technical Implementation & Fixes</h2>

            <h3>1. DataLoader (The Magic Batched)</h3>
            <p><strong>The "Bad" Approach (Naive Resolvers):</strong></p>
            <pre><code>{`// ❌ BAD: Runs for EVERY order
resolve(parent, args) {
  return db.products.find({ orderId: parent.id });
}`}</code></pre>

            <p><strong>The "Good" Approach (DataLoader):</strong></p>
            <p>I implemented Facebook's <strong>DataLoader</strong> pattern, which waits for the event loop to finish, collects all IDs, and serves them in <strong>one batch</strong>.</p>

            <pre><code>{`// ✅ GOOD: Batching
const productLoader = new DataLoader(async (orderIds) => {
  // 1. Fetch ALL products for these 50 orders in ONE query
  const products = await db.products.find({ orderId: { $in: orderIds } });
  
  // 2. Map them back to the original orderIds
  return orderIds.map(id => products.filter(p => p.orderId === id));
});

// Resolver
resolve(parent, args) {
  return productLoader.load(parent.id);
}`}</code></pre>
            <p><strong>Result</strong>: 551 Queries → 3 Queries.</p>

            <h3>2. Query Complexity Analysis</h3>
            <p>Malicious users could send circular queries (<code>user -&gt; posts -&gt; author -&gt; posts...</code>) to crash the server.</p>

            <p><strong>The Fix:</strong></p>
            <p>I implemented <strong>Query Complexity Limits</strong> using <code>graphql-query-complexity</code>.</p>

            <pre><code>{`// ✅ GOOD: Protection
const rule = queryComplexity({
  maximumComplexity: 1000,
  variables: {},
  onComplete: (complexity) => {
    console.log('Query Complexity:', complexity);
  },
  estimators: [
    // Give field 'products' a weight of 10
    fieldExtensionsEstimator(),
    simpleEstimator({ defaultComplexity: 1 }),
  ],
});`}</code></pre>
            <p>Any query exceeding the cost budget is rejected instantly.</p>

            <h3>3. Persisted Queries</h3>
            <p>Parsing huge GraphQL strings is expensive for the CPU.</p>

            <p><strong>The Fix:</strong></p>
            <p>Client sends a <strong>Hash</strong> (SHA-256) instead of the full query string. The server looks up the query in Redis. This reduces network traversal and enhances security by ensuring only whitelisted queries can run.</p>

            <h3>4. Field-Level Caching</h3>
            <p>I added <code>@cacheControl</code> directives for fields that are expensive to calculate but change rarely.</p>
            <pre><code>{`type Product {
  name: String
  rating: Float @cacheControl(maxAge: 3600) # Cache for 1 hour
}`}</code></pre>

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
                        <td><strong>DB Calls (Complex Query)</strong></td>
                        <td>551</td>
                        <td>3</td>
                        <td><span className="blog-metric-highlight">99.5% Reduction</span></td>
                    </tr>
                    <tr>
                        <td><strong>Response Time</strong></td>
                        <td>3200 ms</td>
                        <td>85 ms</td>
                        <td><span className="blog-metric-highlight">37x Faster</span></td>
                    </tr>
                    <tr>
                        <td><strong>Max Depth</strong></td>
                        <td>Unlimited</td>
                        <td>Strict Limit (5)</td>
                        <td><span className="blog-metric-highlight">Secure</span></td>
                    </tr>
                </tbody>
            </table>

            <hr style={{ borderColor: '#334155', margin: '3rem 0' }} />

            <h2>🚀 Conclusion</h2>
            <p>
                GraphQL gives power to the client, but it requires responsibility on the server. By implementing <strong>DataLoaders</strong>
                which solve the graph traversal problem, and adding <strong>Complexity Guards</strong>, I turned a fragile API into a high-performance data graph.
            </p>

            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#1e293b', borderRadius: '8px' }}>
                <h3 style={{ marginTop: 0 }}>👉 Ready to Optimize?</h3>
                <p>Implement DataLoader and kill the N+1 monster in the practice project.</p>
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

export default GraphqlPerformanceBlog;
