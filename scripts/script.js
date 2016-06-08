var divMainContent = document.getElementById("mainContent");
var buttonStartQuiz = document.getElementById("startQuiz");
var divQuestion = document.getElementById("questionSection");

var buttonPrev = document.getElementById("previous");
var buttonNext = document.getElementById("next");

var currentQuestion = 0;
var questions = new Array; //is an array that contains all the question from PHP Server;
var answers = {"1": [], "2": [], "3": [], "4": [], "5": [], "6": []};


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
    //AJAX??

    questions[0] = "Πόσα πρωταθλήματα έχει κατακτήσει ο Michael Jordan;";
    questions[1] = "Τι ύψος έχει ο πύργος του Άιφελ;";
    questions[2] = "Στον 2ο παγκόσμιο πόλεμο πότε επιτέθηκε η Γερμανία στην Γαλλία;";
    questions[3] = "Ποιο γράμμα συμβολίζει η μια απλή τελεία στο κώδικα του Morse;";
    questions[4] = "Πόσα X χρωμοσώματα έχει το γυναικείο φύλο;";
    questions[5] = "Πως γράφετε το 2014 σε Ρωμαϊκούς αριθμούς;";

    answers[0] = ["1", "2", "3", "6"]; //6
    answers[1] = ["1.5m", "1.8m", "2.4m", "3m"]; //3m
    answers[2] = ["1940", "1941", "1942", "1943"]; //1940
    answers[3] = ["A", "C", "E", "D"]; //E
    answers[4] = ["1", "2", "3", "4"]; //2
    answers[5] = ["MMXIV", "MMXV", "MMXVI", "XVI"]; //MMXIV

    showResultsToBrowser(currentQuestion+1, questions[currentQuestion], answers[currentQuestion]);
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
    setInterval(function () {
        sec++;
        document.getElementById("currentTime").innerHTML = sec;
    }, 1000)
}

buttonPrev.addEventListener("click", function () {
    if (currentQuestion!=0) {
        currentQuestion--;
        showResultsToBrowser(currentQuestion+1, questions[currentQuestion], answers[currentQuestion]);
    }
}, false);


buttonNext.addEventListener("click", function () {
    if (currentQuestion < questions.length-1) {
        currentQuestion++;
        showResultsToBrowser(currentQuestion+1, questions[currentQuestion], answers[currentQuestion]);
    }

    if (currentQuestion==5) {
        document.getElementById("done").className = "QControls";
    }
}, false);