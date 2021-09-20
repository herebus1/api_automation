/// <reference types="Cypress" />

describe('get user from api', () =>{

    let accessToken = 'Bearer 64d70925cf4cfc95c9de224f579bc504f60656284c6bc4634cf4c72edbed6755'

    it('get user', ()=> {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v1/users',
            Headers: {
                'authorization' : accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.meta.pagination.limit).to.eq(20)
        })
    })

    it('get user by id', ()=> {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v1/users/2229',
            Headers: {
                'authorization' : accessToken
            }
        }).then((response)=>{
            expect(response.status).to.eq(200)
            expect(response.body.data.name).to.contain('Tenali')
        })
    })
})