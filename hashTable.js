class HashTable {
    constructor(x,y) {
      this.list = new Array(x)
      this.size = x
      this.loadFactor = y
      this.count = 0
    }

    getHashKey(k){
        return k % this.size
    }
  
    put(k,v){
        if ((this.count/this.size) > this.loadFactor) {
            this.resize()
        }
        let key = this.getHashKey(k)
        var value = this.list[key]
        value = value == null ? [[k,v]] : value.concat([[k,v]])
        this.list[key] = value
        this.count++
    }

    get(k){
        let key = this.getHashKey(k)
        let indexList = this.list[key]
        if (indexList == undefined) {
            return null
        }
        for (const element of indexList) {
            if (element[0] == k) {
                return element[1]
            }
        }
        return null
    }
  
    delete(k){
        let key = this.getHashKey(k)
        let indexList = this.list[key]
        if (indexList == undefined) {
            return false
        }
        var x = -1
        for (let i = 0; i < indexList.length; i++) {
            const element = indexList[i];
            if (element[0] == k) {
                x = i
            }
        }
        if (x > -1) {
            let newList = indexList.splice(x, 1)
            this.list[key] = newList
            return true
        } else {
            return false
        }
    }

    resize(){
        let newSize = this.size * 2
        let newHastTable = new HashTable(newSize,this.loadFactor)

        this.list.forEach(element => {
            if (element != undefined) {
                element.forEach(x => {
                    newHastTable.put(x[0],x[1])
                });
            }
        });

        this.list = newHastTable.list
        this.size = newHastTable.size
        this.count =  newHastTable.count
    }

}

const util = require('util');


const initialSize = 1
const loadFactor  = 0.75
let m = new HashTable(initialSize,loadFactor)
m.put(1, 1)
m.put(2, 2)

console.time('with very few records in the map')
console.log(m.get(-1))
console.timeEnd('with very few records in the map')

for (x = 0; x < 1200; x++) {
  m.put(x, x*2)
}

// console.log(m)
console.log(util.inspect(m,{ showHidden: true, depth: null, colors: true }))

console.time('with lots of records in the map')
console.log(m.get(-1))
console.timeEnd('with lots of records in the map')