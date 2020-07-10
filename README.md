# Practical Challenge - module 4

Practical challenge from IGTI's 2020 Fullstack Bootcamp.

## Objective

To practice Git and Heroku knowledge acquired during Module 4 classes.

## About the project

```
The api manages a mongodb grades database, with basic CRUD and other functionalities.
```

## Endpoints

1. *Post* - /grade/

    - Body Params:  
    "name" : String,  
    "subject" : String,  
    "type" : String,  
    "value" : Number 

    - Return: Success message or error message

2. *Get* - /grade/

    - Query Params: Name of the student
    - Return: List of Students grades

3. *Get* - /grade/:id

    - Params: Id of the grade 
    - Return: Informations about that grade

4. *Put* - /grade/:id

    - Body Params: Id of the grade and information to be updated
    - Return: Success or error message

5. *Delete* - /grade/:id

    - Params: Id of the grade
    - Return: Success or error message

6. *Delete* - /grade/  

    *Delete all grades*
    - Body Params: None
    - Return: Success or error message
