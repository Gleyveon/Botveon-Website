import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares';
import { getGuildController, getGuildPermissionsController, getGuildsController } from "../../controllers/guilds";
const router = Router();

router.get('/', isAuthenticated, getGuildsController);
router.get('/:id/permissions', isAuthenticated, getGuildPermissionsController);
router.get('/:id', isAuthenticated, getGuildController);

export default router;