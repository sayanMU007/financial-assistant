// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser'); // For parsing JSON request bodies
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

// Initialize the Express application
const app = express();
const port = 5000; // Define the port for the server

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// --- In-memory "Database" (for demonstration purposes only) ---
// In a real application, you would use a database like MongoDB, PostgreSQL, SQLite, etc.

// Users storage: { "username": { id: "uuid", password: "plain_password", username: "username" } }
const users = {};

// Transactions storage: { "user_id": [{ id: "uuid", type: "income/expense", amount: 100, description: "...", date: "..." }] }
const transactionsDb = {};

// --- Helper Functions (these would interact with a real database) ---

/**
 * Retrieves a user by their username.
 * @param {string} username - The username to find.
 * @returns {object|undefined} The user object if found, otherwise undefined.
 */
function getUserByUsername(username) {
    return users[username];
}

/**
 * Retrieves a user by their ID.
 * @param {string} userId - The user ID to find.
 * @returns {object|undefined} The user object if found, otherwise undefined.
 */
function getUserById(userId) {
    for (const username in users) {
        if (users[username].id === userId) {
            return users[username];
        }
    }
    return undefined;
}

/**
 * Saves a new user to the in-memory database.
 * @param {string} username - The new user's username.
 * @param {string} password - The new user's password (unhashed for simplicity).
 * @returns {object} An object indicating success and the user data, or an error message.
 */
function saveUser(username, password) {
    if (users[username]) {
        return { success: false, message: "Username already exists" };
    }
    const userId = uuidv4();
    // In a real app, hash the password using bcrypt or similar!
    users[username] = { id: userId, password: password, username: username };
    transactionsDb[userId] = []; // Initialize empty transactions for the new user
    return { success: true, user: { userId: userId, username: username } };
}

/**
 * Retrieves all transactions for a given user.
 * @param {string} userId - The ID of the user.
 * @returns {Array} An array of transaction objects.
 */
function getUserTransactions(userId) {
    return transactionsDb[userId] || [];
}

/**
 * Adds a new transaction for a user.
 * @param {string} userId - The ID of the user.
 * @param {object} transactionData - The data for the new transaction.
 * @returns {object} An object containing the new transaction or an error message.
 */
function addUserTransaction(userId, transactionData) {
    const { type, amount, description, date } = transactionData;

    // Validate required fields
    if (!type || !amount || !description || !date) {
        return { transaction: null, error: "Missing required transaction fields (type, amount, description, date)." };
    }

    const transactionId = uuidv4();
    const newTransaction = {
        id: transactionId,
        user_id: userId,
        type: type, // 'income' or 'expense'
        amount: parseFloat(amount), // Ensure amount is a number
        description: description,
        date: date // Expected format:-MM-DD
    };

    transactionsDb[userId] = transactionsDb[userId] || [];
    transactionsDb[userId].push(newTransaction);
    return { transaction: newTransaction, error: null };
}

/**
 * Updates an existing transaction for a user.
 * @param {string} userId - The ID of the user.
 * @param {string} transactionId - The ID of the transaction to update.
 * @param {object} updatedData - The fields to update.
 * @returns {object} An object containing the updated transaction or an error message.
 */
function updateUserTransaction(userId, transactionId, updatedData) {
    const userTransactions = transactionsDb[userId];
    if (!userTransactions) {
        return { transaction: null, error: "No transactions found for this user." };
    }

    const transactionIndex = userTransactions.findIndex(t => t.id === transactionId);

    if (transactionIndex === -1) {
        return { transaction: null, error: "Transaction not found." };
    }

    const transactionToUpdate = userTransactions[transactionIndex];
    for (const key in updatedData) {
        if (['type', 'amount', 'description', 'date'].includes(key)) {
            if (key === 'amount') {
                transactionToUpdate[key] = parseFloat(updatedData[key]);
            } else {
                transactionToUpdate[key] = updatedData[key];
            }
        }
    }
    userTransactions[transactionIndex] = transactionToUpdate;
    return { transaction: transactionToUpdate, error: null };
}

/**
 * Deletes a transaction for a user.
 * @param {string} userId - The ID of the user.
 * @param {string} transactionId - The ID of the transaction to delete.
 * @returns {object} An object indicating success or an error message.
 */
