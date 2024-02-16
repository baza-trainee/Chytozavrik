import { Metadata } from 'next';

import WigwamPage from '@/app/(wigwam)/components/Wigwam/WigwamPage/WigwamPage';
import { getBooksService, getQuizzes } from '@/services/api';
import { QueryClient } from '@tanstack/react-query';

export const metadata: Metadata = {
  title: 'Твій вігвам - Читозаврик',
};

interface WigwamProps {
  params: { childId: string };
}

const Wigwam = async ({ params: { childId } }: WigwamProps) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['childBooks'],
    // @ts-expect-error
    queryFn: getQuizzes(childId),
  });

  return (<WigwamPage params={{ childId }} />)
};

export default Wigwam;
