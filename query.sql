create database quizDB;

use quizDB;

create table questions
(questionID int NOT NULL AUTO_INCREMENT,
question text character set utf8 NOT NULL,
primary key (questionID)
)
engine = InnoDB;

create table answers
(
ansID int NOT NULL AUTO_INCREMENT,
ans1 text character set utf8 NOT NULL,
ans2 text character set utf8 NOT NULL,
ans3 text character set utf8 NOT NULL,
ans4 text character set utf8 NOT NULL,
questionID int not null,
primary key (ansID),
foreign key (questionID) 
        REFERENCES questions(questionID)
        ON DELETE CASCADE
)
engine = InnoDB ;

create table correctAnswers
(
correctAnsID int NOT NULL AUTO_INCREMENT,
ans int not null,
questionID int not null,
primary key (correctAnsID),
foreign key (questionID) 
        REFERENCES questions(questionID)
        ON DELETE CASCADE
)
engine = InnoDB ;

insert into questions(question) values
("Πόσα πρωταθλήματα κατέκτησε ο Michael Jordan κατά τη διάρκεια της καριέρας του;"),
("Τι ύψος έχει ο πύργος του Άιφελ;"),
("Τι σημαίνει η λέξη καινός;"),
("Σε ποια εταιρία ανήκει το σλόγκαν 'Connecting People';"),
("Πόσα X χρωμοσώματα έχει το γυναικείο φύλο;"),
("Πως γράφετε το 2014 σε Ρωμαϊκούς αριθμούς;"),
("Σε ποια γλώσσα 'ayuda' σημαίνει βοήθεια;"),
("Οι ιστοσελίδες ποιας χώρας έχουν την κατάληξη .cl;"),
("Οι Ολυμπιακοί Αγώνες γίνονται κάθε...;"),
("Ποια είναι η πρωτεύουσα της Ρουμανίας;");

insert into answers(ans1, ans2, ans3, ans4, questionID) values
("1", "3", "5", "6" , 1),
("150", "195", "220", "300", 2),
("Άδειος", "Λιτός", "Νέος", "Γεμάτος", 3),
("Samsung", "Alcatel", "Nokia", "Apple", 4),
("1", "2", "3", "4", 5),
("MMXIV", "MMXVI", "MMXVI", "XVI", 6),
("Ιταλικά", "Ισπανικά", "Ρουμάνικα", "Γαλλικά", 7),
("Κολομβίας", "Καναδά", "Χιλής", "Ελβετίας", 8),
("1", "2", "3", "4", 9),
("Βουδαπέστη", "Βουκουρέστι", "Βρυξέλλες", "Ιάσιο", 10);

insert into correctanswers(ans, questionID) values
(4, 1),
(4, 2),
(3, 3),
(3, 4),
(2, 5),
(1, 6),
(2, 7),
(3, 8),
(4, 9),
(2, 10);

#query for js

select question, ans1, ans2, ans3, ans4, ans
from answers, correctanswers, questions
where questions.questionID = answers.questionID
and questions.questionID = correctanswers.questionID;
