import proj4 from "proj4";

const N_DEC_WGS84 = 8;

/**
 * Checks if the given coordinates are likely to be in the WGS84 coordinate system.
 * This is a basic check based on typical latitude and longitude ranges.
 * It assumes coordinates are in decimal degrees, where:
 * - Latitude ranges from -90 to 90
 * - Longitude ranges from -180 to 180
 *
 * @param x The longitude value of the coordinate.
 * @param y The latitude value of the coordinate.
 * @returns true if the coordinates fall within the WGS84 decimal degree range, false otherwise.
 */
function isWGS84(x: number, y: number): boolean {
    // console.log(x, y)

    return (x >= -180 && x <= 180 && y >= -90 && y <= 90);
}

export const ConverterCood = (x: number, y: number) => {

    if (isWGS84(y, x)) {
        return [x, y];
    }

    proj4.defs('VN2000_QUANG_NGAI', '+proj=tmerc +lat_0=0 +lon_0=108.000 +k=0.9999 +x_0=500000 +y_0=0 +ellps=WGS84 +towgs84=-191.90441429,-39.30318279,-111.45032835,-0.00928836,0.01975479,-0.00427372,0.252906278 +units=m +no_defs');

    const proj4Src: any = proj4.defs('VN2000_QUANG_NGAI');
    const proj4Dest: any = proj4.defs('EPSG:4326');

    const toMeterSrc: any = proj4Src ? proj4Src.units?.to_meter || 1 : 1;
    const toMeterDest: any = proj4Dest ? proj4Dest.units?.to_meter || 1 : 1;
    const xVal = x / toMeterSrc;
    const yVal = y / toMeterSrc;

    const pj = proj4.toPoint([xVal, yVal]);
    const result: any = proj4(proj4Src, proj4Dest).forward(pj);
    result.x *= toMeterDest.toFixed(N_DEC_WGS84);
    result.y *= toMeterDest.toFixed(N_DEC_WGS84);

    return [result.y, result.x];
}