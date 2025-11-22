import Search from "@/components/Search/Search"

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <nav className="my-6 sm:my-4 lg:my-8 flex justify-start">
        <img
          src="assets/sun--shade-logo.png"
          alt="Sun & Shade Logo"
          className="w-24 sm:w-28 md:w-32 lg:w-36 h-auto invert"
        />
      </nav>

      <main className="flex flex-col items-center justify-center space-y-6 w-full">
        <h1 className="capitalize text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-center">
          Clear skies, or not — we’ve got you
        </h1>
        <Search />
      </main>
    </div>
  )
}

export default Home
