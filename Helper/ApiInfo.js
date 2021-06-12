var getAllApiInfo=function()
{
var candidateRequestPayload={
    name:"candidateName",
    email:"candiateEmail"
}

var candidateApi={
    title:"Post api for adding new candidate to database",
    path:"http://localhost:3000/recruitmentApp/createCandidate",
    candidateRequestPayload
}

var testScoreRequestPayload={
    email:"candidateEmail",
    first_round:"marks",
    second_round:"marks",
    third_round:"marks"
}

var test_scoreAPi={
    title:"Post api for assigning test score",
    path:" http://localhost:3000/recruitmentApp/addScore",
    testScoreRequestPayload
}

var getAllAverageScoreApi={
    title:"Get api for getting the highest scoring candidate and averager scores per round of all candidate",
    path:"http://localhost:3000/recruitmentApp/getAllAverageScore"
}

var list_of_api=
{
    title:" **** Welcome to Recruitment Web Application **** ",
    candidateApi,
    test_scoreAPi,
    getAllAverageScoreApi
}

return list_of_api
}

module.exports.getAllApiInfo=getAllApiInfo