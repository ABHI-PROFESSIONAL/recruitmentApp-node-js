
// == importing express library which helps to design web based application

const express= require('express')

// == importing mysql module ==
const dbConnection=require('./App Confg/Mysl_Confg')

// == importing body-parser which helps to parse the information received from client ==

const body_parser=require('body-parser');
const { getAllApiInfo } = require('./Helper/ApiInfo');

// == importing ApiInfo module ==

const apiInfo=require('./Helper/ApiInfo')

// == initializing express ==

var app=express();

// == Assigning port value on which the application will listen

app.listen(3000,(err)=>{
    if(!err)
    console.log('Recruitment App is listing on port 3000 ....')
})

// == Assigning JSON parsing to our application which will parse the incoming info in json ==

app.use(body_parser.json())

// == get api with path -> ' http://localhost:3000/recruitmentApp ' info about the application and list of api

app.get('/recruitmentApp',(req,res)=>{

      //  == retriving api info ==
    var info=apiInfo.getAllApiInfo();
   
      res.send(info)
   
})


// == post api with path -> '  http://localhost:3000/recruitmentApp/createCandidate ' accept candidate and store details into db ==

app.post('/recruitmentApp/createCandidate',(req,res)=>{
        console.log('create Candidate called')
    // == check if candidate info recieved == 
    if(Object.keys(req.body).length==0)
            return res.status(400).send('Empty message body')
    else
    {
        var candidate={
            name:req.body.name,
            email:req.body.email
        }
        dbConnection.remotemysqlConnection.query('insert into candidate set ?',candidate,(err,result)=>{
            if(err)
                return res.status(500)
           else
           return res.status(201).send('Candidate created')
        })
        
    }
       

})

// == post api with path -> 'http://localhost:3000/recruitmentApp/addScore' accept candidate and store details into db ==

app.post('/recruitmentApp/addScore',(req,res)=>{

    // == check if candidate info recieved == 
    if(Object.keys(req.body).length==0)
            return res.status(400).send('Empty message body')
    else
    {
        var test_score={
            email:req.body.email,
            first_round:req.body.first_round,
            second_round:req.body.second_round,
            third_round:req.body.third_round 
        }

        dbConnection.remotemysqlConnection.query('insert into test_score set ?',test_score,(err,result)=>{
            if(err)
                return res.status(500)
            else
                return res.status(202).send('Scores Updated Scucessfully')
            
        })
    }
       

})

// == get api with path -> '  http://localhost:3000/recruitmentApp/getAllAverageScore ' accept candidate and store details into db ==

app.get('/recruitmentApp/getAllAverageScore',(req,res)=>{

    var myRes={}
    var heighestScoreCandidate={}
    var averageScorePerRound={}

    dbConnection.remotemysqlConnection.query('select * from candidate',(err,rows)=>{
        if(err)
        return res.status(500).send('Somthing went wrong while retriving records from db')
        else
        {
           
            dbConnection.remotemysqlConnection.query(' select email,first_round+second_round+third_round Max_Marks from test_score order by first_round+second_round+third_round desc limit 0,1',(err,result1)=>
            {
                if(err)
                    return res.status(500).send('Somthing went wrong while retriving records from db')
                else
                {
                    heighestScoreCandidate={
                        title:'Heighest Scoring Candidate',
                        email:result1[0].email,
                        marks:result1[0].Max_Marks
                    }
                   myRes[0]=heighestScoreCandidate
                }
                
            })

            dbConnection.remotemysqlConnection.query('select avg(first_round) as avg_f_r,avg(second_round) as avg_s_r,avg(third_round) as avg_t_r from test_score',(err,result2)=>
            {
                if(err)
                    return res.status(500).send('Somthing went wrong while retriving records from db')
                    else
                    {
                        averageScorePerRound={
                            title:'Average score per round for all candidates',
                            first_round:result2[0].avg_f_r,
                            second_round:result2[0].avg_s_r,
                            third_round:result2[0].avg_t_r,
                        }
                      
                       myRes[1]=averageScorePerRound
                       res.send(myRes)
                      
                    }
            })
       }
        
   })


})








