/* eslint-disable */
import { decomposeColor, recomposeColor } from '@material-ui/core/styles';
export const forMatColor = color => {
  color = decomposeColor(color);
  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }
  if (typeof color.values[3] === 'undefined') {
    color.values[3] = 1;
  }
  color = recomposeColor(color);
  return color;
};

export function blendColors() {
  const args = Array.prototype.slice.call(arguments);
  const newArgs = args.map(item => {
    item = forMatColor(item)
      .slice(5, -1)
      .split(',');
    item = item.map(i => {
      return Number(i);
    });
    return item;
  });
  let base = [0, 0, 0, 0];
  let mix;
  let added;
  while ((added = newArgs.shift())) {
    if (typeof added[3] === 'undefined') {
      added[3] = 1;
    }
    if (base[3] && added[3]) {
      mix = [0, 0, 0, 0];
      mix[3] = 1 - (1 - added[3]) * (1 - base[3]);
      mix[0] = Math.round(
        (added[0] * added[3]) / mix[3] + (base[0] * base[3] * (1 - added[3])) / mix[3]
      );
      mix[1] = Math.round(
        (added[1] * added[3]) / mix[3] + (base[1] * base[3] * (1 - added[3])) / mix[3]
      );
      mix[2] = Math.round(
        (added[2] * added[3]) / mix[3] + (base[2] * base[3] * (1 - added[3])) / mix[3]
      );
    } else if (added) {
      mix = added;
    } else {
      mix = base;
    }
    base = mix;
  }
  const r = mix[0];
  const g = mix[1];
  const b = mix[2];
  const a = mix[3];
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
