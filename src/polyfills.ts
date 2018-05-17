export class Polyfills {
  /**
     * Polyfills for Internet Explorer 8
     */
  public static init() {
    if (typeof String.prototype.trim !== 'function') {
      String.prototype.trim = function trim() {
        return this.replace(/^\s+|^\n+|(\s|\n)+$/g, '')
      }
    }

    if (typeof Date.prototype.toISOString !== 'function') {
      // Implementation from http://stackoverflow.com/questions/2573521/how-do-i-output-an-iso-8601-formatted-string-in-javascript
      Date.prototype.toISOString = function toISOString() {
        const MS_IN_S = 1000

        return (
          this.getUTCFullYear() +
          '-' +
          Polyfills.pad(this.getUTCMonth() + 1) +
          '-' +
          Polyfills.pad(this.getUTCDate()) +
          'T' +
          Polyfills.pad(this.getUTCHours()) +
          ':' +
          Polyfills.pad(this.getUTCMinutes()) +
          ':' +
          Polyfills.pad(this.getUTCSeconds()) +
          '.' +
          String((this.getUTCMilliseconds() / MS_IN_S).toFixed(3)).slice(2, 5) +
          'Z'
        )
      }
    }
  }

  public static pad(numb: number): string {
    let r = String(numb)
    if (r.length === 1) {
      r = '0' + r
    }
    return r
  }
}
