# sampa.js

## JS / ES6 version of NREL 's Solar and Moon Position Algorithm (SAMPA)

NREL 's Solar and Moon Position Algorithm (SAMPA) calculates the solar and lunar zenith and azimuth angles in the period from the year -2000 to 6000, with uncertainties of +/- 0.0003 degrees for the Sun and +/- 0.003 degrees for the Moon, based on the date, time, and location on Earth. The algorithm can be used for solar eclipse monitoring and estimating the reduction in solar irradiance for many applications, such as smart grid, solar energy, etc.

## Usage

...

## Origin

Please visit https://midcdmz.nrel.gov/sampa for additional information.

## Differences

- Inter-module functions wrapped into services
- Value precision differences
- Plain associative arrays wrapped into objects whose only property is `associative`
- Tester entrypoints converted to unit tests

## Testing

```shell
npm test
```

## License

Adoption in JS under [MIT license](/LICENSE) 2023 © Abdullah Pazarbasi.

[NREL 's SAMPA License](https://midcdmz.nrel.gov/sampa/#license)
