export const TestJuan = () => {

    const callouts = [
      {
        name:'',
        description: 'CABALLEROS',
        imageSrc: 'https://mensandbeauty.com/wp-content/uploads/2019/07/moda-para-hombre-prendas-calzado-ropa-complementos-accesorios-4.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#',
      },
      {
        name: '',
        description: 'DAMAS',
        imageSrc: 'https://img.freepik.com/foto-gratis/conjunto-ropa-mujer-moda-camisa-jeans-bolso-look-moda-hipster-endecha-plana_169016-3209.jpg?w=2000',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#',
      },
      {
        name: '',
        description: 'NIÑOS',
        imageSrc: 'https://www.melodrama.com.ar/modules/ybc_blog/views/img/post/ropa-de-ni%C3%B1o-y-bebe-ordenada-jpg.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#',
      },
    ]
  
      return (
          <>
  
  <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-4xl font-bold text-gray-900">SECCIÓN</h2>
  
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  
          </>
      )
  }
  