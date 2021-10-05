/// <reference types="Cypress" />

describe('Check the weather information by city name', ()=>{
    it('Check the name of the city', ()=>{
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=san'
        }).then((resp) =>{
            const city = resp.body[0].title
            return city
        }).then((city) =>{
            cy.request({
                method: 'GET',
                url: 'https://www.metaweather.com/api/location/search/?query='+city
            }).then((resp)=>{
                expect(resp.status).to.eq(200)
                expect(resp.body[0]).to.have.property('title', city)
            })
        })
    })

    it('Check the name of all the cities', ()=>{
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=Am'
        }).then((resp) =>{
            const location = resp.body
            return location
        }).then((location) =>{

            for(let i = 0; i < location.length; i++){
                cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query='+location[i].title
                }).then((resp)=>{
                    expect(resp.status).to.eq(200)
                    expect(resp.body[0]).to.have.property('title', location[i].title)
                })
            }
        })
    })
})