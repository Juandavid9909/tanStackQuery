# ¿Para qué sirve?

Nos ayuda a optimizar las peticiones HTTP en nuestras aplicaciones, y funcionan en conjunto con `fetch` o `axios`.

Para instalar TanStack Query en nuestro proyecto podemos ejecutar el siguiente comando:

```bash
npm i @tanstack/react-query @tanstack/react-query-devtools

npm i -D @tanstack/eslint-plugin-query
```

Y luego en el punto más alto de nuestra aplicación (por ejemplo nuestro main.tsx) podemos colocar lo siguiente:

```jsx
import { StrictMode } from  'react';

import { createRoot } from  'react-dom/client';

  

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import App from './App.tsx';

import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={ queryClient }>
            <App />

            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
```

Y luego hara hacer uso de TanStack, podemos hacer algo como lo siguiente:

```jsx
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
        staleTime: 1000  *  5, // Tiempo en el que los datos se consideran frescos, pasado el tiempo se volverán a consultar
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

        <div>{ JSON.stringify(error) }</div>

        <button
            disabled={ isFetching }
            onClick={ () => refetch() }
        >Nuevo número</button>
        </>
    );
}

export default App;
```
