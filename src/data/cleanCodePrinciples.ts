export interface Principle {
    id: number;
    title: string;
    desc: string;
    bad: string;
    good: string;
}

export const PRINCIPLES: Principle[] = [
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
