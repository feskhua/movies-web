import { type ReactElement } from 'react';

export const Waves = (): ReactElement => {
  return (
    <div className="bottom-0 overflow-hidden left-0 w-full z-10 md:mt-[-150px] mt-[-30px]">
      <div className="block md:hidden">
        <svg width="428" height="111" viewBox="0 0 428 111" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M0 0L17.7219 4.17052C35.7781 8.34104 71.2219 16.6821 107 30.7977C142.778 45.2341 178.222 65.7659 214 69.9364C249.778 74.1069 285.222 61.5954 321 57.7457C356.778 53.5751 392.222 57.7457 410.278 59.6705L428 61.5954V111H410.278C392.222 111 356.778 111 321 111C285.222 111 249.778 111 214 111C178.222 111 142.778 111 107 111C71.2219 111 35.7781 111 17.7219 111H0V0Z"
            fill="#20DF7F"
            fillOpacity="0.09"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M0 44.4L14.2667 53.28C28.5333 62.16 57.0667 79.92 85.6 75.48C114.133 71.04 142.667 44.4 171.2 26.64C199.733 8.88 228.267 0 256.8 0C285.333 0 313.867 8.88 342.4 24.42C370.933 39.96 399.467 62.16 413.733 73.26L428 84.36V111H413.733C399.467 111 370.933 111 342.4 111C313.867 111 285.333 111 256.8 111C228.267 111 199.733 111 171.2 111C142.667 111 114.133 111 85.6 111C57.0667 111 28.5333 111 14.2667 111H0V44.4Z"
            fill="#E5E5E5"
            fillOpacity="0.13"
          />
        </svg>
      </div>
      <div className="hidden md:block">
        <svg viewBox="0 0 1440 111" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M0 0L59.625 4.17052C120.375 8.34104 239.625 16.6821 360 30.7977C480.375 45.2341 599.625 65.7659 720 69.9364C840.375 74.1069 959.625 61.5954 1080 57.7457C1200.38 53.5751 1319.62 57.7457 1380.38 59.6705L1440 61.5954V111H1380.38C1319.62 111 1200.38 111 1080 111C959.625 111 840.375 111 720 111C599.625 111 480.375 111 360 111C239.625 111 120.375 111 59.625 111H0V0Z"
            fill="#20DF7F"
            fillOpacity="0.09"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            // eslint-disable-next-line max-len
            d="M0 44.4L48 53.28C96 62.16 192 79.92 288 75.48C384 71.04 480 44.4 576 26.64C672 8.88 768 0 864 0C960 0 1056 8.88 1152 24.42C1248 39.96 1344 62.16 1392 73.26L1440 84.36V111H1392C1344 111 1248 111 1152 111C1056 111 960 111 864 111C768 111 672 111 576 111C480 111 384 111 288 111C192 111 96 111 48 111H0V44.4Z"
            fill="#E5E5E5"
            fillOpacity="0.13"
          />
        </svg>
      </div>
    </div>
  );
};