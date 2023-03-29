<?php 

// config : 
$PDOHost = 'localhost'; 
$PDODatabase = 'db_name'; 
$PDOUser = 'admin'; 
$PDOPasswd = ''; 



class Database {
    public static function connect() {
        global $PDOHost; 
        global $PDODatabase; 
        global $PDOUser; 
        global $PDOPasswd; 
    
        $PDOOptions = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
    
        try {
            return new PDO("mysql:host=$PDOHost;dbname=$PDODatabase;charset=utf8", $PDOUser, $PDOPasswd, $PDOOptions);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    public static function get($select_query) {
        $conn = Database::connect(); 
        $connQuery = $conn -> prepare($select_query); 
        $connQuery -> execute(); 
        $result = $connQuery -> fetchAll(); 
        return $result;
    }

    public static function execute($_query) {
        $conn = Database::connect(); 
        $connQuery = $conn -> prepare($_query); 
        $result = $connQuery -> execute();
        return $result;
    }

    public static function delete($delete_query) {
        $conn = Database::connect(); 
        $connQuery = $conn -> prepare($delete_query); 
        $result = $connQuery -> execute();
        return $result;
    }

    public static function insert($insert_query) {
        $conn = Database::connect(); 
        $connQuery = $conn -> prepare($insert_query); 
        $result = $connQuery -> execute();
        return $result;
    }
}