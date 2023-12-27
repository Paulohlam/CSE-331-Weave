import React from 'react';
import { List, nil, cons, compact_list } from './list'
import { Color } from './color';
import { weaveBalanced, weaveWarpFaced } from './weave';
import './ui.css';


/** Returns UI that displays a form asking for a description of the weave. */
export function WeaveForm(_: {}): JSX.Element {
  return (<div>
      <h3>Describe Your Weave</h3>

      <form action="/" method="get">
        <p>Describe the warp colors in the order they should appear with one character per color:<br/>
            R = red, O = orange, Y = yellow, G = green, B = blue, P = purple</p>
        <div>
          <label htmlFor="colors">Warp Colors:</label>
          <input type="text" id="colors" name="colors"></input>
        </div>

        <div style={{marginTop: '10px'}}>
          <label htmlFor="type">Type:</label>
          <select id="type" name="type">
              <option value="warp-faced">Warp-Faced</option>
              <option value="balanced">Balanced</option>
          </select>
        </div>

        <div style={{marginTop: '20px'}}>
          <input type="submit" value="Draw It"></input>
        </div>
      </form>
    </div>);
}


/** Properties expected for the Weave UI below. */
export interface WeaveProps {
  type: "balanced" | "warp-faced";
  colors: List<Color>;
  rows: number
}


/** Returns UI that shows the weave with the given description. */
export function Weave(props: WeaveProps): JSX.Element {
  // Calculate the colors for 20 rows of a weave with these weft colors.
  const weave = (props.type === "balanced") ?
      weaveBalanced(props.rows, props.colors, "white") :
      weaveWarpFaced(props.rows, props.colors);

  return <div>{compact_list(DrawWeave(weave, 0))}</div>;
}

// Returns a list of HTML DIV elements, one per row of the weave, showing the
// colors in that row. Rows at eve indexes are offset a bit.
export function DrawWeave(weave: List<List<Color>>, index: number): List<JSX.Element> {
  // TODO: replace this with a proper recursive implementation
  if (weave === nil) {
    return nil;
  } else if (weave.tl === nil) {
    return cons(DrawWeaveRow(weave.hd, true, index), nil);
  } else {
  return cons(DrawWeaveRow(weave.hd, true, index),
      cons(DrawWeaveRow(weave.tl.hd, false, index + 1), DrawWeave(weave.tl.tl, index + 2)));
  }
}

// Returns an HTML DIV element drawing a row with the given colors, after an
// offset on the left if one is requested.
export function DrawWeaveRow(colors: List<Color>, offset: boolean, key: number): JSX.Element {
  if (offset) {
    return (
        <div key={key}>
          <span className="offset">&nbsp;</span>
          {compact_list(DrawWeaveRowColors(colors, 0))}
        </div>);
  } else {
    return <div key={key}>{compact_list(DrawWeaveRowColors(colors, 0))}</div>
  }
}

// Returns a list of HTML span elements that will show the given colors, with
// each being a small rectangle.
export function DrawWeaveRowColors(colors: List<Color>, key: number): List<JSX.Element> {
  if (colors === nil) {
    return nil;
  } else {
    return cons(
        <span className={'square color-' + colors.hd} key={key}></span>,
        DrawWeaveRowColors(colors.tl, key+1));
  }
}