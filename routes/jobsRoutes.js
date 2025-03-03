import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, updateJobController, jobStatsController } from '../controllers/jobController.js';

const router = express.Router();

// Routes

// Create Job Routes || POST
router.post('/create-job', userAuth, createJobController)

// Get Jobs Routes || GET
router.get('/get-jobs', userAuth, getAllJobsController)

// Update Job Routes || PUT || PATCH
router.patch('/update-job/:id', userAuth, updateJobController)

// Delete Job Routes || DELETE
router.delete('/delete-job/:id', userAuth, deleteJobController)

// Job Stats Filter || GET
router.get('/job-stats', userAuth, jobStatsController)

export default router;