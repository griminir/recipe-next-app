import SearchForm from '@/components/SearchForm';
import RecipeCard from '@/components/RecipeCard';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 99,
      author: {
        _id: 1,
        name: 'Timmy storm',
      },
      _id: 1,
      description: 'this is a recipe description',
      image: 'https://bilder.ngdata.no/7039010019828/kmh/large.jpg',
      category: 'fast meals',
      title: 'frozen pizza',
    },
  ];
  return (
    <>
      <section className='green_container'>
        <h1 className='heading'>
          Your familes recipes <br /> all in one place
        </h1>

        <p className='sub-heading !max-w-3x'>
          Add recipes, share recipes, make the world a giant family cookbook
        </p>

        <SearchForm query={query} />
      </section>

      <section className='section-container'>
        <p className='text-30-semibold'>
          {query ? `search results for "${query}"` : 'all recipes'}
        </p>

        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            posts.map((post: RecipeCardType) => (
              <RecipeCard key={post?._id} post={post} />
            ))
          ) : (
            <p className='no-results'>No recipe found</p>
          )}
        </ul>
      </section>
    </>
  );
}
