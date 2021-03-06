import { assert } from "chai";
import Cities from "../../../src/domain/cities/Cities";
import City from "../../../src/domain/cities/City";

describe("Cities", () => {
  it("should instanciate with no cities", () => {
    const cities = Cities.newWithoutCities();

    assert.typeOf(cities, "object");
    assert.lengthOf(cities.getCities(), 0);
  });

  it("should add a city with correct values", () => {
    const city = new City(
      "name",
      "country code",
      "feature code",
      30.2,
      40.1,
      4200
    );
    const cities = Cities.newWithoutCities();

    cities.addCity(city);

    assert.deepEqual(cities.getCities(), [city]);
  });

  describe("autocomplete", () => {
    it("should return empty results if empty name", () => {
      const city = new City(
        "name",
        "country code",
        "feature code",
        30.2,
        40.1,
        4200
      );
      const cities = Cities.newWithoutCities();
      cities.addCity(city);

      const result = cities.thatAutocompleteWith("");

      assert.lengthOf(result, 0);
    });

    it("should return empty results if no name matched", () => {
      const city = new City(
        "name",
        "country code",
        "feature code",
        30.2,
        40.1,
        4200
      );
      const cities = Cities.newWithoutCities();
      cities.addCity(city);

      const result = cities.thatAutocompleteWith("ALooooooooooooooogName");

      assert.lengthOf(result, 0);
    });

    it("should return 5 results max", () => {
      const city1 = new City(
        "name",
        "country code",
        "feature code",
        30.2,
        40.1,
        4200
      );
      const cities = Cities.newWithoutCities();
      cities.addCity(city1);
      cities.addCity(city1);
      cities.addCity(city1);
      cities.addCity(city1);
      cities.addCity(city1);
      cities.addCity(city1);

      const result = cities.thatAutocompleteWith("name");

      assert.lengthOf(result, 5);
    });
  });
});
