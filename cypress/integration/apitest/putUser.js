/// <reference types="Cypress" />

//const data = require('../../fixtures/createuser')

describe('post user request', ()=>{

    let accessToken = 'Bearer 79b69a660f2f15d2c8a13976ac542aa5bc1166df65a36e966b22344a90ef9412'
    let address = 'https://gorest.co.in/public/v1/users'
    let randomtext = ""
    let emailrandom = ""

    it('Create user', ()=>{

        //Code to create a random email
        var patternstring = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for(var i = 0; i < 10; i++)
            randomtext +=patternstring.charAt(Math.floor(Math.random()*patternstring.length));
            emailrandom = randomtext + '@gmail.com'
        
            cy.request({
                //Create the user
                method:'POST',
                url:address,
                headers:{
                    authorization:accessToken
                },
                body:{

                    "name":"Another test user automated",
                    "gender":"male",
                    "email":"anotheremailautomated@automation.com",
                    "status":"active"
                }
            }).then((response)=>{
                cy.log(JSON.stringify(response))
                expect(response.status).to.eq(201)
                expect(response.body.data).has.property('name', 'Another test user automated')
                expect(response.body.data).has.property('gender', 'male')
                expect(response.body.data).has.property('email', 'anotheremailautomated@automation.com')                
                expect(response.body.data).has.property('status','active')
            }).then((response) =>{
                const userId = response.body.data.id
                cy.log("User id is: " + userId)
                cy.request({
                    //update the user created
                    method: 'PUT',
                    url:address+"/"+userId,
                    headers:{
                        authorization:accessToken
                    },
                    body:{

                        "name":"Another test user updated",
                        "gender":"male",
                        "email":"updatedemail@automation.com",
                        "status":"inactive"
                    }
                }).then((response) =>{
                    expect(response.status).to.eq(200)
                    expect(response.body.data).has.property('name', 'Another test user updated')
                    expect(response.body.data).has.property('gender', 'male')
                    expect(response.body.data).has.property('email', 'updatedemail@automation.com')                
                    expect(response.body.data).has.property('status','inactive')
                })
            })
    });
})