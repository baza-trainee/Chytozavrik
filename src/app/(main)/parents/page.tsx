'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Parents from 'src/app/(main)/parents/components/Parents';
import CreateWigwam from '@/components/CreateWigwam';
import KidsList from './components/KidsList';
import { Spinner } from '@/components/common';
import './styles.scss';

const ParentsPage = () => {
  const [wigwam, setWigwam] = useState(false);

  const toggleCreateWigwam = () => {
    if (!wigwam) setWigwam(true);
    else setWigwam(false);
  };
  const { data: session, status } = useSession();
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';

  const { data: kids, isLoading } = useQuery({
    queryKey: ['kids'],
    enabled: status === 'authenticated',
    queryFn: async () => {
      const response = await axios(`${baseUrl}/users/me/children/`, {
        headers: {
          Authorization: `Bearer ${session?.user.token.access}`,
        },
      });
      return response.data.data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <Parents handleClick={toggleCreateWigwam} kids={kids} />
      {wigwam && <CreateWigwam setWigwam={setWigwam} />}
      <KidsList kids={kids} />
      <div className="empty" />
    </>
  );
};

export default ParentsPage;
