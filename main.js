// import { response } from "express";

const studentTable = document.getElementById("StudentTable");
const maxTableSize = 10;
var tableData;
var rawData;
const BACK_END_PATH = 'http://localhost:8080/students'

function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
  }


// import {testValues} from './values.js';
// console.log(testValues);



function submitStudent() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var age = document.getElementById("age").value;
    uploadStudent(fname,lname,age);
}

function submitStudentUpdate() {
    var id = localStorage.getItem('id');
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var age = document.getElementById("age").value;
    var enrolledDate = localStorage.getItem('enrolledDate');
    updateStudent(fname,lname,age,id,enrolledDate);
    // alert("Hello World")
}

function deleteStudentTable(){
    var tbodyRef = document.getElementById('StudentTable').getElementsByTagName('tbody')[0];
    while (tbodyRef.rows.length > 0) {
        tbodyRef.deleteRow(0);
    }
}

async function getStudents(){
    
    
    let html = ""
    document.getElementById("demo").innerHTML = "Retriving Student Data"

    // var tbodyRef = document.getElementById('StudentTable').getElementsByTagName('tbody')[0];
    // while (tbodyRef.rows.length > 0) {
    //     tbodyRef.deleteRow(0);
    // }
    // deleteStudentTable();
    try{
        const url = 'http://localhost:8080/students';

        // console.log(url)
    
        const response = await fetch(url)

    
        if(!response.ok){
            throw new Error("Could not fetch resource");
        }
        else{
            const data = await response.json();
            tableData = data;
            rawData = data;
            
        
        
            if(Object.keys(data).length === 0) {
                html = 'No Students Logged'
            }
            else{
                updateTable(data);
            }
            
        }
   
        
    }
    catch(error){
        console.error(error);
        html = "Can't Connect to Table"
    }
    
    document.getElementById("demo").innerHTML = html
    // updateTable();
    // testValues.test++;
    // console.log(testValues);

    getSingleStudentFromRawData(1);
    
}


function uploadStudent(fname,lname,age){
    const apiUrl = 'http://localhost:8080/students';
    const data = {
    fname: fname,
    lname: lname,
    age: age,
    };

    const requestOptions = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json; charaset=UTF-8'
    },
    body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        localStorage.setItem("responseMessage",response.message)
    })
    // alert("Test");
}

async function deleteAllStudents(){
    
    try{
        const url = 'http://localhost:8080/students';

        // console.log(url)

        const requestOptions = {method: 'DELETE'};
    
        const response = await fetch(url,requestOptions)
    
        if(!response.ok){
            throw new Error("Could not delete all students");
        }
        
    }
    catch(error){
        console.error(error);
    }

    getStudents();

}

