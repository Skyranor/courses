import { Button } from "@/components/ui/button";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function Home() {
  const courses = await client.course.findMany();

  console.log(courses);

  return (
    <main
      className="flex min-h-screen 
    items-center justify-center"
    >
      <Button>Button</Button>
    </main>
  );
}
