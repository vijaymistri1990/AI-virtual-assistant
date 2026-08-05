
const Home = ({user}) => {
  return (
    <div>
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20">
        <div className="absolute inset-0 bg-linear-to-br from-purple-50 via-white to-emerald-50" />
        <div className="absolute top-0 left-1/4 w-[320px] h-80 bg-purple-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[320px] h-80 bg-emerald-200/40 blur-3xl rounded-full" />
        
        <div className="relative z-10">
          Welcome {user?.name}
        </div>
      </section>
    </div>
  )
}

export default Home 