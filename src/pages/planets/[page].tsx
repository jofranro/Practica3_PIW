import PlanetList from '@/components/PlanetsList';
import { GetServerSideProps, NextPage } from 'next';

interface Props {
  page: number;
}

const PlanetsPage: NextPage<Props> = ({ page }) => {
  return <PlanetList page={page} />;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    context,
) => {
    const { page } = context.query;
    
    return {
        props: {
        page: Number(page),
        },
    };
};


export default PlanetsPage;