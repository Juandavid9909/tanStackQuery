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
        enabled: ourOtherQuery.data !== undefined, // Hacer que sea dependiente de otro query
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


# prefetchQuery

Para brindar una mejor experiencia de usuario, se puede usar el prefetchQuery antes de que el usuario de clic a alguna opción para ver los datos, esto nos permitirá tener los datos listo para que el usuario pueda ver la información:

```jsx
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { getIssue, getIssueComments } from '../actions';
import { GithubIssue, State } from '../interfaces';

interface Props {
    issue: GithubIssue;
}

export const IssueItem = ({ issue }: Props) => {
    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const prefetchData = () => {
        queryClient.prefetchQuery({
            queryKey: ['issues', issue.number],
            queryFn: () => getIssue(issue.number),
            staleTime: 1000 * 60,
        });

        queryClient.prefetchQuery({
            queryKey: ['issues', issue.number, 'comments'],
            queryFn: () => getIssueComments(issue.number),
            staleTime: 1000 * 60,
        });
    };

    return (
        <div onMouseEnter={ prefetchData }>{ issue.number }</div>
    );
};
```


# setQueryData

Esto lo que nos permitirá hacer es dejar seteada la data de un query que tengamos previamente para no tener que realizar la búsqueda por el tiempo que nosotros queramos mantener dicho dato cacheado. Usando el mismo evento onMouseEnter del ejemplo pasado podríamos colocar la siguiente función:

```jsx
const  presetData  =  ()  => {
    queryClient.setQueryData(['issues', issue.number], issue, {
        updatedAt: Date.now() + (1000  *  60),
    });
};
```


# Mutaciones

Estas son usadas para crear, actualizar y eliminar elementos en un endpoint, y son sumamente útiles para estados, controlar cacheos posteriormente y demás.

```jsx
import { useMutation } from "@tanstack/react-query";

import { productActions } from "..";

export const useProductMutation = () => {
    const  queryClient  =  useQueryClient();

    const mutation = useMutation({
        mutationFn: productActions.createProduct,
        onSuccess: (data)  => {
            // queryClient.invalidateQueries(
            //     ["products", { filterKey: data.category }]
            // ); // Invalida el query para que traiga los datos nuevamente

            // Mejor forma para evitar llamados al back
            queryClient.setQueryData<Product[]>(
                ["products", { filterKey: product.category }],
                (old)  => {
                    if(!old) return [product];

                    return [...old, product];
                },
            );
        },
        onSettled: ()  => {
            console.log("onSettled");
        },
    });

    return  mutation;
};
```

