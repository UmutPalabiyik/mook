import './App.scss';
import { useState } from 'react';

import { codBg, thorBg } from './Utils/Constants/Backgrounds.constants';



const App = () => {

  const [heroBackground, setHeroBackground] = useState(codBg);

  return(
      <div className="app" style={{backgroundImage: `url(${codBg})`}}>

      </div>
  )
}

export default App;