import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Planet } from '@/types';
import Link from 'next/link';

function PlanetPage () {
    
    const context = useRouter();
    const { id } = context.query;
    const [planetData, setPlanetData] = useState<Planet>();
   

    const fetchPlanet = async () => {
        const res = await fetch(`https://swapi.dev/api/planets/${id}`);
        const json = await res.json();
        const data: Planet = {
            ...json,
            residents : await Promise.all(json.residents.map(async (name: string) => {
                const data = await fetch(name);
                return await data.json();
              }))
            ,
            films: await Promise.all(json.films.map(async (name: string) => {
                const data = await fetch(name);
                return await data.json();
              }))
            ,
          };
        setPlanetData(data);
        return {props: json};
    };

    useEffect(() => {

        fetchPlanet();
    }, []);

  if (!planetData) {
    return <div>Cargando datos del planeta...</div>;
  }

  return (
  <div>
    <Link href="/">Back</Link>
    <h1>{planetData.name}</h1>
    <p>Rotation period: {planetData.rotation_period}</p>
    <p>Orbital period: {planetData.orbital_period}</p>
    <p>Diameter: {planetData.diameter}</p>
    <p>Climate: {planetData.climate}</p>
    <p>Gravity: {planetData.gravity}</p>
    <p>Terrain: {planetData.terrain}</p>
    <p>Surface water: {planetData.surface_water}</p>
    <p>Population: {planetData.population}</p>
    <h2>Residents:
        <ul>
            {planetData.residents.map((resident) => (
                <li key={resident.name}>{resident.name}</li>
            ))}
        </ul>
    </h2>
    <h2>Films:
        <ul>
            {planetData.films.map((film) => (
                <li key={film.title}>{film.title}</li>
            ))}
        </ul>
    </h2>
  </div>
  );
}

export default PlanetPage;