import { Easing } from './Easing';
import { EasingFunction } from './EasingFunction';

// https://gist.github.com/gre/1650294
export const AllEasings: Record<Easing, EasingFunction> = {
    // no easing, no acceleration
    linear: (t) => t,
    // accelerating from zero velocity
    easeIn: (t) => t * t,
    // decelerating to zero velocity
    easeOut: (t) => t * (2 - t),
    // acceleration until halfway, then deceleration
    easeInOut: (t) => t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t,
};
