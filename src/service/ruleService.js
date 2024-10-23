import { CREATE_RULE_API, EVALUATE_AGAINST_RULE, GET_RULES_API } from "./Api"



export async function createRuleService(payload) {
    const url = CREATE_RULE_API
    console.log("url",url)
    const response = await fetch(url,{
        method:"POST",
        headers : {
            'content-type':"application/json"
        },
        body:JSON.stringify(payload)
    })
    const data = await response.json()
    console.log(data)
    if(!data.Success) {
        throw new Error("Failed")
    }
    return data
}

export async function getRulesService() {
    const response = await fetch(GET_RULES_API);
    const data = await response.json()
    if(!data.Success) {
        throw new Error("Failed")
    }
    return data
}

export async function evaluateUserService(payload) {
    const url = EVALUATE_AGAINST_RULE
    const response = await fetch(url,{
        method:"POST",
        headers : {
            'content-type':"application/json"
        },
        body:JSON.stringify(payload)
    })
    const data = await response.json()
    if(!data.Success) {
        throw new Error("Failed")
    }
    return data
}