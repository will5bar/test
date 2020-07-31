
### Run Server

** npm i **
** npm start **

### Run Test

** npm run test **

################################################
################################################

1* crie sessao de usuario

POST /loginUser HTTP/1.1
Host: fronttest-1--romuloroma.repl.co
Content-Type: application/json
Cache-Control: no-cache
Postman-Token: 4d1f6905-6429-01bd-fc2e-6b10b5fa4291

{
"user" : "test",
"pass" : "123"
}

########
RESPONSE
########

{
    "message": "Login Success",
    "token": "tokenID"
}

##################

2* Gere o Documento no Server , vai ficar No Folder [docs]

POST /getData HTTP/1.1
Host: fronttest-1--romuloroma.repl.co
Content-Type: application/json
authorization: tokenID
Cache-Control: no-cache
Postman-Token: 7260b3c4-e26c-d649-3a1e-5dbc06912b40

{
"user" : "test",
"nome" : "test",
"data_nacimento" : "01/01/01",
"cpf" : "123",
"rg" : "123"
}

########
RESPONSE
########


{
    "message": "ok",
    "data": "Documento Gerado pelo User -> test"
}

################################################
################################################
