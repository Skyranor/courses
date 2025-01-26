"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import { CourseListElement } from "../model/types";
import { useTransition } from "react";
import { Button } from "@/shared/ui/button";

export const CourseItem = ({
  course,
  onDelete,
}: {
  course: CourseListElement;
  onDelete: () => Promise<void>;
}) => {
  const [isLoadingDelete, startDeleteTransition] = useTransition();

  const handleDelete = async () => {
    await startDeleteTransition(async () => {
      await onDelete();
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button  disabled={isLoadingDelete} onClick={handleDelete}>
          Удалить
        </Button>
      </CardFooter>
    </Card>
  );
};
