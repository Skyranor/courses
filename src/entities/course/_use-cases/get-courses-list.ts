import { coursesRepository } from "../_repositories/course";

export type GetCoursesList = {
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
};

export class GetCoursesListUseCase {
  async execute(data?: GetCoursesList) {
    return await coursesRepository.getCoursesList();
  }
}

export const getCoursesListUseCase = new GetCoursesListUseCase();
