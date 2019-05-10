let output = document.getElementById('output');
let buttonFilterByLength = document.querySelector(".filterByLength")
let buttonFilterBySubstring = document.querySelector(".filterBysubstring")
var searchInput = document.getElementById('searchInput').value;
var checkBox = document.getElementById('checkbox').checked;






axios.get(`${'https://cors-anywhere.herokuapp.com/'}http://www.mrsoft.by/data.json`)
.then(response => {
        debugger
        let data = response.data.data;
        console.log(data)

        function getInput(){
            var input = {};
            input.input = document.getElementById('searchInput').value;
            input.checkbox = document.getElementById('checkbox').checked;
            return input;
        }


// check for number
        function inputIsNumber(input){
            var number = Number(input['input']);
            if(!isNaN(number) && /\S/.test(input['input'])){
                return number;
            }
            return false;
        }


// check for empty string
        function inputIsNull(input){
            debugger
            if(!input['input'] || input['input'].length=== 0){
                output.innerHTML = ' строка поиска не должна быть пустой ';
                return true;
            }
            return false;
        }




// check for length
        buttonFilterByLength.addEventListener("click",()=>{
            var input = getInput();

            if (inputIsNull(input)) {
                return;
            }
            number = inputIsNumber(input)
            if(number !== false){
                var result = '';
                for (var key in data){
                    if(number < data[key].length){
                        result += data[key]+'<br>';
                    }
                }
                output.innerHTML = result  || 'такой длинной строки нет';
            } else {
                output.innerHTML = ' нельзя искать длину по подстроке<br> попробуйте соседнюю кнопку ';
            };
        })



//check for substr
        buttonFilterBySubstring.addEventListener("click",()=>{
            var input = getInput();
            if (inputIsNull(input)) {
                return;
            }
            substr = input['input'];
            var result = '';
            if (input['checkbox']) {
                for (var key in data){
                    debugger
                    if(data[key].indexOf(substr) >= 0){
                        result += data[key]+'<br>';
                    }
                }
            } else {
                for (var key in data){
                    debugger
                    if(data[key].toUpperCase().indexOf(substr.toUpperCase()) >= 0){
                        result += data[key]+'<br>';
                    }
                }
            }
            output.innerHTML = result || 'такой подстроки не найдено';
        })
    }
)
    .catch(error=>console.log(error))