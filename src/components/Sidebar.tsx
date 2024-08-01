import React from 'react'
import Image from 'next/image'
import { getCategoryScripts } from '@/lib/actions'

export default async function Sidebar() {
  const categories = await getCategoryScripts()

  return (
    <div>
      <div className='flex flex-col'>
        {categories.map((category) => (
          <div key={category.id}>
            <h2 className='font-semibold'>{category.name}</h2>
            {category.scripts.map((script) => (
              <div key={script.id}>
                <Image height={40} width={40} src={script.logo} alt={script.name} />
                <h3>{script.name}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
