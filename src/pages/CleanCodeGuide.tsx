import { Link } from 'react-router-dom';

const PRINCIPLES = [
    {
        id: 1,
        title: "Meaningful Names",
        desc: "Variables should verify their existence. If you need a comment to explain a variable name, rename it.",
        bad: "const d = 10; // days",
        good: "const daysSinceModification = 10;"
    },
    {
        id: 2,
        title: "Functions Do One Thing",
        desc: "A function should technically be able to be described without using the word 'and'.",
        bad: "function createUserAndEmail() { ... }",
        good: "function createUser() { ... } \nfunction sendWelcomeEmail() { ... }"
    },
    {
        id: 3,
        title: "The Boy Scout Rule",
        desc: "Leave the campground cleaner than you found it. Fix one small thing every time you touch a file.",
        bad: "Ignoring the messy legacy code nearby.",
        good: "Renaming that one unclear variable while fixing a bug."
    },
    {
        id: 4,
        title: "DRY (Don't Repeat Yourself)",
        desc: "Every piece of knowledge should have a single, unambiguous representation in the system.",
        bad: "Duplicate logic in two components.",
        good: "Extract logic to a custom hook or utility."
    },
    {
        id: 5,
        title: "Comments Are Failures",
        desc: "A comment is usually an apology for unclear code. precise code > verbose comments.",
        bad: "// Check if user is active \nif (u.s === 1)",
        good: "if (user.isActive)"
    },
    {
        id: 6,
        title: "Avoid Side Effects",
        desc: "Your function promises to do one thing but also unknowingly initializes a database connection? That's a lie.",
        bad: "getUsers() { db.connect(); ... }",
        good: "Explicitly separate initialization and query logic."
    },
    {
        id: 7,
        title: "Command Query Separation",
        desc: "Functions should either do something (Command) or answer something (Query), but not both.",
        bad: "if (setAttribute('username', 'joe')) ...",
        good: "if (attributeExists('username')) setAttribute..."
    },
    {
        id: 8,
        title: "Use Exceptions, Not Return Codes",
        desc: "Returning error codes clutters the caller. Exceptions allow error handling to be separated from business logic.",
        bad: "if (deletePage() === E_OK) ...",
        good: "try { deletePage() } catch (e) ..."
    },
    {
        id: 9,
        title: "Encapsulate Conditionals",
        desc: "Complex boolean logic is hard to read in-line. Extract it to a variable or function.",
        bad: "if (timer.hasExpired() && !timer.isRecurrent())",
        good: "if (shouldDeleteTimer(timer))"
    },
    {
        id: 10,
        title: "Classes Should Be Small",
        desc: "The First Rule of Classes is that they should be small. The Second Rule is that they should be smaller.",
        bad: "DashboardController (5000 lines)",
        good: "UserStatsController, UserSettingsController"
    },
    {
        id: 11,
        title: "Single Responsibility (SRP)",
        desc: "A class or module should have one, and only one, reason to change.",
        bad: "AuthService dealing with Email Formatting.",
        good: "AuthService delegates to EmailFormatter."
    },
    {
        id: 12,
        title: "Dependency Injection",
        desc: "High-level modules should not depend on low-level modules. Both should depend on abstractions.",
        bad: "const db = new PostgresDatabase();",
        good: "constructor(private db: DatabaseInterface) {}"
    },
    {
        id: 13,
        title: "Law of Demeter",
        desc: "Don't talk to strangers. A module should not know about the innards of the objects it manipulates.",
        bad: "ctxt.getOptions().getScratchDir().getAbsolutePath()",
        good: "ctxt.getScratchDirPath()"
    },
    {
        id: 14,
        title: "Keep It Simple (KISS)",
        desc: "Complexity is cost. Avoid clever one-liners that take 5 minutes to decipher.",
        bad: "arr.reduce((a,b)=>a.concat(b),[]) ...",
        good: "arr.flat()"
    },
    {
        id: 15,
        title: "YAGNI",
        desc: "You Ain't Gonna Need It. Don't add functionality until it is necessary.",
        bad: "Creating a plugin system for a simple MVP homepage.",
        good: "Hardcoding the two features you actually need."
    },
    {
        id: 16,
        title: "F.I.R.S.T Tests",
        desc: "Fast, Independent, Repeatable, Self-Validating, Timely.",
        bad: "Tests that touch the live database.",
        good: "Tests using mocked repositories."
    },
    {
        id: 17,
        title: "Vertical Formatting",
        desc: "Related concepts should be vertically close to each other. The file is a newspaper article.",
        bad: "Defining a helper function at the bottom when it's used at the top.",
        good: "Helper functions appear directly below their usage."
    },
    {
        id: 18,
        title: "Prefer Polymorphism to Switch",
        desc: "Switch statements are dependency magnets. Use polymorphism (Classes/Interfaces) where possible.",
        bad: "switch (type) { case 'PDF': ... case 'HTML': ... }",
        good: "document.print()"
    },
    {
        id: 19,
        title: "Use Standard Headers",
        desc: "Don't reinvent the wheel. Follow standard conventions for your framework (NestJS/React).",
        bad: "Custom folder structure 'MyCoolComponents'",
        good: "Standard 'src/components', 'src/pages'"
    },
    {
        id: 20,
        title: "Practise Consistency",
        desc: "If you do something a certain way, do it that way all the time.",
        bad: "fetchUser, getAccount, retrieveProfile (mixed verbs)",
        good: "getUser, getAccount, getProfile"
    }
];

