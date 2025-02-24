let string = "krackhackallprojectbyus"

export function checkIs() {
    let local = localStorage.getItem(string)
    if(local==null){
        return false
    }
    local =JSON.parse(local)

    return local


}


export function setCurrentItem(key,value) {
    
    let local = localStorage.getItem(string)
    

    local =JSON.parse(local)
    console.log(local)
    local[key] = value

    localStorage.setItem(string,JSON.stringify(local))

    return local

}



export function doDefault() {
    let json = {
        uuid:"",
        useremail:"",
        username:""
    }
    localStorage.setItem(string,JSON.stringify(json))
}















