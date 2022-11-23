import {
  formatTime,
  FormatTimeOptions,
  getTimePropertiesFromTimeStamp,
} from '../components/Timer/timerUtils';

describe('timer utilities', () => {
  const MINUTE_IN_MS = 60000;
  const HOUR_IN_MS = 3600000;
  describe('formatTime', () => {
    it('seconds only', () => {
      const result = formatTime(10000);
      expect(result).toBe('10.00');
    });

    it('with minute only', () => {
      const result = formatTime(MINUTE_IN_MS);
      expect(result).toBe('01:00.00');
    });

    it('with hour only', () => {
      const result = formatTime(HOUR_IN_MS);
      expect(result).toBe('1:00:00.00');
    });

    it('with seconds and milliseconds', () => {
      const result = formatTime(12500);
      expect(result).toBe('12.50');
    });

    it('with minutes and seconds', () => {
      const result = formatTime(MINUTE_IN_MS + 12000);
      expect(result).toBe('01:12.00');
    });

    it('with hours and minutes', () => {
      const result = formatTime(HOUR_IN_MS + MINUTE_IN_MS);
      expect(result).toBe('1:01:00.00');
    });

    it('with hours, minutes and seconds', () => {
      const result = formatTime(HOUR_IN_MS + MINUTE_IN_MS + 12000);
      expect(result).toBe('1:01:12.00');
    });

    describe('showMs = false', () => {
      const options: FormatTimeOptions = {
        showMs: false,
      };
      it('seconds only', () => {
        const result = formatTime(10000, options);
        expect(result).toBe('10');
      });

      it('with minute only', () => {
        const result = formatTime(MINUTE_IN_MS, options);
        expect(result).toBe('01:00');
      });

      it('with hour only', () => {
        const result = formatTime(HOUR_IN_MS, options);
        expect(result).toBe('1:00:00');
      });

      it('with seconds and milliseconds', () => {
        const result = formatTime(12500, options);
        expect(result).toBe('12');
      });

      it('with minutes and seconds', () => {
        const result = formatTime(MINUTE_IN_MS + 12000, options);
        expect(result).toBe('01:12');
      });

      it('with hours and minutes', () => {
        const result = formatTime(HOUR_IN_MS + MINUTE_IN_MS, options);
        expect(result).toBe('1:01:00');
      });

      it('with hours, minutes and seconds', () => {
        const result = formatTime(HOUR_IN_MS + MINUTE_IN_MS + 12000, options);
        expect(result).toBe('1:01:12');
      });
    });
  });

  describe('getTimePropertiesFromTimeStamp', () => {
    it('seconds only', () => {
      const result = getTimePropertiesFromTimeStamp(10000);
      expect(result).toMatchObject({
        hours: 0,
        minutes: 0,
        seconds: 10,
        milliseconds: 0,
      });
    });

    it('with minute only', () => {
      const result = getTimePropertiesFromTimeStamp(MINUTE_IN_MS);
      expect(result).toMatchObject({
        hours: 0,
        minutes: 1,
        seconds: 0,
        milliseconds: 0,
      });
    });

    it('with hour only', () => {
      const result = getTimePropertiesFromTimeStamp(HOUR_IN_MS);
      expect(result).toMatchObject({
        hours: 1,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      });
    });

    it('with seconds and milliseconds', () => {
      const result = getTimePropertiesFromTimeStamp(12500);
      expect(result).toMatchObject({
        hours: 0,
        minutes: 0,
        seconds: 12,
        milliseconds: 50,
      });
    });

    it('with minutes, seconds and milliseconds', () => {
      const result = getTimePropertiesFromTimeStamp(MINUTE_IN_MS + 12500);
      expect(result).toMatchObject({
        hours: 0,
        minutes: 1,
        seconds: 12,
        milliseconds: 50,
      });
    });

    it('with hour, minutes, seconds and milliseconds', () => {
      const result = getTimePropertiesFromTimeStamp(HOUR_IN_MS + MINUTE_IN_MS + 12500);
      expect(result).toMatchObject({
        hours: 1,
        minutes: 1,
        seconds: 12,
        milliseconds: 50,
      });
    });

    it('with hour, seconds and milliseconds', () => {
      const result = getTimePropertiesFromTimeStamp(HOUR_IN_MS + 12500);
      expect(result).toMatchObject({
        hours: 1,
        minutes: 0,
        seconds: 12,
        milliseconds: 50,
      });
    });
  });
});
