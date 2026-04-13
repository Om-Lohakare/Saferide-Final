import { Router } from 'express';
import { 
  getCurrentRoute, 
  getStudentsList, 
  startRoute, 
  endRoute, 
  updateLocation 
} from '../controllers/driver.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// Only drivers can access these endpoints
router.use(authenticate, authorize('driver'));

router.get('/route', getCurrentRoute);
router.get('/students', getStudentsList);
router.post('/route/start', startRoute);
router.post('/route/end', endRoute);
router.post('/location', updateLocation);

export default router;
