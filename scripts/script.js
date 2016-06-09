var divMainContent = document.getElementById("mainContent");
var buttonStartQuiz = document.getElementById("startQuiz");
var divQuestion = document.getElementById("questionSection");

var buttonPrev = document.getElementById("previous");
var buttonNext = document.getElementById("next");
var buttonDone = document.getElementById("done");

var currentQuestion = 0;
var timer;

var userChoices = new Array(6);
var q_a = new Array(6);

var Q_A = function() {
    this.question;
    this.answers;
    this.correctAnswer;
    this.setQuestion = function (question) {
        this.question = question;
    }
    this.setAnswers = function (answers) {
        this.answers = answers;
    }
    this.setCorrectAnswer = function (correctAns) {
        this.correctAnswer = correctAns;
    }
    this.getCorrectAnswer = function () {
        return this.correctAnswer;
    }
};


buttonStartQuiz.addEventListener("click", function () {
    divMainContent.className = "";
    divQuestion.className = "active";

    document.getElementById("startQuizLabel").setAttribute("hidden", "");
    document.getElementById("startQuiz").setAttribute("hidden", "");

    var info = document.getElementsByClassName("QInfoHidden");
    info[0].className = "QInfo";
    info[0].className = "QInfo";

    buttonNext.className = "QControls";

    //document.getElementById("footer").className = "afterStart";

    sendRequestToPhpServer();
    initTimer();
}, false);

function sendRequestToPhpServer() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            var rows = xhttp.responseText.split("$$");
            rows.pop();

            for (var row = 0; row < rows.length; row++) {
                var rowProperties = rows[row].split("#$");

                var ansProperties = rowProperties[1].split("#");
                var correctAns = ansProperties.pop();

                var question = rowProperties[0];
                var answers =  ansProperties;
                setQ_A_Properties(row, {question: question, answers: answers, correctAnswer: correctAns});
            }
            showResultsToBrowser(currentQuestion+1, q_a[currentQuestion].question, q_a[currentQuestion].answers);
        }
    }

    xhttp.open("GET", "retrieveQuestions.php?q=questionsWithAnswers", true);
    xhttp.send();
}

function setQ_A_Properties(q, options) {
    if (q_a[q] == undefined) {
        q_a[q] = new Q_A();
    }

    //check params
    if (options.question) {
        q_a[q].setQuestion(options.question);
    }
    if (options.answers) {
        q_a[q].setAnswers(options.answers);
    }
    if (options.correctAnswer) {
        q_a[q].setCorrectAnswer(options.correctAnswer);
    }
}

function showResultsToBrowser(num, question, answersText) {
    document.getElementById("questionN").innerHTML = num;
    document.getElementById("currentQuestion").innerHTML = question;

    var span1 = document.getElementById("ans1");
    var span2 = document.getElementById("ans2");
    var span3 = document.getElementById("ans3");
    var span4 = document.getElementById("ans4");

    var spans = [span1, span2, span3, span4];

    for (var ans = 0; ans < answersText.length; ans++) {
        spans[ans].innerHTML = answersText[ans];
    }
}

function initTimer() {
    var sec = 0;
    timer = setInterval(function () {
        sec++;
        document.getElementById("currentTime").innerHTML = sec;
    }, 1000)
}

function checkUserAnswer(current) {
    var inputs = document.querySelectorAll("input[type=\"radio\"]");

    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            userChoices[current] = inputs[i].value;
            inputs[i].checked = false;
        }
    }
}

buttonPrev.addEventListener("click", function () {
    if (currentQuestion!=0) {
        currentQuestion--;
        showResultsToBrowser(currentQuestion+1, q_a[currentQuestion].question, q_a[currentQuestion].answers);
    }


    if (currentQuestion == 0) {
        buttonPrev.className = "hiddenControls";
    }

    if (currentQuestion<5) {
        buttonNext.className = "QControls";
    }
}, false);


buttonNext.addEventListener("click", function () {
    if (currentQuestion < q_a.length-1) {
        checkUserAnswer(currentQuestion);
        currentQuestion++;
        showResultsToBrowser(currentQuestion+1, q_a[currentQuestion].question, q_a[currentQuestion].answers);
    }

    if (currentQuestion == 1) {
        buttonPrev.className = "QControls";
    }

    if (currentQuestion==5) {
        buttonNext.className = "hiddenControls";
        document.getElementById("done").className = "QControls";
    }
}, false);

buttonDone.addEventListener("click", function () {
    clearInterval(timer);
    checkUserAnswer(currentQuestion);

    var correctAnswersNUM = 0;
    buttonPrev.style.visibility = "collapse";
    buttonNext.style.visibility = "collapse";
    buttonDone.innerHTML = "Παίξε ξανά!";

    buttonDone.addEventListener("click", function () {
        location.host = location.host;
    })

    for (var ans = 0; ans < userChoices.length; ans++) {
        if (userChoices[ans] == q_a[ans].getCorrectAnswer()) {
            correctAnswersNUM++;
        }
    }

    var info = document.createElement("p");

    var spanNumber = document.createElement("span");
    spanNumber.innerHTML = correctAnswersNUM;
    spanNumber.style.color = "red";

    info.innerHTML = "Απάντησες σωστά ";
    info.appendChild(spanNumber);
    var remainingText = document.createElement("span");

    var percentage = ((correctAnswersNUM/q_a.length)*100).toFixed(2);

    remainingText.innerHTML = " από τις "+ q_a.length + " (" + percentage + "%) σε χρόνο " + document.getElementById("currentTime").innerHTML+ " δευτερόλεπτα!";
    info.appendChild(remainingText);
    info.style.margin = "0";

    divQuestion.innerHTML = "";
    divQuestion.className = "result";
    divQuestion.appendChild(info);

    var img = document.createElement("img");
    if (percentage >= 50) {
        img.setAttribute("src", "images/happy.png");
    }
    else {
        img.setAttribute("src", "images/sad.png")
    }

    divQuestion.appendChild(img);
}, false);