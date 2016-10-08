/* ========================
 *      Application Data
 * ========================*/
var questions = [
  {
    title: 'Pertanyaan Pertama Quiz',
    options: [
      'Pilihan 1',
      'Pilihan 2',
      'Pilihan 3',
      'Pilihan 4',
      'Pilihan 5'
    ],
    correctAnswer: 'Pilihan 3'
  },
  {
    title: 'Pertanyaan Kedua Quiz',
    options: [
      'Pilihan 1',
      'Pilihan 2',
      'Pilihan 3'
    ],
    correctAnswer: 'Pilihan 2'
  },
  {
    title: 'Pertanyaan Ketiga Quiz',
    options: [
      'Pilihan 1',
      'Pilihan 2'
    ],
    correctAnswer: 'Pilihan 1'
  }
];
var currentQuestion = 1;
var currentPage = '#result-page';
var userAnswers = [];

/* ================================
 *    Application Functionality
 * ================================*/
const nextQuestion = function(){
  if(currentQuestion < questions.length){
    currentQuestion++;
  }
  renderQuestion();
  renderQuestionsProgress();
  renderActionButtons();
}

const prevQuestion = function(){
  if(currentQuestion > 1){
    currentQuestion--;
  }
  renderQuestion();
  renderQuestionsProgress();
  renderActionButtons();
}

const setPage = function(page){
  currentPage = page;
  renderPage();
}

const setAnswer = function(value){
  userAnswers[currentQuestion-1] = value;
  // console.log(userAnswers);
  renderQuestion();
}

const isUserAnswer = function(option){
  return option === userAnswers[currentQuestion-1];
}

const tryAgain = function(){
  currentQuestion = 1;
  userAnswers = [];
  setPage('#quiz-page');
}

/* =============================
 *     Components Rendering
 * =============================*/
// question component
var questionTemplate = $('#question script').text();
const renderQuestion = function(){
  var questionHTML = ejs.render(questionTemplate, {
    question: {
      title: questions[currentQuestion-1].title,
      options: questions[currentQuestion-1].options,
      userAnswer: userAnswers[currentQuestion-1]
    }
  });
  $('#question').html(questionHTML);
}

// question progress component
var questionsProgressTemplate = $('#questions-progress script').text();
const renderQuestionsProgress = function(){
  var questionProgressHTML = ejs.render(questionsProgressTemplate, {
    progress: {
      currentQuestion: currentQuestion,
      totalQuestion: questions.length,
      percentage: currentQuestion/questions.length*100
    }
  });
  $('#questions-progress').html(questionProgressHTML);
}

// action buttons component
var actionButtonsTemplate = $('#action-buttons script').text();
const renderActionButtons = function(){
  var actionButtonsHTML = ejs.render(actionButtonsTemplate, {
    actionButtons: {
      prev: (currentQuestion > 1),
      finish: (currentQuestion === questions.length),
      next: (currentQuestion < questions.length)
    }
  });
  $('#action-buttons').html(actionButtonsHTML);
}

// result component
var resultTemplate = $('#result script').text();
const renderResult = function(){
  // userAnswers = ['Pilihan 2', 'Pilihan 2', 'Pilihan 2'];

  console.log(userAnswers);
  var totalCorrectAnswers = userAnswers.filter(function(answer, index){
    return answer === questions[index].correctAnswer;
  });
  totalCorrectAnswers = totalCorrectAnswers.length;
  // totalCorrectAnswers = 3;
  console.log(totalCorrectAnswers);

  var percentage = Math.round(totalCorrectAnswers/questions.length*100);

  var comment = '';
  // <50 <80 >80
  if(percentage < 50) {
    comment = 'You should try harder';
  } else if(percentage < 80) {
    comment = 'Keep trying';
  } else {
    comment = 'Great Job';
  }

  var resultHTML = ejs.render(resultTemplate, {
    result: {
      totalQuestions: questions.length,
      totalCorrectAnswers: totalCorrectAnswers,
      percentage: percentage,
      comment: comment
    }
  });
  $('#result').html(resultHTML);
}

// page component
const renderPage = function(){
  if(currentPage === '#welcome-page') {
    $('#welcome-page')
      .removeClass('hide')
      .siblings('.page')
        .addClass('hide');
  } else if(currentPage === '#quiz-page'){
    $('#quiz-page')
      .removeClass('hide')
      .siblings('.page')
        .addClass('hide');
    renderQuestion();
    renderQuestionsProgress();
    renderActionButtons();
  } else if(currentPage === '#result-page'){
    $('#result-page')
      .removeClass('hide')
      .siblings('.page')
        .addClass('hide');
    renderResult();
  }
}

/* ================================
 *     Onload Commands Execution
 * ================================*/
// currentQuestion = 2;
setPage('#welcome-page');
