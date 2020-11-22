const MAX_KEY = "maxKey"
const TIMES = "times"
const FROM_BACK = "from_back"

let itemsList = document.querySelector("#itemsList")
let storage = window.localStorage


document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    loadItemList()
    enableSwipe()
    informUserForSwipe()
    fixKeysInStorage(itemsList)
}


/**
 * This function loads data from the storage and adds them to a list.
 * Also, when the user clicks on one of the items it should be deleted from the list.
 * So this function adds a click listener to do that.
 */
function loadItemList(){
    let maxKey = parseInt(storage.getItem(MAX_KEY))

    //Adds children to the item list. Uses the storage key as value and the storage value as text.
    if (maxKey != null) {
        for (let i = 0; i < maxKey; i++) {
            let item = storage.getItem(i.toString())
            if (item != null) {
                let li = document.createElement('li')
                li.className = "list-group-item"
                li.value = i
                li.innerHTML = item
                itemsList.append(li)
                console.log(li)
            }
        }
    }

    //Adds a listener to check when the children of the list are clicked using event delegation.
    itemsList.onclick = (evt) => {
        let li = evt.target
        let key = li.value.toString()
        itemsList.removeChild(li)
        storage.removeItem(key)
    }

}


/**
 * When the user swipes left he is navigated to a new screen where he can add items.
 */
function enableSwipe(){
    let hammertime = new Hammer(document.querySelector("body"))
    hammertime.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL})

    hammertime.on('swipeleft', () => {
        window.location = "addItem/addItem.html"
    })
}


/**
 * This functions informs the user that he can add an item by swiping left.
 * This only happens if the user has opened the app 3 times or less.
 * Otherwise it just increases the number of times the user has opened the app.
 * Also nothing happens if this function is called because the user navigated back from the "Add Item" screen.
 */
function informUserForSwipe(){
    let fromBack = parseInt(storage.getItem(FROM_BACK))
    if (fromBack === 1){
        storage.setItem(FROM_BACK, "0")
        return
    }

    let timesInApp = parseInt(storage.getItem(TIMES))

    if (timesInApp === null || isNaN(timesInApp)){
        storage.setItem(TIMES, "0")
        window.plugins.toast.showLongBottom("You can add a new item by swiping left.")
    }
    else{
        if (timesInApp < 2){
            window.plugins.toast.showLongBottom("You can add a new item by swiping left.")
        }
        storage.setItem(TIMES, (++timesInApp).toString())
    }
}

