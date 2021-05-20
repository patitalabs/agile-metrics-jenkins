import * as crypto from "crypto";

const INIT_VECTOR = 'someSecret';

export class Utils {

  static flatMap(func, arr) {
    return arr.map(func).reduce((x, y) => Utils.concat(x, y), []);
  }

  static concat(x: [], y: []) {
    return x.concat(y);
  }

  static toHash(theText: string): string {
    return crypto
        .createHmac('sha256', INIT_VECTOR)
        .update(theText)
        .digest('hex');
  }

  static isDateInRange({
                         createdAt,
                         since,
                         until,
                       }: {
    createdAt: Date;
    since: Date;
    until?: Date;
  }) {
    let isInRangeFromEnd = true;
    if (until) {
      isInRangeFromEnd = createdAt <= until;
    }
    const isInRangeFromStart = createdAt >= since;
    return isInRangeFromStart && isInRangeFromEnd;
  }

  static toBase64(theText: string): string {
    return Buffer.from(theText).toString('base64');
  }
}
