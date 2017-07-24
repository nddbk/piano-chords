// chord.js

(() => {

  var notes = [];

  var getChords = (note, tone) => {
    let {
      index: first
    } = note;

    let second = first + (tone === 'major' ? 4 : 3);
    let third = second + (tone === 'major' ? 3 : 4);

    if (third >= notes.length) {
      return false;
    }

    return [
      note,
      notes[second],
      notes[third]
    ];
  };

  var getTheBest = (candidates) => {
    let first = candidates[0];
    let last = candidates[candidates.length - 1];
    let predistance = first[0].index;
    let postdistance = notes.length - last[2].index;

    return predistance > postdistance ? first : last;
  };

  var build = (name, tone = 'major') => {
    let candidates = notes.filter((item) => {
      return item.note === name;
    }).map((item) => {
      return getChords(item, tone);
    }).filter((item) => {
      return item !== false;
    });

    let chord = candidates.length > 1 ? getTheBest(candidates) : candidates[0];

    let play = () => {
      chord[0].play()
        .then(chord[1].play)
        .then(chord[2].play);
    };

    let activate = () => {
      chord.forEach((item) => {
        item.activate(1);
      });
    };

    let desactivate = () => {
      chord.forEach((item) => {
        item.activate(0);
      });
    };

    return {
      name,
      tone,
      chord,
      play,
      activate,
      desactivate
    };
  };

  window.Chord = {
    init: (ns) => {
      notes = [...ns];
    },
    build
  };
})();
