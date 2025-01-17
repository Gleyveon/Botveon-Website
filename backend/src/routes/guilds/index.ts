import { Router } from "express";
import { isAuthenticated } from '../../utils/middlewares/authenticationMiddleware';
import { validateData } from "../../utils/middlewares/validationMiddleware";
import { communitySettingsSchema  } from "../../database/validators"
import { getGuildsController, getCommunitySettingsController, updateCommunitySettingsController, getJoinSettingsController, updateJoinSettingsController, getEconomySettingsController, updateEconomySettingsController, getLevelSettingsController, updateLevelSettingsController} from "../../controllers/guilds";
const router = Router();

router.get('/', isAuthenticated, getGuildsController);

router.get('/:id/community', isAuthenticated, getCommunitySettingsController);
router.post('/:id/community', isAuthenticated, validateData(communitySettingsSchema), updateCommunitySettingsController);

router.get('/:id/join', isAuthenticated, getJoinSettingsController);
router.post('/:id/join', isAuthenticated, updateJoinSettingsController);

router.get('/:id/economy', isAuthenticated, getEconomySettingsController);
router.post('/:id/economy', isAuthenticated, updateEconomySettingsController);

router.get('/:id/level', isAuthenticated, getLevelSettingsController);
router.post('/:id/level', isAuthenticated, updateLevelSettingsController);

export default router;