$(document).ready(function() {

  var soundRed = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var soundBlue = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var soundGreen = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var soundYellow = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

  var sequence = []; //store full sequence here
  var sequenceStep = []; //push 1 at a time here
  var input = []; //push input here
  var sequenceIndex = 0;
  var score = 0;

  var playbackCalled = false;
  var strictMode; //false

  $(function() {
    $('#start').click(function() {
      generateSequence();
      playbackSequence();
    });
  });

  $('#reset').on('click', resetGame);
  $('#buttons').css('pointer-events', 'none');

  //generates random numbers for series array
  function randomRange(min, max) {
    var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
  }

  function generateSequence() {
    sequence = [];
    for (var i = 0; i < 20; i++) {
      sequence.push(randomRange(1, 4)); //generates random sequence for the round
    }
  }

  $('#strict').click(function() {
    var currentBackground = $('body').css('background-color');
    strictMode = !strictMode
    $('body').toggleClass('strict');
    console.log(strictMode);
    if (strictMode === true) {
      $('#display').html('STRICT MODE ENABLED');
      $('#strict').css({
        'background-color': '#FF4769',
        'color': 'white'
      });
    } else if (strictMode === false) {
      $('#display').html('STRICT MODE DISABLED');
      $('#strict').css({
        'background-color': '#54C3FF',
        'color': 'black'
      });
    }
  });

  function userInput() {
    $('#red').click(function() {
      input.push(Number($(this).attr('data-num')));
      soundRed.play();
      checkLength();
    });

    $('#blue').click(function() {
      input.push(Number($(this).attr('data-num')));
      soundBlue.play();
      checkLength();
    });

    $('#green').click(function() {
      input.push(Number($(this).attr('data-num')));
      soundGreen.play();
      checkLength();
    });

    $('#yellow').click(function() {
      input.push(Number($(this).attr('data-num')));
      soundYellow.play();
      checkLength();
    });
  }

  function playbackSequence() {
    $('#display').html('COPY THE SEQUENCE');
    $('#display').css('background-color', '#2A5674');
    $('#start, #strict').css({
      'pointer-events': 'none',
      'box-shadow': '0px',
      'color': 'grey'
    });
    sequenceStep.push(sequence[sequenceIndex]);
    sequenceIndex = sequenceIndex + 1;

    playback();
    $('#buttons').css('pointer-events', '');
  }

  function playbackSequenceMistake() {
    if (playbackCalled === true) {
      $('#display').html('GAME OVER!').css('background-color', '#FF7991');
    } else if (strictMode === true) {
      $('#display').html('GAME OVER!').css('background-color', '#FF7991');
    } else {
      $('#display').html('WOOPS! ONE MORE TRY!')
      $('#buttons').css('pointer-events', 'none');
      playback();
      $('#buttons').css('pointer-events', '');
      playbackCalled = true;
    }
  }

  function playback() {
    var step = sequence[sequenceIndex];

    var delayBefore = 0;
    var delayAfter = 1000;
    var transitionBack = 500;

    for (var i = 0; i < sequenceStep.length; i++) {
      delayBefore += 1000;
      delayAfter += 1000;
      transitionBack += 1000;

      switch (sequence[i]) {
        case 1:
          setTimeout(function() {
            $('#red').css('background', '#ff3427');
          }, transitionBack)
          setTimeout(function() {
            $('#red').css('background', '#FF9089');
            soundRed.play();
          }, delayBefore)
          setTimeout(function() {
            $('#red').css('background', '#ff3427');
          }, delayAfter)
          break;
        case 2:
          setTimeout(function() {
            $('#blue').css('background', '#37aeff');
          }, transitionBack)
          setTimeout(function() {
            $('#blue').css('background', '#91D2FF');
            soundBlue.play();
          }, delayBefore)
          setTimeout(function() {
            $('#blue').css('background', '#37aeff');
          }, delayAfter)
          break;
        case 3:
          setTimeout(function() {
            $('#green').css('background', '#53c85b');
          }, transitionBack)
          setTimeout(function() {
            $('#green').css('background', '#A1E1A5');
            soundGreen.play();
          }, delayBefore)
          setTimeout(function() {
            $('#green').css('background', '#53c85b');
          }, delayAfter)
          break;
        case 4:
          setTimeout(function() {
            $('#yellow').css('background', '#ffe93c');
          }, transitionBack)
          setTimeout(function() {
            $('#yellow').css('background', '#FFF394');
            soundYellow.play();
          }, delayBefore)
          setTimeout(function() {
            $('#yellow').css('background', '#ffe93c');
          }, delayAfter)
          break;
      }
    }
  }

  function checkLength() {
    // console.log('seqstep = ' + sequenceStep);
    // console.log('input = ' + input);

    for (var i = 0; i < input.length; i++) {
      if (sequenceStep[i] !== input[i]) {
        $('#display').css('background-color', '#FF7991');
        input = [];
        playbackSequenceMistake();
      }
    }

    if (input.length === sequenceStep.length) {
      checkForMatch();
    }
  }

  function checkForMatch() {
    var inputString = input.toString();
    var sequenceString = sequenceStep.toString();

    if (inputString === sequenceString) {
      score += 1;
      console.log(score);
      if (score === 20) {
        $('#display').html('YOU WIN. IMPRESSIVE');
        $('#count').html(score);
      } else {
        playbackSequence();
        $('#count').html(score);
      }
    }
    input = [];
  }

  function resetGame() {
    sequenceIndex = 0;
    score = 0;
    sequenceStep = [];
    input = [];
    playbackCalled = false;

    $('#buttons').css('pointer-events', 'none');
    $('#count').html(score);
    $('#gameSpace').css('background-color', 'white');
    $('#display').html('// GAME RESET //').css('background-color', '#2A5674');
    $('#start, #strict').css({
      'pointer-events': '',
      'box-shadow': '',
      'color': ''
    });
  }

  userInput();

});