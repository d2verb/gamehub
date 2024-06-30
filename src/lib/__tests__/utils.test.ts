import { expect, test } from "vitest";
import { stringToColor } from "../utils";

test("stringToColor should return color code", () => {
  const codes = [stringToColor("dummy"), stringToColor("")];

  for (const code of codes) {
    expect(code).toEqual(expect.stringMatching(/#[0-9a-f]{6}/));
  }
});
