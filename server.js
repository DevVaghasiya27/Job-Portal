// API documentation
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'

// packages imports
// const express = require('express');
import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';

// security package
import helmet from 'helmet'
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'
// file imports
import connectDB from './config/db.js';
// routes imports
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobsRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js';

// Dot ENV configuration
dotenv.config()

// mongodb connection
connectDB();

// swagger Api configuration
// swagger Api Options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Portal Application Api Documentation",
            description: "Node ExpressJs Job Application",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
    },
    apis: ["./routes/*.js"],
}

const spec = swaggerJSDoc(options)

// rest object
const app = express();

// middleware
app.use(
    helmet({
        // Remove one of these two options
        strictTransportSecurity: {
            maxAge: 15552000, // Example value
            includeSubDomains: true,
            preload: true,
        },
        // hsts: { maxAge: 15552000, includeSubDomains: true, preload: true } // REMOVE THIS
    })
);
app.use(xss())
app.use(mongoSanitize())
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// routes
app.use("/api/v1/test", testRoutes)
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/job", jobsRoutes)

// homeRoute root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec))

// validation middlewares
app.use(errorMiddleware)

// PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
    console.log(`node Server Running in ${process.env.DEV_MODE} Mode at http://localhost:${PORT}`.bgWhite.green);
})