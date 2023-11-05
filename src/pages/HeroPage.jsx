import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import profesor from '../assets/img/Profesor_Oak_LGPE.png';
import sound from '../assets/sounds/sonidito.mp3';
import sound2 from '../assets/sounds/cancionOak.mp3';
import silly from '../assets/img/silly.png';

const Heropage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const textos = [
    'Hola, ¡bienvenido al mundo Pokémon!.',
    'Mi nombre es Oak, pero la gente me llama profesor Pokémon.',
    'Este mundo está habitado por criaturas llamadas Pokémon.',
    'Algunos los usan de mascota, otros los usan para luchar,',
    'mientras que yo los estudio como profesión.',
    'Esto que te entregaré se llama Pokédex.',
    'La cual es una base de datos de todos los pokemones del mundo',
    '¡Échale un vistazo!'
  ];
  const [indiceTexto, setIndiceTexto] = useState(0);
  const [textoMostrado, setTextoMostrado] = useState('');
  const [caracterActual, setCaracterActual] = useState(0);
  const [redirectToHomePage, setRedirectToHomePage] = useState(false);

  useEffect(() => {
    if (indiceTexto < textos.length) {
      if (caracterActual < textos[indiceTexto].length) {
        const timer = setTimeout(() => {
          setCaracterActual(caracterActual + 1);
          setTextoMostrado(textos[indiceTexto].substring(0, caracterActual + 1));
        }, 70);
        return () => clearTimeout(timer);
      }
    }
  }, [caracterActual, indiceTexto, textos]);

  const handleClick = () => {
    if (indiceTexto < textos.length - 1) {
      setIndiceTexto(indiceTexto + 1);
      setCaracterActual(0);
      setTextoMostrado('');
      audioRef.current.play();
    } else {
      setRedirectToHomePage(true);
    }
  };

  if (redirectToHomePage) {
    navigate('/HomePage');
  }

  return (
    <div className='paginaoak'>
      <audio src={sound2} controls loop autoPlay style={{ display: 'none' }} />
      <div className="profesor">
        <img src={profesor} alt="" />
      </div>
      <div className="cuadro-texto">
        {textoMostrado}
        <button className='botonoak' onClick={handleClick}>
          <img src={silly} alt="" />
        </button>
      </div>
      <audio ref={audioRef} src={sound} />
    </div>
  );
};

export default Heropage;