import React, {useState} from 'react';
import Header from './components/Header';
import styled from '@emotion/styled';/*Libreria para crear componentes css, se tiene que instalar usando el comando npm i @emotion/styled @emotion/core dentro de la carpeta del proyecto*/
import Formulario from './components/Formulario';
import Resumen from './components/Resumen';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

//Creamos nuestro componente css
//Para utilizar este componente css se reemplaza la etiqueta html que queremos que tenga estilo por el componente creado.
const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #ffffff;
  padding: 3rem;
`;

function App() {

  const [resumen,guardarResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: '',
      year: '',
      plan: ''
    }
  });

  const [ cargando, guardarCargando ] = useState(false);

  //Extraer datos
  const { cotizacion , datos } = resumen;

  return (
    <Contenedor>

      <Header
         titulo="Cotizador de Seguros"
      />

      <ContenedorFormulario>

          <Formulario 
            guardarResumen={guardarResumen}
            guardarCargando={guardarCargando}
          />

          {cargando? <Spinner />: null}

          <Resumen 
            datos={datos}
          />

          {!cargando
          
          ? <Resultado 
             cotizacion={cotizacion}
            />
           : null
          }

      </ContenedorFormulario>

    </Contenedor>
  );
}

export default App;