function updateTable(data){
    
    // console.log("Hello World");
    // deleteStudentTable()
    
    var rowsInserted = 0;
    // var firstStudent = testValues.rowsAlreadyInserted+1;
    var firstStudent = 1;

    // const dataArray = JSON.parse(data);
    
    var tbodyRef = document.getElementById('StudentTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var tableSize = tbodyRef.length

    var i = 0

    while(i<tableSize){

        // var nextStudentIndex = lastStudentIndex+i+1
        var tr = tbodyRef[i]

        if(i >= tableData.length){

            tr.id = "emptyRow"+(i+1)
            tr.getElementsByTagName('td')[0].innerHTML = ""
            tr.getElementsByTagName('td')[0].removeAttribute("class")
            tr.getElementsByTagName('td')[1].innerHTML = ""
            tr.getElementsByTagName('td')[1].removeAttribute("class")
            tr.getElementsByTagName('td')[2].innerHTML = ""
            tr.getElementsByTagName('td')[2].removeAttribute("class")
            tr.className = "row"
        }
        else{
            
            // var nextStudent = tableData[nextStudentIndex]

            tr.id = tableData[i]._id
            tr.getElementsByTagName('td')[0].innerHTML = tableData[i].fname
            tr.getElementsByTagName('td')[0].className = "rowDataFName"
            tr.getElementsByTagName('td')[1].innerHTML = tableData[i].lname
            tr.getElementsByTagName('td')[1].className = "rowDataLName"
            tr.getElementsByTagName('td')[2].innerHTML = tableData[i].age
            tr.getElementsByTagName('td')[2].className = "rowDataAge"
            tr.className = "row"
        }

        i++
    }
    // console.log(tableSize)
    // console.log(data[0])

    // var indexOfTable = 0
    // // var iteration = 0

    // for(i in data){
    //     if(indexOfTable == tableSize ) break

    //     var tr = tbodyRef[i]
    //     tr.id = data[i]._id
    //     tr.getElementsByTagName('td')[0].innerHTML = data[i].fname
    //     tr.getElementsByTagName('td')[0].className = "rowDataFName"
    //     tr.getElementsByTagName('td')[1].innerHTML = data[i].lname
    //     tr.getElementsByTagName('td')[1].className = "rowDataLName"
    //     tr.getElementsByTagName('td')[2].innerHTML = data[i].age
    //     tr.getElementsByTagName('td')[2].className = "rowDataAge"
    //     tr.className = "row";
    //     // console.log(tr)


    //     indexOfTable++
    // }
    
    
    
     // console.log(data.length);
    displayNumberOfStudents(data.length);
    // testValues.rowsAlreadyInserted = rowsInserted;
    // hooks.incrementRows(rowsInserted);

    // var lastStudent = rowsInserted;

    // document.getElementById("tableSize").innerHTML = `Students ${firstStudent}-${testValues.rowsAlreadyInserted} of ${data.length}`;

    //update change page buttons
    var prevButton = document.getElementById("prevButton")
    prevButton.className = "changePage invalid"
    var nextButton = document.getElementById("nextButton")
    if(tableData.length > 3) nextButton.className = "changePage"
    else nextButton.className = "changePage invalid"
   
    

}

function prevButton(){

    //get id of first student in table
   
    var tbodyRef = document.getElementById('StudentTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var id = tbodyRef[0].getAttribute("id")
    // console.log(id)
    
    var firstStudentIndex = tableData.findIndex(x => x._id ===id);
    // console.log(firstStudentIndex)

    if(firstStudentIndex > 0 ){

        

        //iterate over current table
            //replace current table with new data. 
            

        var i = 0

        // console.log("Test 1")
        
        while(i<tbodyRef.length){

            var previousStudentIndex = (firstStudentIndex-tbodyRef.length)+i
            var tr = tbodyRef[i]

            var previousStudent = tableData[previousStudentIndex]

            tr.id = previousStudent._id
            tr.getElementsByTagName('td')[0].innerHTML = previousStudent.fname
            tr.getElementsByTagName('td')[0].className = "rowDataFName"
            tr.getElementsByTagName('td')[1].innerHTML = previousStudent.lname
            tr.getElementsByTagName('td')[1].className = "rowDataLName"
            tr.getElementsByTagName('td')[2].innerHTML = previousStudent.age
            tr.getElementsByTagName('td')[2].className = "rowDataAge"
            tr.className = "row"

            i++
        }

        // console.log("Test 2")

        //if page has changed to previous, then next button has to be active
        var nextButton = document.getElementById("nextButton")
        nextButton.className = "changePage"

        //check if last entry in table is last student or empty row. if so, turn off next button
        id = tbodyRef[0].getAttribute("id")
        // console.log(id)
        
        firstStudentIndex = tableData.findIndex(x => x._id ===id);
        // console.log(firstStudentIndex)

        if(firstStudentIndex == 0 ){
            
            var prevButton = document.getElementById("prevButton")
            prevButton.className = "changePage invalid"
        }

    }


}

function nextButton(){

    //get id of last student in table
    // need to add check if last entry in table is blank (in that case next button won't be used)
    var tbodyRef = document.getElementById('StudentTable').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    var id = tbodyRef[tbodyRef.length-1].getAttribute("id")
    // console.log(id)
    
    var lastStudentIndex = tableData.findIndex(x => x._id ===id);
    console.log(lastStudentIndex)

    if(lastStudentIndex < tableData.length -1 && lastStudentIndex != -1){

        

        //iterate over current table
            //replace current table with new data. 
            // replace with new student data . if it finishes, replace with empty cells

        var i = 0

        // console.log("Test 1")
        
        while(i<tbodyRef.length){

            var nextStudentIndex = lastStudentIndex+i+1
            var tr = tbodyRef[i]

            if(nextStudentIndex >= tableData.length){

                tr.id = "emptyRow"+(i+1)
                tr.getElementsByTagName('td')[0].innerHTML = ""
                tr.getElementsByTagName('td')[0].removeAttribute("class")
                tr.getElementsByTagName('td')[1].innerHTML = ""
                tr.getElementsByTagName('td')[1].removeAttribute("class")
                tr.getElementsByTagName('td')[2].innerHTML = ""
                tr.getElementsByTagName('td')[2].removeAttribute("class")
                tr.className = "row"
            }
            else{
                
                var nextStudent = tableData[nextStudentIndex]

                tr.id = nextStudent._id
                tr.getElementsByTagName('td')[0].innerHTML = nextStudent.fname
                tr.getElementsByTagName('td')[0].className = "rowDataFName"
                tr.getElementsByTagName('td')[1].innerHTML = nextStudent.lname
                tr.getElementsByTagName('td')[1].className = "rowDataLName"
                tr.getElementsByTagName('td')[2].innerHTML = nextStudent.age
                tr.getElementsByTagName('td')[2].className = "rowDataAge"
                tr.className = "row"
            }

            i++
        }

        // console.log("Test 2")

        //if page has changed to next, then prev button has to be active
        var prevButton = document.getElementById("prevButton")
        prevButton.className = "changePage"

        //check if last entry in table is last student or empty row. if so, turn off next button
        id = tbodyRef[tbodyRef.length-1].getAttribute("id")
        // console.log(id)
        
        lastStudentIndex = tableData.findIndex(x => x._id ===id);
        // console.log(lastStudentIndex)

        if(lastStudentIndex == tableData.length -1 || lastStudentIndex == -1){
            var nextButton = document.getElementById("nextButton")
            nextButton.className = "changePage invalid"
        }

    }

}


// function updateTable(data){
    
//     // console.log("Hello World");
//     deleteStudentTable()
    
//     var rowsInserted = 0;
//     // var firstStudent = testValues.rowsAlreadyInserted+1;
//     var firstStudent = 1;

//     // const dataArray = JSON.parse(data);
    
//     var tbodyRef = document.getElementById('StudentTable').getElementsByTagName('tbody')[0];
//     // console.log(tbodyRef)

    
//     for(i in data){
        
//         if(maxTableSize==rowsInserted) break;
//         // console.log(data[i].name)
//         // html += `Name: ${data[i].name} Age: ${data[i].age}`+"<br />";

//         // Insert a row at the end of table
//         var tr = tbodyRef.insertRow();
//         tr.id = data[i]._id;
//         tr.classList.add("row");

//         // Insert a cell at the end of the row
//         var fname = tr.insertCell();
//         var fnameText = document.createTextNode(`${data[i].fname}`);
//         fname.appendChild(fnameText);
//         fname.classList.add("rowDataFName")

//         var lname = tr.insertCell();
//         var lnameText = document.createTextNode(`${data[i].lname}`);
//         lname.appendChild(lnameText);
//         lname.classList.add("rowDataLName")

//         var age = tr.insertCell();
//         var ageText = document.createTextNode(`${data[i].age}`);
//         age.appendChild(ageText);
//         age.classList.add("rowDataAge")

//         // rowsInserted++;

//     }

//     // console.log(data.length);
//     displayNumberOfStudents(data.length);
//     // testValues.rowsAlreadyInserted = rowsInserted;
//     // hooks.incrementRows(rowsInserted);

//     // var lastStudent = rowsInserted;

//     // document.getElementById("tableSize").innerHTML = `Students ${firstStudent}-${testValues.rowsAlreadyInserted} of ${data.length}`;

//     //update change page buttons
//     var prevButton = document.getElementById("prevButton")
//     prevButton.className = "changePage invalid"
//     var nextButton = document.getElementById("nextButton")
//     if(tableData.length > 3) nextButton.className = "changePage"
//     else nextButton.className = "changePage invalid"
    

// }


function displayNumberOfStudents(numberOfStudents){
    
    document.getElementById("test").textContent = numberOfStudents;
    // console.log("Test 0");
    // console.log(document.getElementById("test"));
    
}



async function deleteStudent(){
    var studentToDelete = studentTable.querySelector(".row.clicked")

    if(studentToDelete != null){
        console.log(studentToDelete)
        var idOfStudentToDelete = studentToDelete.id
        
        try{
            const url = 'http://localhost:8080/students'+'/'+idOfStudentToDelete

            console.log(url)

            const requestOptions = {method: 'DELETE'};
        
            const response = await fetch(url,requestOptions)
        
            if(!response.ok){
                throw new Error("Could not delete student");
            }
            else{
                console.log("Student deleted")
            }
            
        }
        catch(error){
            console.error(error);
        }

        removeDeletedStudentFromTable(idOfStudentToDelete);
    
    
        updateTable(tableData)
    }

    
}

async function updateStudentPage(){

    

    var studentToUpdate = studentTable.querySelector(".row.clicked")

    // console.log(studentToUpdate)

    // var idOfstudentToUpdate = studentToUpdate.id
    

    if(studentToUpdate != null){

        var id = studentToUpdate.getAttribute('id')
        // var fname = studentToUpdate.querySelector(".rowDataFName").innerHTML
        // var lname = studentToUpdate.querySelector(".rowDataLName").innerHTML
        // var age = studentToUpdate.querySelector(".rowDataAge").innerHTML;
        // console.log(fname)
        // console.log(lname)
        // console.log(age)
       
        window.location.href = 'updateStudent.html';

        // document.getElementById("id_original").textContent = "test1";
        // document.getElementById("fname_original").textContent = fname;
        // document.getElementById("lname_original").textContent = lname;
        // document.getElementById("age_original").textContent = age;

        // urlPath = 'fname='+fname+'&lname='+lname+'&age='+age

        // url = 'http://updateStudent.html?fname=' + encodeURIComponent(b);
        // url = 'http://127.0.0.1:5501/updateStudent.html?'+urlPath
        // console.log(url)
        // window.location.href = url

        // localStorage.setItem('id', id);
        // localStorage.setItem('fname', fname);
        // localStorage.setItem('lname', lname);
        // localStorage.setItem('age', age);

        getSingleStudentFromRawData(id);
        // console.log(localStorage.getItem('student'))

    }

  
}

function getSingleStudentFromRawData(id){
    // console.log(rawData);
    
    
    for(var i = 0; i < rawData.length; i++){
        
        if(rawData[i]._id == id){
            console.log("Student Found!")
            // localStorage.setItem('student',rawData[i]);
            localStorage.setItem('id', id);
            localStorage.setItem('fname', rawData[i].fname);
            localStorage.setItem('lname', rawData[i].lname);
            localStorage.setItem('age', rawData[i].age);
            localStorage.setItem('enrolledDate', rawData[i].enrolledDate);
            console.log(rawData[i].enrolledDate)
        }
    }
}

async function updateStudent(fname,lname,age,id,enrolledDate){

    

   
    const url = 'http://localhost:8080/students'+'/'+id

    const data = {}


    if(fname) data.fname = fname
    if(lname) data.lname = lname    
    if(age) data.age = age
    

    if(!isEmpty(data)){


        data.enrolledDate = enrolledDate

        const requestOptions = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json; charaset=UTF-8'
        },
        body: JSON.stringify(data),
        };

        // console.log(url)
        // console.log(requestOptions)

        var status;

        try{

            
            fetch(url,requestOptions)
            .then(response => {
                status = response.status
                return response.json()
            })
            .then(response => {
                console.log(response)
                if(status == 200) {
                    window.location.href = 'studentUpdated.html'
                    // var status = document.getElementById("status")
                    // status.innerHTML = response.message
                    // console.log("Test")
                }
                else document.getElementById("updateStudent_Response").innerHTML = response.message
            })
            
        }
        catch(error){
            console.error(error);
            document.getElementById("updateStudent_Response").innerHTML = "Test"
        }

        
        
    }
    

    
    // removeDeletedStudentFromTable(idOfStudentToDelete);
    
    
    // updateTable(tableData)
}

