export const imageToBase64 = (file, callback) => {
    let reader = new FileReader()
    reader.onloadend = function () {
        callback(reader.result.split(',')[1])
    }
    reader.readAsDataURL(file)
}