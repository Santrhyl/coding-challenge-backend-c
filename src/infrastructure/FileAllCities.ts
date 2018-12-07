import fs from "fs";
import City from "../domain/cities/City";
import AllCities from "../domain/cities/AllCities";
import Cities from "../domain/cities/Cities";

let cache;

export default class FileAllCities implements AllCities {
  inUSAAndCanadaWithMoreThan5000People(): Promise<Cities> {
    return new Promise((resolve, reject) => {
      if (cache) {
        resolve(cache);
      }

      // Read File
      fs.readFile("./resources/cities_canada-usa.tsv", "utf8", (err, data) => {
        if (err) throw err;

        const result = Cities.newWithoutCities();
        data
          .split("\n")
          .slice(1)
          .map(line => {
            const lineAsArray = line.trim().split("\t");

            return new City(
              lineAsArray[0],
              lineAsArray[1],
              lineAsArray[3],
              Number(lineAsArray[4]),
              Number(lineAsArray[5]),
              Number(lineAsArray[14])
            );
          })
          .filter((city: City) => city.getPopulation() > 5000)
          .forEach(city => result.addCity(city));

        cache = result;
        resolve(result);
      });
    });
  }
}