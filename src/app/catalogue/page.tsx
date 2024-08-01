import { getLatestScripts } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

export default async function page() {
  const latestScripts = await getLatestScripts();


  return (
    <div>
      Most recently added scripts
      <ul>
        {latestScripts.map((script) => (
          <li key={script.id}>
            <Link href={`/catalogue/${script.slug}`} className="flex items-center gap-2">
              <Image
                width={40}
                height={40}
                src={script.logo}
                alt={script.name}
                className="rounded-full"
              />
              <h3>{script.name}</h3>
            </Link>
          </li>
        ))}
      </ul>


    </div>
  );
}