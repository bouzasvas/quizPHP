<?php

require_once('db.php');

$db = new DB_Management("localhost", "root", "");

$alreadyConnected = false;

$q  = $_GET['q'];

if ($q == "questionsWithAnswers") {
    if (!$alreadyConnected) {
        $alreadyConnected = $db->connectToDB();
    }
    $query = 'select question, ans1, ans2, ans3, ans4, ans
              from answers, correctanswers, questions
              where questions.questionID = answers.questionID
              and questions.questionID = correctanswers.questionID
              order by rand()
              limit 6';

    $queryResults = $db->queryToDB($query);

        while($row = $queryResults->fetch()) {
            echo $row["question"]."#$".$row["ans1"]."#".$row["ans2"]."#".$row["ans3"]."#".$row["ans4"]."#".$row["ans"]."$$";
        }
    $db->closeConnection();
    }
?>