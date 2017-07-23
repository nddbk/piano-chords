// scale.js
// &#9837;

(() => {

  var scales = [
    {
      root: 'c',
      name: 'C'
    },
    {
      root: 'g',
      name: 'G'
    },
    {
      root: 'd',
      name: 'D'
    },
    {
      root: 'a',
      name: 'A'
    },
    {
      root: 'e',
      name: 'E'
    },
    {
      root: 'b',
      name: 'B',
      alias: 'C♭'
    },
    {
      root: 'f#',
      name: 'F#',
      alias: 'G♭'
    },
    {
      root: 'c#',
      name: 'D♭',
      alias: 'C#'
    },
    {
      root: 'g#',
      name: 'A♭'
    },
    {
      root: 'd#',
      name: 'E♭',
    },
    {
      root: 'a#',
      name: 'B♭'
    },
    {
      root: 'f',
      name: 'F'
    }
  ].map((item, k) => {
    item.index = k;
    return item;
  });

  var getChordAfter = (v, inc = 0) => {
    let arr = [...scales];
    let t = v + inc;
    if (t >= arr.length) {
      let k = t - arr.length;
      return arr[k];
    }
    return arr[t];
  };

  var getChordBefore = (v, inc = 0) => {
    let arr = [...scales];
    let t = v - inc;
    if (t < 0) {
      let k = arr.length + t;
      return arr[k];
    }
    return arr[t];
  };

  var getMinorChords = (v) => {
    return [
      getChordAfter(v, 2),
      getChordAfter(v, 3),
      getChordAfter(v, 4)
    ].map((item) => {
      item.type = 'minor';
      item.name += 'm';
      return item;
    });
  };

  var getMajorChords = (v) => {
    return [
      getChordBefore(v, 2),
      getChordBefore(v, 3),
      getChordBefore(v, 4)
    ].map((item) => {
      item.type = 'major';
      return item;
    });
  };

  var findChords = (v, t = 'major') => {
    let arr = [...scales];

    let main = arr[v];

    let p = v - 1;
    if (p < 0) {
      p = arr.length - 1;
    }
    let prev = arr[p];

    let n = v + 1;
    if (n > arr.length - 1) {
      n = 0;
    }
    let next = arr[n];

    let output = [prev, main, next];

    if (t === 'major') {
      output = output.map((item) => {
        item.type = 'major';
        return item;
      }).concat(getMinorChords(v));
    } else if (t === 'minor') {
      output = output.map((item) => {
        item.type = 'minor';
        return item;
      }).concat(getMajorChords(v));
    }

    return output;
  };

  window.Scale = {
    all: () => {
      return [...scales];
    },
    findChords
  };

})();
