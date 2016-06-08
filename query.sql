create database quizDB;

use quizDB;

--tables creation--
create table questions
(questionID int NOT NULL AUTO_INCREMENT,
question text character set utf8 NOT NULL,
primary key (questionID)
)
engine = InnoDB;

create table answerOptions
(
ansID int NOT NULL AUTO_INCREMENT,
ans text character set utf8 NOT NULL,
questionID int,
primary key (ansID),
foreign key (questionID) 
        REFERENCES questions(questionID)
        ON DELETE CASCADE
)
engine = InnoDB ;



insert into questions(question) values
("Πόσα πρωταθλήματα κατέκτησε ο Michael Jordan κατά τη διάρκεια της καριέρας του;"),
("Τι ύψος έχει ο πύργος του Άιφελ;"),
("Στον 2ο παγκόσμιο πόλεμο πότε επιτέθηκε η Γερμανία στην Γαλλία;"),
("Ποιο γράμμα συμβολίζει η μια απλή τελεία στο κώδικα του Morse;"),
("Πόσα X χρωμοσώματα έχει το γυναικείο φύλο;"),
("Πως γράφετε το 2014 σε Ρωμαϊκούς αριθμούς;"),
("Τι σημαίνουν τα αρχικά CPU;"),
("Σε τι ηλικία πέθανε ο Χριστός;"),
("Οι Ολυμπιακοί Αγώνες γίνονται κάθε...;"),
("Ποια είναι η πρωτεύουσα της Ισπανίας;");

insert into answeroptions(ans, questionID) values
("6" , 1),
("300", 2);