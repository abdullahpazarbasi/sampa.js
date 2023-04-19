# sampa.js

## JS / ES6 version of NREL 's Solar and Moon Position Algorithm (SAMPA)

![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/abdullahpazarbasi/sampa.js?display_name=tag&include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/abdullahpazarbasi/sampa.js)
![GitHub top language](https://img.shields.io/github/languages/top/abdullahpazarbasi/sampa.js)
![GitHub file size in bytes](https://img.shields.io/github/size/abdullahpazarbasi/sampa.js/dist/sampa.min.js)
![GitHub](https://img.shields.io/github/license/abdullahpazarbasi/sampa.js)
![GitHub Repo stars](https://img.shields.io/github/stars/abdullahpazarbasi/sampa.js)
![GitHub watchers](https://img.shields.io/github/watchers/abdullahpazarbasi/sampa.js)

NREL 's Solar and Moon Position Algorithm (SAMPA) calculates the solar and lunar zenith and azimuth angles in the period from the year -2000 to 6000, with uncertainties of +/- 0.0003 degrees for the Sun and +/- 0.003 degrees for the Moon, based on the date, time, and location on Earth. The algorithm can be used for solar eclipse monitoring and estimating the reduction in solar irradiance for many applications, such as smart grid, solar energy, etc.

## Usage

```html
<html lang="en">
<head>
    <title>Test</title>
    <script src="https://cdn.jsdelivr.net/gh/abdullahpazarbasi/sampa.js@1.0.0/dist/sampa.min.js"></script>
</head>

<body>
<script>
    document.addEventListener("DOMContentLoaded", function (event) {
        // ...
        const rq = new sampa.Request(
            2023, // gregorian year -- range from -2000 to 6000
            4, // gregorian month -- range from 1 to 12
            20, // gregorian day -- range from 1 to 31
            7, // observer local hours -- range from 0 to 24
            12, // observer local minutes -- range from 0 to 59
            1, // observer local seconds -- range from 0 to <60
            3, // observer timezone -- range from -18 to 18
            0, // ΔUT1 = Universal Time (UT) - Coordinated Universal Time (UTC) [seconds] -- range from >-1 to <1
            66.4, // ΔT = Terrestrial Time (TT) - Universal Time (UT) where ΔT = 32.184 + (TAI-UTC) - DUT1 [seconds] -- range from -8000 to 8000
            -10.1749484, // observer latitude -- range from -90 to 90
            123.5735185, // observer longitude -- range from -180 to 180
            0, // observer elevation [meters] -- minimum -6500000
            1000, // annual average local pressure [millibars] -- range from 0 to 5000
            16, // annual average local temperature [degrees Celsius] -- range from >-273 to 6000
            0, // surface slope (measured from the horizontal plane) [degrees] -- range from -360 to 360
            0, // surface azimuth rotation (measured from south to projection of surface normal on horizontal plane, negative east) [degrees] -- range from -360 to 360
            0.5667, // atmospheric refraction at sunrise and sunset [degrees] -- range from -5 to 5
            sampa.ALL, // mode
            0.3, // total column ozone thickness [centimeters] -- range from 0.05 to 0.4
            1.5, // total column water vapor [centimeters] -- range from 0.01 to 6.5
            0.07637, // broadband aerosol optical depth -- range from 0.02 to 0.5
            0.85, // forward scattering factor -- 0.85 recommended for rural aerosols
            0.2 // albedo [ground reflectance] -- earth typical is 0.2, snow 0.9, vegetation 0.25
        );
        const rs = sampa.create().calculate(rq);
        console.log(rs.ems);
        // ...
    });
</script>
</body>
</html>
```

> Please, see [examples](/examples).

## Origin

Please visit https://midcdmz.nrel.gov/sampa for additional information.

## Differences

- Inter-module functions wrapped into services
- Input / output structure discriminated
- Input / output models decoupled respecting to services
- Value precision
- Plain associative arrays wrapped into objects whose only property is `associative`
- Error throwing and handling
- Tester entrypoints converted to unit tests

## Testing

```shell
npm test
```

## License

Adoption in JS under [MIT license](/LICENSE) 2023 © Abdullah Pazarbasi.

[NREL 's SAMPA License](https://midcdmz.nrel.gov/sampa/#license)