function reverseStudentData(){
    var newData = []
    var l = tableData.length-1
    for(var i = 0;i<tableData.length;i++){
        newData[i] = tableData[l-i]
    }
    tableData = newData
    console.log(tableData)
    updateTable(tableData)
}



// Student logger specifc function
function removeDeletedStudentFromTable(studentID){
    
    tableData = DeleteObjectWithSpecificKeyValue(tableData,"_id",studentID)

}

//Javascript specific function

async function apiCall(url,requestMethod) {
    try{
        
        console.log(url)

        const requestOptions = {method: requestMethod};
    
        const response = await fetch(url,requestOptions)
    
        if(!response.ok){
            throw new Error("Could not delete student");
        }
        else{
            console.log("Api Successful")
        }
        
    }
    catch(error){
        console.error(error);
    }

    return await response.json()
    
}

function DeleteObjectWithSpecificKeyValue(object,objectKey,objectValue){

    var newObject = object
    // var indexOfObject;
    var i = 0
    var objectFound = false

    while(i<object.length && !objectFound){
        for (const [key, value] of Object.entries(object[i])) {
            // console.log(`${key}: ${value}`);
            if(key == objectKey){
                if(value == objectValue){
                    // indexOfObject = i
                    objectFound = true
                    // console.log("Splicing")
                    // console.log(object[i])
                    newObject.splice(i,1)
                    // console.log("Spliced object")
                    // console.log(newObject)
                    
                }
                break;
            }
        }
        i++

    }

    return newObject

    
}

