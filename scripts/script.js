var divMainContent = document.getElementById("mainContent");
var buttonStartQuiz = document.getElementById("startQuiz");
var divQuestion = document.getElementById("questionSection");

var buttonPrev = document.getElementById("previous");
var buttonNext = document.getElementById("next");
var buttonDone = document.getElementById("done");

var currentQuestion = 0;
var timer;

var userChoices = new Array(6);
var q_a;

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

    buttonPrev.className = "QControls";
    buttonNext.className = "QControls";

    //document.getElementById("footer").className = "afterStart";

    sendRequestToPhpServer();
    initTimer();
}, false);

function sendRequestToPhpServer() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            var resp = xhttp.responseText;
            alert(resp);
            // questions = xhttp.responseText.split("%");
            //
            // var currentAnswers = questions[questions.length-1].split("#");
            // questions.pop();
            // for (var ans = 0; ans < 3; ans++) {
            //     answers[ans] = currentAnswers[ans].split(",");
            // }
            //
            // showResultsToBrowser(currentQuestion+1, questions[currentQuestion], answers[currentQuestion]);
        }
    }

    xhttp.open("GET", "retrieveQuestions.php?q=questionsWithAnswers", true);
    xhttp.send();

    // var q_a1 = new Q_A("Πόσα πρωταθλήματα έχει κατακτήσει ο Michael Jordan;", ["1", "2", "3", "6"], 4);
    // var q_a2 = new Q_A("Τι ύψος έχει ο πύργος του Άιφελ;", ["1.5m", "1.8m", "2.4m", "3m"], 4);
    // var q_a3 = new Q_A("Στον 2ο παγκόσμιο πόλεμο πότε επιτέθηκε η Γερμανία στην Γαλλία;", ["1940", "1941", "1942", "1943"], 1);
    // var q_a4 = new Q_A("Ποιο γράμμα συμβολίζει η μια απλή τελεία στο κώδικα του Morse;", ["A", "C", "E", "D"], 3);
    // var q_a5 = new Q_A("Πόσα X χρωμοσώματα έχει το γυναικείο φύλο;", ["1", "2", "3", "4"], 2);
    // var q_a6 = new Q_A("Πως γράφετε το 2014 σε Ρωμαϊκούς αριθμούς;", ["MMXIV", "MMXV", "MMXVI", "XVI"], 1);
    // q_a = [q_a1, q_a2, q_a3, q_a4, q_a5, q_a6];
    //
    // showResultsToBrowser(currentQuestion+1, q_a[currentQuestion].question, q_a[currentQuestion].answers);
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
}, false);


buttonNext.addEventListener("click", function () {
    if (currentQuestion < q_a.length-1) {
        checkUserAnswer(currentQuestion);
        currentQuestion++;
        showResultsToBrowser(currentQuestion+1, q_a[currentQuestion].question, q_a[currentQuestion].answers);
    }

    if (currentQuestion==5) {
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
    remainingText.innerHTML = " σε χρόνο " + document.getElementById("currentTime").innerHTML+ " δευτερόλεπτα!";
    info.appendChild(remainingText);
    info.style.margin = "0";

    divQuestion.innerHTML = "";
    divQuestion.className = "result";
    divQuestion.appendChild(info);
}, false);