import locator from './locator.json'
export default class BannerPage{
    visit(){
        cy.visit('/')
        cy.loginweb('developer','developer')
        this.bannermanager.click({force:true})
    }
    get bannermanager(){
        return cy.get(locator.banner.bannermanager)
    }
    get addbutton(){
        return cy.get(locator.banner.addbutton)
    }


}