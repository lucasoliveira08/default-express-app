import { Sanitize } from "../utils/functions/sanitize";

describe("Sanitize", () => {
  test("Sanitize <script>", () => {
    expect(Sanitize({ field: "<script>alert('hello')</script>" }).field).toBe(
      "&lt;script&gt;alert('hello')&lt;/script&gt;"
    );
  });

  test("Sanitize <img>", () => {
    expect(
      Sanitize({ field: "<img src='null' onerror='alert(1)'/>" }).field
    ).toBe("<img src />");
  });

  test("Sanitize child fields", () => {
    expect(
      Sanitize({
        field: {
          child: "<script>alert('hello')</script>",
        },
      }).field.child
    ).toBe("&lt;script&gt;alert('hello')&lt;/script&gt;");
  });
});
