<!DOCTYPE html>
<html>
    <head>
        <title>Quiz: The Game</title>
        <meta charset="utf-8">
        <link rel="icon" href="images/icon.png">
        <link rel="stylesheet" type="text/css" href="styles/styles.css">
        <script type="text/javascript" src="scripts/script.js" defer></script>
    </head>
    <body>
    <div id="mainContent" class="welcome">
        <div id="header">
            <h1 id="siteTitle">Quiz: The GAME!</h1>
            <p id="startQuizLabel">Πατήστε το κουμπί για να ξεκινήσει το Quiz!</p>
            <button id="startQuiz">START</button>
        </div>
        <div id="questionSection">
            <span id="QNumber" class="QInfoHidden">Ερώτηση <span id="questionN"></span> από 6</span>
            <span id="Qtime" class="QInfoHidden">Χρόνος: <span id="currentTime"></span> δευτερόλεπτα</span><hr>
            <p id="currentQuestion">Πόσα πρωταθλήματα έχει κατακτήσει ο Michael Jordan;</p>
            <!-- Form maybe here?? -->
            <div id="answers">
                <label class="ans"><input type="radio" name="ans"><span id="ans1"></span></label>
                <label class="ans"><input type="radio" name="ans"><span id="ans2"></span></label>
                <label class="ans"><input type="radio" name="ans"><span id="ans3"></span></label>
                <label class="ans"><input type="radio" name="ans"><span id="ans4"></span></label>
            </div>
        </div>
        <button id="previous" class="hiddenControls">Προηγούμενη</button>
        <button id="next" class="hiddenControls">Επόμενη</button>
        <button id="done" class="hiddenControls">Έτοιμος</button>
    </div>
    <div id="footer">
        <p>Εκπονήθηκε στα πλαίσια του μαθήματος "Τεχνολογίες και προγραμματισμός εφαρμογών στον ιστό"
            του <a href="http://www.aueb.gr"><abbr title="Οικονομικό Πανεπιστημίο Αθηνών">ΟΠΑ</abbr></a> </p>
    </div>
    </body>
</html>