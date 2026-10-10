function CategoryCard({ category }) {
  const { name, image } = category
  

  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <img
        src={image}
        alt={name}
        className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-[#4A0D24]">
          {name}
        </h3>
      </div>
    </article>
  )
}

export default CategoryCard