import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import Link from 'next/link'

export default async function page() {
  const getCategoryScripts = cache(() => prisma.category.findMany({
    select: {
      id: true,
      name: true,
      scripts: {
        select: {
          id: true,
          name: true,
          slug: true,
          logo: true,
        }
      }
    }
  }))

  const scripts = await getCategoryScripts()

  return (
    <div>
      {scripts.map(category => (
        <div key={category.id}>
          <h2 className='font-semibold '>{category.name}</h2>
          <ul>
            {category.scripts.map(script => (
              <li key={script.id}>
                <Link href={`/catalogue/${script.slug}`} className='flex items-center gap-2'>
                  <Image width={40} height={40} src={script.logo} alt={script.name} className='rounded-full' />
                  <h3>{script.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}