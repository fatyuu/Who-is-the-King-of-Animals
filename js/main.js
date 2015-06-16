var FATYU = (function () {
  //存放資料的array
  var myQuestions = [
    {
      title: '請問鯨魚是什麼顏色?',
      questions: ['粉紅', '橘色', '灰色', '黑色', '藍色', '紫色', '白色', '棕色', '金色'],
      answer: 4,
      imgSrc: "images/question-1.png",
  },
    {
      title: '請問有幾隻貓咪?',
      questions: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      answer: 7,
      imgSrc: "images/question-2.png",
  },
    {
      title: '請問螢幕中有幾隻動物?',
      questions: [6, 7, 8, 9, 10, 11, 12, 13, 14],
      answer: 7,
      imgSrc: "images/question-3.png",
  },
    {
      title: '請問總共有幾種顏色?',
      questions: [6, 7, 8, 9, 10, 11, 12, 13, 14],
      answer: 1,
      imgSrc: "images/question-4.png",
  },
    {
      title: '請問這遊戲叫做什麼名字?',
      questions: ['我是動物王', '誰是動物王', '你是動物王', '動物王是你', '動物王之王', '動物王好玩', '他是動物王', '全能動物王', '好玩動物王'],
      answer: 1,
      imgSrc: "images/question-5.png",
  },

];
  var myVictory = [
    {
      imgSrc: "images/zero-1.png"
  }, {
      imgSrc: "images/gold-5.png"
  }, {
      imgSrc: "images/gold-4.png"
  }, {
      imgSrc: "images/gold-3.png"
  }, {
      imgSrc: "images/gold-2.png"
  }, {
      imgSrc: "images/cup-1.png"
  },
];
  var questionBtns = document.querySelectorAll('.question__btn');


  var intervalID;
  var level = 0;
  var score = 0;
  var stage = 0;
  var stages = [start, tutorial, play, end];

  function enterNextStage() {
    ++stage;
    stages[stage]();
  }

  function start() {
    // begin頁面點擊
    document.querySelector('#begin').addEventListener('click', function (e) {
      if (!e) {
        return;
      }
      document.querySelector('#begin').classList.add('display-none');
      document.querySelector('#surround').classList.remove('display-none');
      enterNextStage();
    });
  };

  function tutorial() {
    // tutorial頁面btn
    document.querySelector('#tutorial-btn').addEventListener('click', function (e) {
      document.querySelector('#tutorial').classList.add('display-none');
      document.addEventListener('mousemove', mousemoveHandler);
      document.querySelector('#level-base').classList.remove('display-none');
      timerStart();
      // questionBtns的文字改變
      for (var k = 0; k < questionBtns.length; ++k) {
        var changedBtn = questionBtns[k];
        changedBtn.textContent = myQuestions[level]['questions'][k];
      }
      // question的文字改變
      document.querySelector('#question-title').textContent = myQuestions[level]['title'];
      // 每一關的底圖改變
      var img = document.createElement('img');
      img.src = myQuestions[level]['imgSrc'];
      document.querySelector('#level-base').appendChild(img);
      enterNextStage();
    });
  };

  function play() {
    // 答題按鈕的listener
    for (var i = 0; i < questionBtns.length; ++i) {
      var btn = questionBtns[i];
      // 比對按的按鈕是不是正確的答案
      btn.addEventListener('click', function (e) {
        // data-order存取按鈕的位置
        if (parseInt(e.target.getAttribute('data-order')) === myQuestions[level]['answer']) {
          ++score;
        }
        level = level + 1;
        timerStart();
        // 關卡數有五關
        if (level >= 5) {
          clearInterval(intervalID);
          enterNextStage();
          return;
        }
        document.querySelector('#question').classList.add('display-none');
        document.addEventListener('mousemove', mousemoveHandler);
        // questionBtns的文字改變
        for (var k = 0; k < questionBtns.length; ++k) {
          var changedBtn = questionBtns[k];
          changedBtn.textContent = myQuestions[level]['questions'][k];
        }
        // question的文字改變
        document.querySelector('#question-title').textContent = myQuestions[level]['title'];
        // 每一關的底圖改變
        document.querySelector('#level-base').removeChild(document.querySelector('#level-base').firstChild);
        var img = document.createElement('img');
        img.src = myQuestions[level]['imgSrc'];
        document.querySelector('#level-base').appendChild(img);
      });
    }
  };

  function end() {

    document.querySelector('#surround').classList.add('display-none');
    document.querySelector('#timer').classList.add('display-none');
    document.querySelector('#question').classList.add('display-none');
    document.removeEventListener('mousemove', mousemoveHandler);
    document.body.style.cursor = 'default';
    document.querySelector('#level-base').classList.add('display-none');
    document.querySelector('#finish').classList.remove('display-none');
    // 結束畫面的底圖根據所得分數而改變
    var img = document.createElement('img');
    console.log(score)
    img.src = myVictory[score]['imgSrc'];
    console.log(img.src)
    document.querySelector('#finish-victory-screen').appendChild(img);
  };


  function timerStart() {
    // 每一關的秒數
    document.querySelector('#timer').textContent = 15;
    intervalID = setInterval(function () {
      if (!oneSecondPass(document.querySelector('#timer').textContent)) {
        // 回傳false, 則我們clear interval
        clearInterval(intervalID);
      }
    }, 1000);
  }

  function oneSecondPass(second) {
      second = second - 1;
      document.querySelector('#timer').textContent = second;
      if (second <= 0) {
        document.querySelector('#question').classList.remove('display-none');
        document.removeEventListener('mousemove', mousemoveHandler);
        document.body.style.cursor = 'default';
        document.querySelector('#surround').style.left = '0px';
        document.querySelector('#surround').style.top = '0px';
        return false;
        // false 表示該暫停interval
      }
      return true;
      // true 表示interval繼續
    }
    // surround跟著滑鼠一起移動
  function mousemoveHandler(e) {
    var x = e.clientX;
    var y = e.clientY;
    //  console.log(x, y);

    var squareSide = 3000;
    var recHeight = 100;
    var div = document.querySelector('#surround');
    div.classList.add('margin-0');
    document.body.style.cursor = 'none';
    div.style.left = x - squareSide - recHeight / 2 + 'px';
    div.style.top = y - squareSide - recHeight / 2 + 'px';
  };

  return {
    init: function () {
      stages[stage]();

    }

  };
}());
///////////

FATYU.init();