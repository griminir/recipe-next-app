import SearchForm from '@/components/SearchForm';
import RecipeCard, { RecipeCardType } from '@/components/RecipeCard';
import { client } from '@/sanity/lib/client';
import { RECIPES_QUERY } from '@/sanity/lib/queries';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(RECIPES_QUERY);

  // console.log(JSON.stringify(posts, null, 2));

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
