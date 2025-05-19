import SearchForm from '@/components/SearchForm';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
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
    </>
  );
}
