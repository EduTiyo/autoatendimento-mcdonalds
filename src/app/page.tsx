import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

const getRestaurant = async () => {
  return await db.restaurant.findFirst({
    select: {
      id: true,
      name: true,
      avatarImageUrl: true,
      slug: true,
    },
  });
};

const HomePage = async () => {
  const restaurant = await getRestaurant();

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center p-5 justify-center flex-col">
        <div className="mt-10">
          <Image src={restaurant.avatarImageUrl} alt={restaurant.name} width={80} height={80}/>
        </div>
        <div className="flex mt-5 font-semibold text-xl">
          {restaurant.name}
        </div>
        <div className="flex mt-5">
          <Link href={`/${restaurant.slug}`}>
            <Button variant="secondary">
              Acessar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
