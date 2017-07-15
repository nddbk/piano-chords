/**
 * app.js
 */

/* global tones realdom */

(() => {
  tones.volumn = 1;
  tones.attack = 0;
  tones.release = 300;
  tones.type = 'square';

  let {
    queryAll,
    Event
  } = realdom;

  queryAll('.octave').forEach((group) => {
    let octave = Number(group.getAttribute('octave'));
    group.queryAll('.key').forEach((key) => {
      let note = key.getAttribute('key');
      Event.on(key, 'mousedown', () => {
        tones.play(note, octave);
      });
    });
  });

})();
