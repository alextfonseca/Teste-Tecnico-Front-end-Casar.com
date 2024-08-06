// returnHexadecimalFromLanguages.test.ts
import { describe, expect, it } from "vitest";
import { returnHexadecimalFromLanguages } from "./returnHexadecimalFromLanguages";

describe("returnHexadecimalFromLanguages", () => {
  it("should return correct hexadecimal for JavaScript", () => {
    expect(returnHexadecimalFromLanguages("JavaScript")).toBe("#f1e05a");
  });

  it("should return correct hexadecimal for TypeScript", () => {
    expect(returnHexadecimalFromLanguages("TypeScript")).toBe("#2b7489");
  });

  it("should return correct hexadecimal for Shell", () => {
    expect(returnHexadecimalFromLanguages("Shell")).toBe("#89e051");
  });

  it("should return correct hexadecimal for Python", () => {
    expect(returnHexadecimalFromLanguages("Python")).toBe("#3572A5");
  });

  it("should return correct hexadecimal for C#", () => {
    expect(returnHexadecimalFromLanguages("C#")).toBe("#178600");
  });

  it("should return correct hexadecimal for unknown language", () => {
    expect(returnHexadecimalFromLanguages("UnknownLanguage")).toBe("#000000");
  });

  // Adicione mais testes conforme necessário para cobrir todas as linguagens
  it("should return correct hexadecimal for HTML", () => {
    expect(returnHexadecimalFromLanguages("HTML")).toBe("#e34c26");
  });

  it("should return correct hexadecimal for CSS", () => {
    expect(returnHexadecimalFromLanguages("CSS")).toBe("#563d7c");
  });

  it("should return correct hexadecimal for Java", () => {
    expect(returnHexadecimalFromLanguages("Java")).toBe("#b07219");
  });

  it("should return correct hexadecimal for Ruby", () => {
    expect(returnHexadecimalFromLanguages("Ruby")).toBe("#701516");
  });

  it("should return correct hexadecimal for Go", () => {
    expect(returnHexadecimalFromLanguages("Go")).toBe("#00ADD8");
  });

  it("should return correct hexadecimal for C", () => {
    expect(returnHexadecimalFromLanguages("C")).toBe("#555555");
  });

  it("should return correct hexadecimal for C++", () => {
    expect(returnHexadecimalFromLanguages("C++")).toBe("#f34b7d");
  });

  it("should return correct hexadecimal for PHP", () => {
    expect(returnHexadecimalFromLanguages("PHP")).toBe("#4F5D95");
  });

  it("should return correct hexadecimal for Swift", () => {
    expect(returnHexadecimalFromLanguages("Swift")).toBe("#ffac45");
  });

  it("should return correct hexadecimal for Kotlin", () => {
    expect(returnHexadecimalFromLanguages("Kotlin")).toBe("#F18E33");
  });

  it("should return correct hexadecimal for Rust", () => {
    expect(returnHexadecimalFromLanguages("Rust")).toBe("#dea584");
  });

  it("should return correct hexadecimal for Dart", () => {
    expect(returnHexadecimalFromLanguages("Dart")).toBe("#00B4AB");
  });

  it("should return correct hexadecimal for Elixir", () => {
    expect(returnHexadecimalFromLanguages("Elixir")).toBe("#6e4a7e");
  });

  it("should return correct hexadecimal for Erlang", () => {
    expect(returnHexadecimalFromLanguages("Erlang")).toBe("#A90533");
  });

  it("should return correct hexadecimal for Haskell", () => {
    expect(returnHexadecimalFromLanguages("Haskell")).toBe("#5e5086");
  });

  it("should return correct hexadecimal for Lua", () => {
    expect(returnHexadecimalFromLanguages("Lua")).toBe("#000080");
  });

  it("should return correct hexadecimal for Perl", () => {
    expect(returnHexadecimalFromLanguages("Perl")).toBe("#0298c3");
  });

  it("should return correct hexadecimal for Scala", () => {
    expect(returnHexadecimalFromLanguages("Scala")).toBe("#c22d40");
  });

  it("should return correct hexadecimal for Clojure", () => {
    expect(returnHexadecimalFromLanguages("Clojure")).toBe("#db5855");
  });

  it("should return correct hexadecimal for Groovy", () => {
    expect(returnHexadecimalFromLanguages("Groovy")).toBe("#4298b8");
  });

  it("should return correct hexadecimal for R", () => {
    expect(returnHexadecimalFromLanguages("R")).toBe("#198CE7");
  });

  it("should return correct hexadecimal for Vue", () => {
    expect(returnHexadecimalFromLanguages("Vue")).toBe("#2c3e50");
  });

  it("should return correct hexadecimal for Assembly", () => {
    expect(returnHexadecimalFromLanguages("Assembly")).toBe("#6E4C13");
  });

  it("should return correct hexadecimal for Objective-C", () => {
    expect(returnHexadecimalFromLanguages("Objective-C")).toBe("#438eff");
  });

  it("should return correct hexadecimal for CoffeeScript", () => {
    expect(returnHexadecimalFromLanguages("CoffeeScript")).toBe("#244776");
  });

  it("should return correct hexadecimal for TeX", () => {
    expect(returnHexadecimalFromLanguages("TeX")).toBe("#3D6117");
  });

  it("should return correct hexadecimal for OCaml", () => {
    expect(returnHexadecimalFromLanguages("OCaml")).toBe("#3be133");
  });

  it("should return correct hexadecimal for Vim script", () => {
    expect(returnHexadecimalFromLanguages("Vim script")).toBe("#199f4b");
  });

  it("should return correct hexadecimal for ClojureScript", () => {
    expect(returnHexadecimalFromLanguages("ClojureScript")).toBe("#db5855");
  });

  it("should return correct hexadecimal for CSS", () => {
    expect(returnHexadecimalFromLanguages("CSS")).toBe("#563d7c");
  });

  it("should return correct hexadecimal for SCSS", () => {
    expect(returnHexadecimalFromLanguages("SCSS")).toBe("#c6538c");
  });

  it("should return correct hexadecimal for Sass", () => {
    expect(returnHexadecimalFromLanguages("Sass")).toBe("#c6538c");
  });

  it("should return correct hexadecimal for Less", () => {
    expect(returnHexadecimalFromLanguages("Less")).toBe("#1d365d");
  });
});
