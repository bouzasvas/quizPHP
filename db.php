<?php

class DB_Management {

    //Database Variables
    public $db = null;
    public $servername;
    public $username;
    public $password;

    function __construct($dbServer, $dbUser, $dbPass)
    {
        $this->servername = $dbServer;
        $this->username = $dbUser;
        $this->password = $dbPass;
    }

    function connectToDB() {
        try {
            $this->db = new PDO("mysql:host=$this->servername;dbname=quizDB", $this->username, $this->password);
            return true;
        }
        catch(PDOException $e)
        {
            return false;
        }
    }

    function queryToDB($query) {
        $queryResult = $this->db->prepare($query);
        $queryResult->execute();

        return $queryResult;
    }
}
?>