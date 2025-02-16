import { cache } from "react";

import { CourseEntity } from "../_domain/types";

class CoursesRepository {
  getCoursesList = cache(async (): Promise<CourseEntity[]> => {
    return await [
      {
        id: "1",
        slug: "1",
        name: "blah",
        description: "sample description",
      },
    ];
  });
}

export const coursesRepository = new CoursesRepository();
