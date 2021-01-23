import faker from 'faker'

faker.setLocale('zh_CN')

describe('添加栏目接口测试',()=>{
    it('栏目数据合法，添加成功',()=>{
        cy.login('developer', 'developer').then(res=>{
            cy.request({method: 'POST',
                url: '/prod-api/channel?id=&name=' + faker.name.firstName()+faker.name.lastName()+'&code=' + faker.random.number(),
                headers:{Authorization: res.body.data.token}})
                .its('body')
                .should('contain',{"code":20000,"msg":"成功","data":null,"success":true})
        })
    })
    it('栏目名称为空，编码不为空，提示400错误和名称不能为空',()=>{
        cy.login('developer', 'developer').then(res=>{
            cy.request({method: 'POST',
                url: '/prod-api/channel?id=&name=&code='+faker.random.number(),
                headers:{Authorization: res.body.data.token}, failOnStatusCode: false}).then(res=>{
                    expect(res.body.errors[0].defaultMessage).to.contain('名称不能为空')
                    expect(res.body.status).to.equal(400)
            })
        })
    })

    it('栏目名称不为空，编码为空，提示400错误和编码不能为空',()=>{
        cy.login('developer', 'developer').then(res=>{
            cy.request({method: 'POST',
                url: '/prod-api/channel?id=&name='+faker.name.firstName()+faker.name.lastName()+'&code=',
                headers:{Authorization: res.body.data.token}, failOnStatusCode: false}).then(res=>{
                    expect(res.body.errors[0].defaultMessage).to.contain('编码不能为空')
                    expect(res.body.status).to.equal(400)
            })
        })
    })
})
//
// let s = {
// 	"timestamp": "2021-01-23 13:20:36",
// 	"status": 400,
// 	"error": "Bad Request",
// 	"errors": [{
// 		"codes": ["NotBlank.channel.name", "NotBlank.name", "NotBlank.java.lang.String", "NotBlank"],
// 		"arguments": [{
// 			"codes": ["channel.name", "name"],
// 			"arguments": null,
// 			"defaultMessage": "name",
// 			"code": "name"
// 		}],
// 		"defaultMessage": "名称不能为空",
// 		"objectName": "channel",
// 		"field": "name",
// 		"rejectedValue": "",
// 		"bindingFailure": false,
// 		"code": "NotBlank"
// 	}, {
// 		"codes": ["NotBlank.channel.code", "NotBlank.code", "NotBlank.java.lang.String", "NotBlank"],
// 		"arguments": [{
// 			"codes": ["channel.code", "code"],
// 			"arguments": null,
// 			"defaultMessage": "code",
// 			"code": "code"
// 		}],
// 		"defaultMessage": "编码不能为空",
// 		"objectName": "channel",
// 		"field": "code",
// 		"rejectedValue": "",
// 		"bindingFailure": false,
// 		"code": "NotBlank"
// 	}],
// 	"message": "Validation failed for object='channel'. Error count: 2",
// 	"path": "/flash-api/channel"
// }
