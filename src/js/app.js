/**
 * app.js
 */

/* global tones realdom Chord Scale */

(() => {

  tones.volumn = 1;
  tones.attack = 0;
  tones.release = 300;
  tones.type = 'square';

  let {
    get,
    add,
    create,
    queryAll,
    Event
  } = realdom;

  let notes = [];

  queryAll('.octave').forEach((group) => {
    let octave = Number(group.getAttribute('octave'));
    group.queryAll('.key').forEach((key) => {
      let note = key.getAttribute('key');
      notes.push({
        index: notes.length,
        octave,
        note,
        key,
        play: () => {
          return new Promise((resolve) => {
            key.addClass('active');
            setTimeout(() => {
              tones.play(note, octave);
              setTimeout(() => {
                key.removeClass('active');
                resolve();
              }, 100);
            }, 0);
          });
        },
        activate: (k) => {
          if (k) {
            key.addClass('highlight');
          } else {
            key.removeClass('highlight');
          }
        }
      });
      Event.on(key, 'click', () => {
        tones.play(note, octave);
      });
    });
  });

  Chord.init(notes);

  let $scaleList = get('scaleList');
  let $scaleType = get('scaleType');

  let optInd = 0;

  Scale.all().forEach((scale) => {
    let opt = create('OPTION');
    let {
      name,
      alias = ''
    } = scale;
    let txt = name;
    if (alias !== '') {
      txt += `/${alias}`;
    }
    opt.text = txt;
    opt.value = optInd;
    $scaleList.appendChild(opt);
    optInd++;
  });

  let $chordList = get('chordList');

  let renderChordList = (arr = []) => {
    $chordList.html('');
    arr.map((item) => {
      let span = add('SPAN', $chordList);
      span.addClass('chord-btn');
      span.html(item.name);

      let {
        root: note,
        type
      } = item;

      let c = Chord.build(note, type);

      span.onmouseover = c.activate;
      span.onmouseout = c.desactivate;

      span.onclick = () => {
        c.play(0);
      };
      return span;
    });
  };

  let getScale = () => {
    let v = $scaleList.value;
    let t = $scaleType.value;
    let chords = Scale.findChords(Number(v), t);
    renderChordList(chords);
  };

  Event.on($scaleList, 'change', getScale);
  Event.on($scaleType, 'change', getScale);

  getScale();

})();
