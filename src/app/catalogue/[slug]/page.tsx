import { prisma } from "@/lib/prisma";

export default async function Page({ params }: { params: { slug: string } }) {
  const script = await prisma.script.findFirst({
    where: {
      slug: params.slug,
    },
  });


  return <div>{script?.name}</div>;
}
