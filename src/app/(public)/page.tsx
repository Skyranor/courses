import { CoursesList } from "@/features/courses-list/courses-list";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col p-8">
      <CoursesList />
    </main>
  );
}
