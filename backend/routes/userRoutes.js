import { getTodaysEarnings } from '../controllers/userController.js';

router.get('/earnings/today/:userId', getTodaysEarnings);
