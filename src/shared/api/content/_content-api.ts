import { join } from "path";
import { CacheStrategy } from "./_lib/cache-strategy";
import { ContentParser } from "./_lib/content-parser";
import { FileFetcher } from "./_lib/file-fetcher";
import { Manifest } from "./_schemas/manifest.schema";
import manifestSchema from "./_schemas/manifest.schema.json";
import { Course } from "./_schemas/course.schema";
import courseSchema from "./_schemas/course.schema.json";
import { Lesson } from "./_schemas/lesson.schema";
import lessonSchema from "./_schemas/lesson.schema.json";

interface Deps {
  cacheStrategy: CacheStrategy;
  contentParser: ContentParser;
  fileFetcher: FileFetcher;
}

type CourseSlug = string;
type LessonSlug = string;

export class ContentApi {
  constructor(
    private baseUrl: string,
    private deps: Deps,
  ) {}

  async fetchManifest() {
    const fetchData = async () => {
      const text = await this.deps.fileFetcher.fetchText(this.getManifestUrl());
      return await this.deps.contentParser.parse<Manifest>(
        text,
        manifestSchema,
      );
    };
    return this.deps.cacheStrategy.fetch(["manifest"], fetchData);
  }

  async fetchCourse(slug: CourseSlug) {
    const fetchData = async () => {
      const text = await this.deps.fileFetcher.fetchText(
        this.getCourseUrl(slug),
      );
      return await this.deps.contentParser.parse<Course>(text, courseSchema);
    };
    return this.deps.cacheStrategy.fetch(["course", slug], fetchData);
  }

  async fetchLesson(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
    const fetchData = async () => {
      const text = await this.deps.fileFetcher.fetchText(
        this.getLessonUrl(courseSlug, lessonSlug),
      );
      return await this.deps.contentParser.parse<Lesson>(text, lessonSchema);
    };
    return this.deps.cacheStrategy.fetch(
      ["lesson", courseSlug, lessonSlug],
      fetchData,
    );
  }

  private getManifestUrl() {
    return join(this.baseUrl, "manifest.yaml");
  }
  private getCourseUrl(slug: CourseSlug) {
    return join(this.baseUrl, `/courses/${slug}/course.yaml`);
  }
  private getLessonUrl(courseSlug: CourseSlug, lessonSlug: LessonSlug) {
    return join(
      this.baseUrl,
      `/courses/${courseSlug}/lesson/${lessonSlug}/lesson.yaml`,
    );
  }
}
