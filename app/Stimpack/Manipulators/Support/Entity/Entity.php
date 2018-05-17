<?php

namespace App\Stimpack\Manipulators\Support\Entity;
use App\Stimpack\Contexts\File;
use App\Stimpack\Manipulators\Support\Attribute;
use Illuminate\Support\Str;

class Entity
{
    public function __construct($segment)
    {
        $this->segment = $segment;
        $this->title = $segment->title();
        $this->pseudoAttributes = $this->segment->pseudoAttributes();
    }

    public static function make($segment)
    {
        return new Entity($segment);
    }

    public function title()
    {
        return $this->title;
    }

    public function pseudoAttributes()
    {
        return $this->pseudoAttributes;
    }
    
    public function attributes()
    {
        return $this->attributes;
    }    

    public function singularLowerCaseTitle()
    {
        return strtolower($this->title());
    }

    public function pluralStudlyCaseTitle()
    {
        return studly_case(Str::plural(class_basename($this->title())));
    }

    public function allRelationships()
    {
        return $this->allRelationships;
    }

    public function pluralSnakeCaseTitle()
    {
        return Str::plural(Str::snake(class_basename($this->title())));
    }

    public function migrationColumns()
    {
        return $this->attributes->map(function($attribute) {
            return $attribute->migrationStatements();
        })->flatten()->implode("\n");
    }

    public function manyToManyRelationships()
    {
        $manyToManyRelationships = $this->allModels->filter(function($model) {
            
        });

        return collect([]);
    }

    public function replaceOrDestroyLine($marker, $replacements, $content)
    {
        $pattern = '/(^[^\S\n]*)' . $marker . '\n/m';
        if($replacements == "") {            
            return preg_replace($pattern, "", $content);    
        }
        //return $pattern;
        return str_block_replace($marker, $replacements, $content);

        // placeholder implementation
        //return $content;
    }

    public function getBindMethod()
    {
        return "hasMany";
    }

    public function classCase($string = false)
    {
        if(!$string) {
            return $this->title();
        }
        return studly_case($string);
    }

    public function tableSingularCase($string = false)
    {
        if(!$string) {
            return snake_case($this->title());
        }
        return snake_case($string);
        
    }
    
    public function methodSingularCase($string = false)
    {
        if(!$string) {        
            return camel_case($this->title());
        }
        return camel_case($string);
    }
    
    public function methodPluralCase($string = false)
    {
        if(!$string) {        
            return str_plural(camel_case($this->title()));
        }
        return str_plural(camel_case($string));
    }    
}