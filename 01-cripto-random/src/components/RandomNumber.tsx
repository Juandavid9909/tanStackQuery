import { useQuery } from '@tanstack/react-query';

const getCryptoNumber = async (): Promise<number> => {
    const resp = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
        .then((resp) => resp.json());

    return Number(resp);
};

export const RandomNumber = () => {
    const { data } = useQuery({
        queryKey: ['randomNumber'], // Identificador de nuestra consulta
        queryFn: getCryptoNumber, // Función que se ejecutará tan pronto el useQuery se ejecute
        staleTime: 1000 * 5, // Tiempo en el que los datos se consideran frescos, pasado el tiempo se volverán a consultar
    });

    return (
        <div>Random Number: { data }</div>
    );
};