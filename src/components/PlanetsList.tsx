import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Planet {
  name: string;
  climate: string;
  terrain: string;
  url: string;
}

interface Props {
  page: number;
}

const PlanetList = ({ page }: Props) => {
  
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(1);

    const fetchPlanets = async () => {
        setLoading(true);
        const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
        const data = await res.json();
        setPlanets(data.results);
        setTotalPages(Math.ceil(data.count / 10));
        setLoading(false);
    };

    useEffect(() => {
        fetchPlanets();
    }, [page]);

  if (loading) return <p>Cargando...</p>;

  return (
    <>
        <h1>Planets</h1>
        <ul>
            {planets.map((planet) => (
                <li key={planet.name}>
                    <Link href={`/planet/${planet.url.split('/').slice(-2)[0]}`}>
                        <h2>{planet.name}</h2>
                    </Link>
                </li>
            ))}
        </ul>

        <p>
            Página {page} de {totalPages}.
        </p>
        
        {page !== 1 && (
            <Link href={`/planets/${page - 1}`}>
                <button>Previous page</button>
            </Link>
        )}
        {page !== totalPages && (
            <Link href={`/planets/${page + 1}`}>
                <button>Next page</button>
            </Link>
        )}
        
    </>
  );
};

export default PlanetList;