function quicksort(array,key) {
    if (array.length <= 1) {
      return array;
    }
  
    var pivot = array[0];
    
    
    var left = []; 
    var right = [];
  
    for (var i = 1; i < array.length; i++) {
        // console.log(array[i][key] +" < " +pivot[key])
        console.log(array[i][key] +" < " +pivot[key] + " : "+ (array[i][key] < pivot[key]))
        array[i][key] < pivot[key] ? left.push(array[i]) : right.push(array[i]);
    }

    console.log(left)
    console.log(right)
    
  
    return quicksort(left,key).concat(pivot, quicksort(right,key));
  };
  
  

function orderAge(){
    
    var orderAsc = document.getElementById("ascOrder").className == "order selected";
    console.log(orderAsc)

    
    tableData = quicksort(tableData,"age");
    console.log(tableData)
  
    updateTable(tableData)


}

//this throws error when loaded in create student page
document.addEventListener("click",e =>{
    if(e.target.matches(".rowDataFName") || e.target.matches(".rowDataLName") || e.target.matches(".rowDataAge")){
        var tr = e.target.parentNode
        var id = tr.id
        for (var i = 0, row; row = studentTable.rows[i]; i++){
            if(row.id != id) row.classList.remove("clicked")
        }
        tr.classList.toggle("clicked")
    }
    else if(e.target.matches(".pref") && !e.target.matches(".selected")){
        document.getElementById("orderAddedPref").className = "pref"
        document.getElementById("orderUpdatedPref").className = "pref"
        document.getElementById("firstNamePref").className = "pref"
        document.getElementById("surNamePref").className = "pref"
        document.getElementById("agePref").className = "pref"
        switch(e.target.id){
            case "orderAddedPref": break;
            case "orderUpdatedPref": break;
            case "firstNamePref": break;
            case "surNamePref":{ var a = "Bye";console.log(a)}; break;
            case "agePref": orderAge();
                // { 
                // var orderData = tableData;
                    
                // for(var i = 0;i<tableData.length;i++){
                //     orderData[i] = tableData[0]
                //     // console.log(tableData[i])
                // }
                // console.log(orderData)
                // tableData = orderData}
            break;
            
            
        }
        // tableData.sort(compare())
        updateTable(tableData);


        e.target.classList.add("selected")
        
    }
    else if(e.target.matches(".order") && !e.target.matches(".selected")){
        
        reverseStudentData()

        document.getElementById("descOrder").classList.toggle("selected")
        document.getElementById("ascOrder").classList.toggle("selected")

    }
    
})

document.addEventListener("DOMContentLoaded", function(){
    var e = document.getElementById("title").innerHTML
    if(e == "Update Student"){
               
        document.getElementById("fname_original").innerHTML = "Original First Name: " + localStorage.getItem('fname');
        document.getElementById("lname_original").innerHTML = "Original Last Name: " + localStorage.getItem('lname');
        document.getElementById("age_original").innerHTML = "Original Age: " + localStorage.getItem('age');
        
    }
    else if(e == "Create Student"){
        var response = localStorage.getItem("responseMessage")
        response = response ? response : null
        // console.log(response)
        document.getElementById("createStudent_Response").innerHTML = response
    }
    else if(e == "Document"){
        localStorage.setItem("responseMessage",null) 
        
        
        
    }
    
    });

   
