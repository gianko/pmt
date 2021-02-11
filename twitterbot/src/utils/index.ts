/* tslint:disable no-bitwise */
import { ACTUAL_FRAMES, DIVIDER } from "../consts";

export const msToTime = (miliSeconds: number): string =>
  `${`${(miliSeconds / 3.6e6) | 0}`.padStart(2, "0")}:${`${((miliSeconds % 3.6e6) / 6e4) | 0
    }`.padStart(2, "0")}:${`${((miliSeconds % 6e4) / 1000) | 0}`.padStart(2, "0")}.${`${miliSeconds % 1000
      }`.padStart(3, "0")}`;

export const frameFromIndex = (index: number): number => (index * DIVIDER) % ACTUAL_FRAMES;
