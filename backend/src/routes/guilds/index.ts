import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares';
import { getGuildPermissionsController, getGuildsController } from "../../controllers/guilds";
const router = Router();

router.get('/', isAuthenticated, getGuildsController);
router.get('/:id/permissions', isAuthenticated, getGuildPermissionsController);

export default router;