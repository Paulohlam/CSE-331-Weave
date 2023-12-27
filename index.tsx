import React from 'react';
import { createRoot } from 'react-dom/client';
import { Color, toColor } from './color';
import { List, nil, cons } from './list';
import { Weave, WeaveForm } from './ui';


// Return the type of weave requested or undefined if not requested.
function GetWeaveType(params: URLSearchParams): "balanced"|"warp-faced"|undefined {
  let val = params.get("type");
  if (val === null)
    return undefined;

  val = val.toLowerCase();
  if (val === "balanced" || val === "warp-faced") {
    return val;
  } else {
    return undefined;
  }
}

// Returns the list of weft colors requested or undefined if not requested.
function GetWeftColors(params: URLSearchParams): List<Color>|undefined {
  let colorStr = params.get("colors");
  if (colorStr === null)
    return undefined;

  // Convert the color string into a list of Colors (via toColor on each char).
  let colors: List<Color> = nil;
  // Inv: colors = [colorStr[i], ..., colorStr[n-1]], where n = colorStr.length
  for (let i = colorStr.length - 1 ; i >= 0; i--) {
    colors = cons(toColor(colorStr.charAt(i)), colors);
  }
  return colors;
}


// Parse the arguments to the page
const params = new URLSearchParams(window.location.search);
const type = GetWeaveType(params);
const colors = GetWeftColors(params);

// If both parameters were provided (and valid), show the weave. Otherwise, show
// a form asking them for the parameters.
const root = createRoot(document.getElementById('main')!);
if ((type !== undefined) && (colors !== undefined)) {
  root.render(
    <React.StrictMode><Weave type={type} colors={colors} rows={20}/></React.StrictMode>);
} else {
  root.render(
    <React.StrictMode><WeaveForm/></React.StrictMode>);
}