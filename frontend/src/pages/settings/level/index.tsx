// src/pages/settings/level
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchEconomySettings, updateEconomySettings } from '../../../utils/api';
import './styles.scss';

// import components
import Settings from '../../../components/settings';
import Loading from '../../../components/shared/loading';

// import subcomponents
import Selector from '../../../components/settings/selector'

function Level() {
  const { guildId } = useParams();

  return (
    <div className="page page-level">
      
    </div>
  );
}

export default Level;