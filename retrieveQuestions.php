<?php

require_once('db.php');

$db = new DB_Management("localhost", "root", "root");

$alreadyConnected = false;

if (!$alreadyConnected) {
    $alreadyConnected = $db->connectToDB();
}

$q  = $_GET['q'];

if ($q == "questionsWithAnswers") {
    $query = 'select question, ans1, ans2, ans3, ans4, ans
              from answers, correctanswers, questions
              where questions.questionID = answers.questionID
              and questions.questionID = correctanswers.questionID';

    $queryResults = $db->queryToDB($query);

        while($row = $queryResults->fetch()) {
            echo $row["question"];
        }
    } else {
        echo "0 results";
    }
?>