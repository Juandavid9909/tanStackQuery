import { useQuery } from '@tanstack/react-query';

import './App.css';

const getCryptoNumber = async (): Promise<number> => {
  const resp = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
    .then((resp) => resp.json());

  return Number(resp);
};

function App() {
  const { data: number, error, isFetching, refetch } = useQuery({
    queryKey: ['randomNumber'], // Identificador de nuestra consulta
    queryFn: getCryptoNumber, // Función que se ejecutará tan pronto el useQuery se ejecute
    staleTime: 1000 * 5, // Tiempo en el que los datos se consideran frescos, pasado el tiempo se volverán a consultar
    refetchOnWindowFocus: false, // Si es true, se hace refetch al volver a la pestaña
    retry: 2, // Número de reintentos en caso de error, false si no queremos que se reintente
    retryDelay: 1000, // Tiempo en milisegundos entre reintentos
  });

  return (
    <>
      {
        isFetching
          ? <h1>Cargando...</h1>
          : <h1>Número: { number }</h1>
      }

      {/* <RandomNumber /> */}

      <div>{ JSON.stringify(error) }</div>

      <button
        disabled={ isFetching }
        onClick={ () => refetch() }
      >Nuevo número</button>
    </>
  );
}

export default App;
