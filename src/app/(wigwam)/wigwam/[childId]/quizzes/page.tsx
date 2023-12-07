import Container from '@/components/common/Container/Container';
import UsersQuizzes from '@/app/(wigwam)/wigwam/[childId]/quizzes/components/UsersQuizzes/UsersQuizzes';
import { getUsersQuizzesService } from '@/services/api';
import { QuizCategory, UsersQuizzesResponse } from '@/types';
import { notFound } from 'next/navigation';
import Search from './components/Search/Search';
import CategoryTabs from './components/CategoryTabs/CategoryTabs';
import Banner from './components/Banner/Banner';
import { IS_REVERSED, PAGE_SIZE } from '@/constants';


type SearchParams = {
  search?: string;
  page?: string;
  category?: QuizCategory;
};

type Params = {
  childId: string;
};

interface QuizzesPageProps {
  searchParams: SearchParams;
  params: Params;
}

export const revalidate = 0;

export default async function QuizzesPage({ searchParams, params: { childId } }: QuizzesPageProps) {
  const usersQuizzesResponse = await getUsersQuizzesService(
    searchParams.search,
    searchParams.page,
    searchParams.category || QuizCategory.All,
    IS_REVERSED,
    PAGE_SIZE,
    childId
  );

  if (usersQuizzesResponse.status === 'fail') notFound();

  const usersQuizzes: UsersQuizzesResponse = { ...usersQuizzesResponse.data };

  return (
    <Container>
      <Banner />
      <Search />
      <CategoryTabs
        childId={childId}
        search={searchParams.search}
        page={searchParams.page}
        selectedCategory={searchParams.category}
      />
      <UsersQuizzes
        usersQuizzes={usersQuizzes}
        childId={childId}
        category={searchParams.category || QuizCategory.All}
      />
    </Container>
  );
}
