create database quizDB;

use quizDB;

--tables' creation--
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




--values in tables--
insert into questions(question) values
("Πόσα πρωταθλήματα κατέκτησε ο Michael Jordan κατά τη διάρκεια της καριέρας του;"),
("Τι ύψος έχει ο πύργος του Άιφελ;");

insert into answeroptions(ans, questionID) values
("6" , 1),
("300", 2);