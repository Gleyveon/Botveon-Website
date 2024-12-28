import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares/authenticationMiddleware';
import { validateData } from "../../utils/middlewares/validationMiddleware";
import { communitySettingsSchema  } from "../../database/validators"
import { getCommunitySettingsController, updateCommunitySettingsController, getGuildsController } from "../../controllers/guilds";
const router = Router();

router.get('/', isAuthenticated, getGuildsController);
router.get('/:id/community', isAuthenticated, getCommunitySettingsController);
router.post('/:id/community', isAuthenticated, validateData(communitySettingsSchema), updateCommunitySettingsController);

export default router;