import express from "express";
import { isAuthenticated } from '../../utils/middlewares/authenticationMiddleware';
import { validateData } from "../../utils/middlewares/validationMiddleware";
import { communitySettingsSchema, joinSettingsSchema, economySettingsSchema, levelSettingsSchema } from "../../database/validators"
import { getGuildsController, getCommunitySettingsController, updateCommunitySettingsController, getJoinSettingsController, updateJoinSettingsController, getEconomySettingsController, updateEconomySettingsController, getLevelSettingsController, updateLevelSettingsController} from "../../controllers/guilds";

const router = express.Router();

router.get('/', isAuthenticated, getGuildsController);

router.get('/:id/community', isAuthenticated, getCommunitySettingsController);
router.post('/:id/community', isAuthenticated, validateData(communitySettingsSchema), updateCommunitySettingsController);

router.get('/:id/join', isAuthenticated, getJoinSettingsController);
router.post('/:id/join', isAuthenticated, validateData(joinSettingsSchema), updateJoinSettingsController);

router.get('/:id/economy', isAuthenticated, getEconomySettingsController);
router.post('/:id/economy', isAuthenticated, validateData(economySettingsSchema), updateEconomySettingsController);

router.get('/:id/level', isAuthenticated, getLevelSettingsController);
router.post('/:id/level', isAuthenticated, validateData(levelSettingsSchema), updateLevelSettingsController);

export default router;