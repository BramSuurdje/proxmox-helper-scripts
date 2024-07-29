'use server'

// insert some catagories and scripts into the database using the prisma client

import { prisma } from '@/lib/prisma'

const categories = [
  {
    name: 'Utilities',
    slug: 'utilities',
  },
  {
    name: 'Backup',
    slug: 'backup',
  },
  {
    name: 'Security',
    slug: 'security',
  },
  {
    name: 'System',
    slug: 'system',
  },
  {
    name: 'Network',
    slug: 'network',
  },
  {
    name: 'Storage',
    slug: 'storage',
  }
]

const scripts = [
  {
    name: 'Backup',
    slug: 'backup',
    logo: '/backup.svg',
    description: 'Backup your Proxmox VE environment',
    installCommand: 'Backup your Proxmox VE environment',
    categories: [
      {
        name: 'Utilities',
        slug: 'utilities',
      },
      {
        name: 'Backup',
        slug: 'backup',
      }
    ]
  },
  {
    name: 'Security',
    slug: 'security',
    logo: '/security.svg',
    description: 'Security related scripts',
    installCommand: 'Security related scripts',
    categories: [
      {
        name: 'Utilities',
        slug: 'utilities',
      },
      {
        name: 'Security',
        slug: 'security',
      }
    ]
  },
  {
    name: 'System',
    slug: 'system',
    logo: '/system.svg',
    description: 'System related scripts',
    installCommand: 'System related scripts',
    categories: [
      {
        name: 'Utilities',
        slug: 'utilities',
      },
      {
        name: 'System',
        slug: 'system',
      }
    ]
  },
  {
    name: 'Network',
    slug: 'network',
    logo: '/network.svg',
    description: 'Network related scripts',
    installCommand: 'Network related scripts',
    categories: [
      {
        name: 'Utilities',
        slug: 'utilities',
      },
      {
        name: 'Network',
        slug: 'network',
      }
    ]
  },
  {
    name: 'Storage',
    slug: 'storage',
    logo: '/storage.svg',
    description: 'Storage related scripts',
    installCommand: 'Storage related scripts',
    categories: [
      {
        name: 'Utilities',
        slug: 'utilities',
      },
      {
        name: 'Storage',
        slug: 'storage',
      }
    ]
  }
]

prisma.script.createMany({
  data: scripts
})

prisma.category.createMany({
  data: categories
})