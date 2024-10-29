const express = require('express');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger.json");
const app = express();

const bookRoutes = require('./routes/book.routes');
const userRoutes = require('./routes/user.routes');
const path = require('path');

//----------------------------------------------------------------------------------------------------------------------------------------------------------

//Enable access to (req.body) prop
app.use(express.json());

// Connect to MongoDB Database 
mongoose.connect('mongodb+srv://thomaspineau93:crRdZJYsKjiQ4B62@cluster0.5n0xo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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