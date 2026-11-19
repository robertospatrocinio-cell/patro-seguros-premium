import { describe, expect, it } from "vitest";
import { blogLastmod, normalizeBlogDates, safeBlogDate } from "../blogDates";

const now = new Date("2026-11-19T12:00:00.000Z");

describe("datas editoriais do blog", () => {
  it("preserva datas ISO passadas e o dia atual", () => {
    expect(safeBlogDate("2026-09-15", now)).toBe("2026-09-15");
    expect(safeBlogDate("2026-11-19", now)).toBe("2026-11-19");
  });

  it("omite datas futuras, inválidas e dias inexistentes", () => {
    for (const date of ["2026-12-05", "2026-02-30", "19/11/2026", "", undefined]) {
      expect(safeBlogDate(date, now)).toBe("");
    }
  });

  it("não inventa uma publicação nem uma revisão", () => {
    expect(normalizeBlogDates({ date: "2026-12-05", updatedAt: "2026-12-06" }, now))
      .toEqual({ date: "", updatedAt: undefined });
    expect(normalizeBlogDates({ date: "2026-11-14", updatedAt: "2026-11-13" }, now))
      .toEqual({ date: "2026-11-14", updatedAt: undefined });
  });

  it("usa a mesma data segura para a última modificação do sitemap", () => {
    expect(blogLastmod({ date: "2026-11-14" }, now)).toBe("2026-11-14");
    expect(blogLastmod({ date: "2026-11-14", updatedAt: "2026-11-16" }, now)).toBe("2026-11-16");
    expect(blogLastmod({ date: "2026-11-14", updatedAt: "2026-12-05" }, now)).toBe("2026-11-14");
    expect(blogLastmod({ date: "2026-12-05" }, now)).toBe("");
  });
});
