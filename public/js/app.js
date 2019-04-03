
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = 'From JavaScrip :0'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading the searching, Dog'
    messageTwo.textContent = ''
    const location = search.value
    const urlToFetch = '/weather?adress=' + encodeURIComponent(location);
        fetch(urlToFetch).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)
                    messageOne.textContent = data.error
                }
                else {
                    console.log({data})
                    messageOne.textContent = data.name
                    messageTwo.textContent = data.summary + 'the current temperature is ' + data.temp + '.'
                }
            })
        })
    
    console.log(location)
})