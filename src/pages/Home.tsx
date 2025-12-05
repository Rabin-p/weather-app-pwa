import Search from "@/components/search/Search"

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <main className="flex flex-col items-center justify-center space-y-6 w-full">
        <h1 className="capitalize text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center spacing">
          Clear skies, or not — we’ve got you
        </h1>
        <Search />
      </main>
    </div>
  )
}

export default Home
