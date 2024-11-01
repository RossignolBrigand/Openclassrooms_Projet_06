const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
const env = require('dotenv').config();
const app = express();

const bookRoutes = require('./routes/book.routes');
const userRoutes = require('./routes/user.routes');
const path = require('path');

//----------------------------------------------------------------------------------------------------------------------------------------------------------

// Connect to MongoDB Database 
mongoose.connect(`mongodb+srv://${process.env.DB_SECRET}`)
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

// Lets us get requests which contain a json object and store them within a req.body param
app.use(express.json());

// Create a header for all requests and responses for our paths to help prevent CORS issues
app.use(cors);

// Images upload route
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads/images')));
// Book Routes
app.use('/api/books', bookRoutes);
// Auth Routes
app.use('/api/auth', userRoutes);

//Swagger Docs 
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = app;