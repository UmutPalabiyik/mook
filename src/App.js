import './App.scss';
import { useState } from 'react';

import { codBg, thorBg, starwarsBg, kratosBg } from './Utils/Helpers/Backgrounds.helpers';
import Header from './Components/Header';



const App = () => {

  const [heroBackground, setHeroBackground] = useState(true);

  return(
      <div className="app" style={{backgroundImage: `url(${heroBackground ?  codBg : starwarsBg})`}}>
        <Header />

      </div>
  )
}

export default App;