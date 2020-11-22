const MAX_KEY = "maxKey"
const FROM_BACK = "from_back"

let storage = window.localStorage
let itemInput = document.querySelector("#itemInput")
let okButton = document.querySelector("#okButton")
let cancelButton = document.querySelector("#cancelButton")


document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    okButton.onclick = okClicked
    cancelButton.onclick = cancelClicked

    checkIfMaxKeyIsNull()
    enableSwipeBack()

    document.addEventListener("backbutton", () => { goBack() }, false);
}


/**
 * This functions stores the typed function in memory when the "ok button" is clicked.
 * It also updates the max key in the memory and updates the user.
 */
function okClicked(){
    let item = itemInput.value
    if (item !== ""){
        let key = storage.getItem(MAX_KEY)
        storage.setItem(key, item)

        let nextKey = (parseInt(key) + 1).toString()
        storage.setItem(MAX_KEY, nextKey)

        itemInput.value = ""
        window.plugins.toast.showShortBottom("Your item was added successfully.")
    }
}


/**
 * This function returns the user back when the "cancel button" is clicked.
 */
function cancelClicked(){
    goBack()
}


/**
 * This function enables the user to go back if he swipes right.
 */
function enableSwipeBack() {
    let hammertime = new Hammer(document.querySelector("body"))
    hammertime.get('swipe').set({direction: Hammer.DIRECTION_HORIZONTAL})

    hammertime.on('swiperight', () => {
        goBack()
    })
}


/**
 * This function checks if the max key is null (usually because the user enters the app for the first time).
 * If it is, it sets it as 0.
 */
function checkIfMaxKeyIsNull() {
    if (storage.getItem(MAX_KEY) === null) {
        storage.setItem(MAX_KEY, "0")
    }
}


/**
 * This function sets sets the FROM_BACK value of storage to 1 and then navigates back to the main screen.
 * This needs to happen in order to avoid showing the toast about swiping left again when navigating back.
 */
function goBack(){
    storage.setItem(FROM_BACK, "1")
    window.history.back()
}
