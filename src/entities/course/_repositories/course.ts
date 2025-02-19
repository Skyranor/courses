import { cache } from "react";

import { CourseEntity } from "../_domain/types";
import { contentApi } from "@/shared/api/content";
import { logger } from "@/shared/lib/logger";

class CoursesRepository {
  getCoursesList = cache(async (): Promise<CourseEntity[]> => {
    const manifest = await contentApi.fetchManifest();

    const fetchCourse = async (courseSlug: string): Promise<CourseEntity> => {
      const course = await contentApi.fetchCourse(courseSlug);

      return {
        id: course.id,
        title: course.title,
        description: course.description,
        slug: courseSlug,
      };
    };

    const settledCourses = await Promise.allSettled(
      manifest.courses.map(fetchCourse),
    );

    settledCourses.forEach((course, i) => {
      if (course.status === "rejected") {
        logger.error({
          msg: "Course by slug not found",
          slug: manifest.courses[i],
          error: course.reason,
        });
      }
    });

    return settledCourses
      .filter(
        (course): course is PromiseFulfilledResult<CourseEntity> =>
          course.status === "fulfilled",
      )
      .map((course) => course.value);
  });
}

export const coursesRepository = new CoursesRepository();
