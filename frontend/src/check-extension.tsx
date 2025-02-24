


function RandomId(){
    const arr=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
    let str=''
    for (let i=0;i<60;i+=1){
        str+=getRandomElement(arr)
    }
    return str
}
export default RandomId