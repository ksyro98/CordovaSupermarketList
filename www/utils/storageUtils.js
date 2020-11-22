/**
 * This function is used to fix the empty values that might occur from removing data from the storage.
 */
function fixKeysInStorage(itemsList){
    let maxKey = parseInt(storage.getItem(MAX_KEY))
    let counter = 0

    for (let i = 0; i < maxKey; i++){
        let item = storage.getItem(i.toString())
        if (item !== null){
            storage.setItem(counter.toString(), item)
            itemsList.children[counter].value = counter
            counter++
        }
    }

    for (let i = counter; i < maxKey; i++){
        storage.removeItem(i.toString())
    }

    storage.setItem(MAX_KEY, counter.toString())

}