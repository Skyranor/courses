export type CourseListElement = {
  id: string;
  name: string;
  description: string;
};

export type CreateCourseListElementCommand = Omit<CourseListElement, "id">;

export type DeleteCourseListElementCommand = Pick<CourseListElement, "id">;
