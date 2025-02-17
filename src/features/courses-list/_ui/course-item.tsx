"use client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";

import { CourseEntity } from "@/entities/course/course";

export const CourseItem = ({ course }: { course: CourseEntity }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
