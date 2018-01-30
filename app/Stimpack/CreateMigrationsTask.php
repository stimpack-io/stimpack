<?php

namespace App\Stimpack;
use Illuminate\Support\Facades\Log;

class CreateMigrationsTask implements Task
{

    public function __construct($tasks) {
        $this->tasks = $tasks;
    }

    public function perform() {        
        $migrationName = date("Y_m_d_hms",time()) . "create_" . $model->table . "_table.php";        
        $path = database_path("migrations/" . $migrationName) ;        
        file_put_contents($path, $model->migration);
        $message = "Created migration at '" . $path . "'";
        return $message;                
        return "Migrations successfully created!";
    }
}

//$this->tasks[0]["id"]