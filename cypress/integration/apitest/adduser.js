/// <reference types="Cypress" />

const data = require('../../fixtures/createuser')

describe('post user request', ()=>{

    let accessToken = 'Bearer 64d70925cf4cfc95c9de224f579bc504f60656284c6bc4634cf4c72edbed6755'
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
            method:'POST',
            url:address,
            headers:{
                authorization:accessToken
            },
            body:{
                name: data.name,
                gender: data.gender,
                email: emailrandom,
                status: data.status
            }
        }).then((response)=>{
            cy.log(JSON.stringify(response))
            expect(response.status).to.eq(201)
            expect(response.body.data).has.property('email',emailrandom)
            expect(response.body.data).has.property('name',data.name)
            expect(response.body.data).has.property('status',data.status)
        })
    });
})