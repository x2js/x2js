export class Converter {
  public static xmlDateTimeToDate(prop: any) {
    // Implementation based up on http://stackoverflow.com/questions/8178598/xml-datetime-to-javascript-date-object
    // Improved to support full spec and optional parts
    const MINUTES_PER_HOUR = 60

    const bits = prop.split(/[-T:+Z]/g)
    const secondBits = bits[5].split('.')

    let d = new Date(bits[0], bits[1] - 1, bits[2])
    d.setHours(bits[3], bits[4], secondBits[0])

    if (secondBits.length > 1) {
      d.setMilliseconds(secondBits[1])
    }

    // Get supplied time zone offset in minutes
    if (bits[6] && bits[7]) {
      const sign = /\d\d-\d\d:\d\d$/.test(prop) ? '-' : '+'
      let offsetMinutes = bits[6] * MINUTES_PER_HOUR + Number(bits[7])

      // Apply the sign
      offsetMinutes = 0 + (sign === '-' ? -1 * offsetMinutes : offsetMinutes)

      // Apply offset and local timezone
      d.setMinutes(d.getMinutes() - offsetMinutes - d.getTimezoneOffset())
    } else if (prop.indexOf('Z', prop.length - 1) !== -1) {
      d = new Date(
        Date.UTC(
          d.getFullYear(),
          d.getMonth(),
          d.getDate(),
          d.getHours(),
          d.getMinutes(),
          d.getSeconds(),
          d.getMilliseconds()
        )
      )
    }

    // d is now a local time equivalent to the supplied time
    return d
  }
}
