import { Suspense } from "react";
import Reservation from "@/app/_components/Reservation";
import Cabin from "@/app/_components/Cabin";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

// Dynamic metadata
// Must be named `generateMetadata`
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

// This function will be called at build time
// // Returns the list of all cabin ids
// Then, Next.js will generate a page for each cabin as static page
// And therefore the page will be pre-rendered and will be faster
// On this page dynamic data can be fetched using the `params` prop and 
// dynamic param is cabinId
// So we want to get all possible cabin ids
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