function deleteUserTransaction(userId, transactionId) {
    let userTransactions = transactionsDb[userId];
    if (!userTransactions) {
        return { success: false, message: "No transactions found for this user." };
    }

    const initialLength = userTransactions.length;
    transactionsDb[userId] = userTransactions.filter(t => t.id !== transactionId);

    if (transactionsDb[userId].length < initialLength) {
        return { success: true, message: "Transaction deleted successfully." };
    }
    return { success: false, message: "Transaction not found." };
}

// --- Basic Authentication Middleware (Simplified and Corrected) ---
function authenticateUser(req, res, next) {
    let userId;

    // Prioritize query parameters for GET requests, then body for other methods
    // It's crucial to check if req.query or req.body exist before accessing their properties
    if (req.query && req.query.user_id) {
        userId = req.query.user_id;
    } else if (req.body && req.body.user_id) {
        userId = req.body.user_id;
    }

    if (!userId) {
        return res.status(401).json({ message: "Authentication required: user_id missing" });
    }

    const user = getUserById(userId);
    if (!user) {
        return res.status(401).json({ message: "Authentication failed: User not found" });
    }

    // Attach user information to the request for subsequent middleware/route handlers
    req.user = user;
    next(); // Proceed to the next middleware/route handler
}


// --- API Endpoints ---

// Root route
app.get('/', (req, res) => {
    res.send('Financial Assistant Backend (Node.js) is running!');
});

// User Registration
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const result = saveUser(username, password);
    if (result.success) {
        res.status(201).json({ message: "User registered successfully", user: result.user });
    } else {
        res.status(409).json({ message: result.message }); // Conflict if username exists
    }
});

// User Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = getUserByUsername(username);
    // In a real app, compare hashed password here (e.g., bcrypt.compare(password, user.password))
    if (user && user.password === password) {
        res.status(200).json({ message: "Login successful", user_id: user.id, username: user.username });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Get all transactions for a user or Add a new transaction
app.route('/api/transactions')
    .get(authenticateUser, (req, res) => {
        const userId = req.user.id;
        const userTransactions = getUserTransactions(userId);
        res.status(200).json(userTransactions);
    })
    .post(authenticateUser, (req, res) => {
        const userId = req.user.id;
        const { transaction, error } = addUserTransaction(userId, req.body);
        if (transaction) {
            res.status(201).json({ message: "Transaction added successfully", transaction: transaction });
        } else {
            res.status(400).json({ message: error });
        }
    });

// Get, Update, or Delete a specific transaction by ID
app.route('/api/transactions/:transaction_id')
    .get(authenticateUser, (req, res) => {
        const userId = req.user.id;
        const transactionId = req.params.transaction_id;
        const userTransactions = getUserTransactions(userId);
        const transaction = userTransactions.find(t => t.id === transactionId);

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json(transaction);
    })
    .put(authenticateUser, (req, res) => {
        const userId = req.user.id;
        const transactionId = req.params.transaction_id;
        const { transaction, error } = updateUserTransaction(userId, transactionId, req.body);
        if (transaction) {
            res.status(200).json({ message: "Transaction updated successfully", transaction: transaction });
        } else {
            res.status(400).json({ message: error });
        }
    })
    .delete(authenticateUser, (req, res) => {
        const userId = req.user.id;
        const transactionId = req.params.transaction_id;
        const { success, message } = deleteUserTransaction(userId, transactionId);
        if (success) {
            res.status(200).json({ message: message });
        } else {
            res.status(404).json({ message: message });
        }
    });

// Get Financial Summary
app.get('/api/summary', authenticateUser, (req, res) => {
    const userId = req.user.id;
    const userTransactions = getUserTransactions(userId);

    const totalIncome = userTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = userTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalIncome - totalExpenses;

    const summary = {
        total_income: totalIncome,
        total_expenses: totalExpenses,
        net_balance: net_balance,
        currency: "USD" // Can be made configurable
    };
    res.status(200).json(summary);
});

// Start the server
app.listen(port, () => {
    console.log(`Financial Assistant Backend (Node.js) listening at http://localhost:${port}`);
});