const CleanCodeGuide = () => {
    return (
        <div className="clean-code-page">
            <div className="bg-gradient"></div>

            <div className="content-container">
                <header className="page-header">
                    <Link to="/next-path" className="back-link">← RETURN TO PATH</Link>
                    <div className="header-content">
                        <span className="premium-badge">ENGINEERING STANDARD</span>
                        <h1>THE 20 LAWS OF<br />CLEAN CODE</h1>
                        <p>Writing code for machines is easy. Writing code for humans is engineering.</p>
                    </div>
                </header>

                <div className="principles-grid">
                    {PRINCIPLES.map((p, index) => (
                        <div key={p.id} className="principle-card" style={{ animationDelay: `${index * 0.05}s` }}>
                            <div className="card-idx">{p.id < 10 ? `0${p.id}` : p.id}</div>
                            <h3>{p.title}</h3>
                            <p className="desc">{p.desc}</p>

                            <div className="code-comparison">
                                <div className="bad-code">
                                    <span className="indicator">❌ BAD</span>
                                    <code>{p.bad}</code>
                                </div>
                                <div className="good-code">
                                    <span className="indicator">✅ GOOD</span>
                                    <code>{p.good}</code>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="page-footer">
                    <p>Internalize these. Make them muscle memory.</p>
                </footer>
            </div>

            <style>{`
                .clean-code-page {
                    min-height: 100vh;
                    background: #050505;
                    color: #fff;
                    font-family: 'Inter', sans-serif;
                    padding: 4rem 2rem;
                    position: relative;
                }
                
                .bg-gradient {
                    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: radial-gradient(circle at 10% 10%, rgba(34, 197, 94, 0.05) 0%, transparent 40%),
                                radial-gradient(circle at 90% 90%, rgba(34, 197, 94, 0.05) 0%, transparent 40%);
                    pointer-events: none; z-index: 0;
                }

                .content-container {
                    max-width: 1400px;
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 6rem;
                }

                .back-link {
                    display: inline-block; margin-bottom: 2rem;
                    color: #4ade80; font-weight: 600; font-size: 0.8rem; letter-spacing: 0.1em;
                    text-decoration: none; opacity: 0.7; transition: 0.3s;
                }
                .back-link:hover { opacity: 1; transform: translateX(-5px); }

                .premium-badge {
                    display: inline-block; padding: 0.5rem 1rem;
                    background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2);
                    border-radius: 50px; color: #4ade80; font-weight: 800; font-size: 0.7rem;
                    letter-spacing: 0.25em; margin-bottom: 1.5rem;
                    font-family: 'Outfit', sans-serif;
                }

                h1 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 4rem; font-weight: 800; letter-spacing: -0.04em;
                    margin-bottom: 1.5rem; line-height: 1;
                    background: linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.5) 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                }

                .header-content p {
                    font-size: 1.2rem; color: #94a3b8; max-width: 600px; margin: 0 auto;
                }

                .principles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
                    gap: 2rem;
                }

                .principle-card {
                    background: #0f0f11;
                    border: 1px solid #1f1f23;
                    border-radius: 24px;
                    padding: 2.5rem;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
                }

                .principle-card:hover {
                    border-color: #22c55e;
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px -10px rgba(34, 197, 94, 0.1);
                }

                .card-idx {
                    font-family: 'Outfit', sans-serif;
                    font-size: 3rem; font-weight: 900; color: #1a1a1c;
                    position: absolute; top: 1rem; right: 1.5rem;
                    user-select: none;
                }

                .principle-card h3 {
                    font-family: 'Outfit', sans-serif;
                    font-size: 1.5rem; font-weight: 700; color: #fff; margin-bottom: 1rem;
                    position: relative;
                }

                .desc {
                    color: #a1a1aa; line-height: 1.6; margin-bottom: 2rem; font-size: 0.95rem;
                    min-height: 3rem;
                }

                .code-comparison {
                    background: #000;
                    border-radius: 12px;
                    padding: 1rem;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.8rem;
                    display: flex; flex-direction: column; gap: 0.8rem;
                }
                
                .bad-code, .good-code {
                    display: flex; flex-direction: column; gap: 0.3rem;
                }

                .indicator {
                    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em;
                }
                .bad-code .indicator { color: #ef4444; }
                .good-code .indicator { color: #22c55e; }
                
                code {
                    color: #e4e4e7;
                    white-space: pre-wrap;
                }

                .page-footer {
                    text-align: center; margin-top: 6rem;
                    color: #52525b; font-weight: 600; font-family: 'Outfit', sans-serif; letter-spacing: 0.2em;
                    text-transform: uppercase; font-size: 0.8rem;
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @media (max-width: 768px) {
                    h1 { font-size: 2.5rem; }
                    .principles-grid { grid-template-columns: 1fr; }
                    .clean-code-page { padding: 3rem 1.5rem; }
                }
            `}</style>
        </div>
    );
};

export default CleanCodeGuide;
