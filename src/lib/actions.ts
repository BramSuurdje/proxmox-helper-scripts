'use server'

import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getCategoryScripts = cache(() =>
    prisma.category.findMany({
      select: {
        id: true,
        name: true,
        scripts: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
      },
    }),
);
  
export const getLatestScripts = cache(() =>
  prisma.script.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  }),
);