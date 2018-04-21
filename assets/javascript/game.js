//GLOBAL VARIABLES
//===========================================
var trivia = {
    initialScreen: "",
    correctCounter: 0,
    inCorrectCounter: 0,
    unAnsweredCounter: 0,
    clickSound: new Audio("assets/sounds/button-click.mp3"),
    gameHTML: "",
    questionsArray: [
                    "Which region's population uses the Internet most?", "What percentage of North American residents use the Internet?", "When was a firm concept of the Internet first proposed?", "What was the first operating system with a GUI?","What did Sergey and Larry create ?"],
    answerArray: [
                  ["Asia", "Europe", "North America"], ["78 percent", "45 percent", "32 percent"], ["1932", "1962", "1984"], ["Macintosh", "Windows", "Linux"], ["Facebook", "Google", "You tube"]],
    correctAnswers: [
                    "A. Asia", "A. 78 percent", "B. 1962", "A. Macintosh", "B. Google"],
    imageArray: [
                "<img class='center-block img-right' src='./assets/images/Asia.png'>", "<img class='center-block img-right' src='assets/images/NAmerica.png'>", "<img class='center-block img-right' src='assets/images/1962.png'>", "<img class='center-block img-right' src='assets/images/Mac.png'>", "<img class='center-block img-right' src='assets/images/Google.png'>"],
    clock: "",
    questionCounter: 0,
    timeCounter: 10,
  };
  
  
  //FUNCTIONS
  //===========================================
  function startScreen(){
    console.log('startscreen')
    //Create the start button
    trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start the Quiz!</a></p><br>";
    //Add Start button to main-area
    $(".main-area").html(trivia.initialScreen);
  };
  
  function timer(){ 
    trivia.clock = setInterval(tenSeconds, 500);
    function tenSeconds(){
      if(trivia.timeCounter === 0){
        timeOutLoss();
        clearInterval(trivia.clock);
      }
      if(trivia.timeCounter > 0) {
        trivia.timeCounter --;
      }
      $(".timer").html(trivia.timeCounter);
    }
  };
  
  function wait(){
    if(trivia.questionCounter < 4) {
      trivia.questionCounter ++;
      generateHTML();
      trivia.timeCounter = 10;
      timer();
    }
    else {
      finalScreen();
    }
  };
  
  function win(){
    trivia.correctCounter ++;
    trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
    $(".main-area").html(trivia.gameHTML);
    setTimeout(wait, 1000);
  };
  
  function loss(){
    trivia.inCorrectCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center '>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 1000);
  };
  
  function timeOutLoss(){
    trivia.unAnsweredCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 1000);
  };
  
  function finalScreen(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".main-area").html(trivia.gameHTML);
  };
  
  function resetGame(){
    trivia.questionCounter = 0;
    trivia.correctCounter = 0;
    trivia.inCorrectCounter = 0;
    trivia.unAnsweredCounter = 0;
    trivia.timeCounter = 10;
    generateHTML();
    timer();
  };
  
  function generateHTML(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>10</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]
    +"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2];
    $(".main-area").html(trivia.gameHTML);
  }
  
  
  //MAIN PROCESS
  //===========================================
  startScreen();
  
  //start-button click
  $("body").on("click", ".start-button", function(event){
      event.preventDefault();
      trivia.clickSound.play();
      generateHTML();
  
      timer();
  }); // Closes start-button click
  
  $("body").on("click", ".answer", function(event){
      trivia.clickSound.play();
    //If correct answer
    selectedAnswer = $(this).text();
      if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {
  
          clearInterval(trivia.clock);
          win();
      }
    //If incorrect ansewr
      else {
  
          clearInterval(trivia.clock);
          loss();
      }
  }); // Close .answer click
  
  //reset-button click
  $("body").on("click", ".reset-button", function(event){
      trivia.clickSound.play();
      resetGame();
  }); // Closes reset-button click