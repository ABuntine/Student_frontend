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
    deleteStudentTable();
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
    deleteStudentTable()
    
    var rowsInserted = 0;
    // var firstStudent = testValues.rowsAlreadyInserted+1;
    var firstStudent = 1;

    // const dataArray = JSON.parse(data);
    
    var tbodyRef = document.getElementById('StudentTable').getElementsByTagName('tbody')[0];
    // console.log(tbodyRef)

    
    for(i in data){
        
        if(maxTableSize==rowsInserted) break;
        // console.log(data[i].name)
        // html += `Name: ${data[i].name} Age: ${data[i].age}`+"<br />";

        // Insert a row at the end of table
        var tr = tbodyRef.insertRow();
        tr.id = data[i]._id;
        tr.classList.add("row");

        // Insert a cell at the end of the row
        var fname = tr.insertCell();
        var fnameText = document.createTextNode(`${data[i].fname}`);
        fname.appendChild(fnameText);
        fname.classList.add("rowDataFName")

        var lname = tr.insertCell();
        var lnameText = document.createTextNode(`${data[i].lname}`);
        lname.appendChild(lnameText);
        lname.classList.add("rowDataLName")

        var age = tr.insertCell();
        var ageText = document.createTextNode(`${data[i].age}`);
        age.appendChild(ageText);
        age.classList.add("rowDataAge")

        // rowsInserted++;

    }

    // console.log(data.length);
    displayNumberOfStudents(data.length);
    // testValues.rowsAlreadyInserted = rowsInserted;
    // hooks.incrementRows(rowsInserted);

    // var lastStudent = rowsInserted;

    // document.getElementById("tableSize").innerHTML = `Students ${firstStudent}-${testValues.rowsAlreadyInserted} of ${data.length}`;

}

function updateTableRows(){


    
    var data = tableData;
    
    deleteStudentTable();
    var rowsInserted = 0;
    // var firstStudent = testValues.rowsAlreadyInserted+1;
    var firstStudent = 1;

    var tbodyRef = document.getElementById('StudentTable').getElementsByTagName('tbody')[0];
    for(i = rowsAlreadyInserted;i<data.length||rowsInserted<maxTableSize;i++){
         // Insert a row at the end of table
         var tr = tbodyRef.insertRow();

         // Insert a cell at the end of the row
         var fname = tr.insertCell();
        var fnameText = document.createTextNode(`${data[i].fname}`);
        fname.appendChild(fnameText);
        fname.classList.add("rowDataFName")

        var lname = tr.insertCell();
        var lnameText = document.createTextNode(`${data[i].lname}`);
        lname.appendChild(lnameText);
        lname.classList.add("rowDataLName")

        var age = tr.insertCell();
        var ageText = document.createTextNode(`${data[i].age}`);
        age.appendChild(ageText);
        age.classList.add("rowDataAge")
 
         rowsInserted++;
    }

    
    

    // testValues.rowsAlreadyInserted+=rowsInserted;
    // var lastStudent = rowsInserted;

    // document.getElementById("tableSize").innerHTML = `Students ${firstStudent}-${testValues.rowsAlreadyInserted} of ${data.length}`;

}

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
        }

        
        
    }
    

    
    // removeDeletedStudentFromTable(idOfStudentToDelete);
    
    
    // updateTable(tableData)
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

   
