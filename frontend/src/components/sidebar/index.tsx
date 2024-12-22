// src/components/sidebar
import { Link, useParams } from 'react-router-dom';
import './styles.scss';

// Images
import communityIcon from '../../assets/img/icons/community.png';
import welcomeIcon from '../../assets/img/icons/welcome.png';
import coinIcon from '../../assets/img/icons/coin.png';
import levelIcon from '../../assets/img/icons/level.png';

function Sidebar() {
    const { guildId } = useParams();

    return (
        <div className="component sidebar-component">
            <div className="menu">
                <Link to={`/guild/${guildId}/community`} className="menu-item">
                    <img src={communityIcon} alt="Community icon" className="icon" />
                    Community
                </Link>
                <Link to={`/guild/${guildId}/join`} className="menu-item">
                    <img src={welcomeIcon} alt="Joining/Leaving icon" className="icon" />
                    Joining/Leaving
                </Link>
                <Link to={`/guild/${guildId}/economy`} className="menu-item">
                    <img src={coinIcon} alt="Economy icon" className="icon" />
                    Economy
                </Link>
                <Link to={`/guild/${guildId}/level`} className="menu-item">
                    <img src={levelIcon} alt="Level/xp icon" className="icon" />
                    Level/xp
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;