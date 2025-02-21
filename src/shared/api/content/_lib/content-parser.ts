import { ParsingError, ValidationError } from "@/shared/lib/errors";
import * as Yaml from "yaml";
import Ajv from "ajv";

export class ContentParser {
  private ajv = new Ajv();

  async parse<T>(text: string, schema: object) {
    try {
      const resultObject: unknown = await Yaml.parse(text);

      if (!this.ajv.validate(schema, resultObject)) {
        throw new ValidationError([...(this.ajv.errors ?? [])]);
      }

      return resultObject as T;
    } catch (error) {
      console.error(error);
      throw new ParsingError(text, "YAML parse error", error);
    }
  }
}
