const studentTable = document.getElementById("StudentTable");
const maxTableSize = 10;
var tableData;
const BACK_END_PATH = 'http://localhost:8080/students'


// import {testValues} from './values.js';
// console.log(testValues);

// function othername() {
//     var fname = document.getElementById("fname").value;
//     var lname = document.getElementById("lname").value;
//     var age = document.getElementById("age").value;
//     uploadStudent(fname,lname,age);
// }


function submitStudent() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var age = document.getElementById("age").value;
    uploadStudent(fname,lname,age);
}

function submitStudentUpdate() {
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var age = document.getElementById("age").value;
    var id = document.getElementById("id_original").innerHTML;
    console.log(fname)
    console.log(lname)
    console.log(age)
    console.log(id)
    updateStudent(fname,lname,age,id);
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
    .then(response => {
    if (!response.ok) {
        // throw new Error('Network response was not ok');
        alert("Network response was not ok");
    }
    return response.json();
    })
    .catch(error => {
    console.error

    ('Error:', error);
    });
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
    console.log(document.getElementById("test"));
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
    }

    
    removeDeletedStudentFromTable(idOfStudentToDelete);
    
    
    updateTable(tableData)
}

async function updateStudentPage(){

    

    var studentToUpdate = studentTable.querySelector(".row.clicked")

    // console.log(studentToUpdate)

    // var idOfstudentToUpdate = studentToUpdate.id
    

    if(studentToUpdate != null){

        var id = studentToUpdate.getAttribute('id')
        var fname = studentToUpdate.querySelector(".rowDataFName")
        var lname = studentToUpdate.querySelector(".rowDataLName")
        var age = studentToUpdate.querySelector(".rowDataAge").innerHTML;
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

        localStorage.setItem('id', id);
        localStorage.setItem('fname', fname);
        localStorage.setItem('lname', lname);
        localStorage.setItem('age', age);

    }

  
}

async function updateStudent(fname,lname,age,idOfstudentToUpdate){

    

   
    const url = 'http://localhost:8080/students'+'/'+idOfstudentToUpdate

    const data = {
        fname: fname,
        lname: lname,
        age: age,
        };
    
        const requestOptions = {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json; charaset=UTF-8'
        },
        body: JSON.stringify(data),
        };

        console.log(url)
        console.log(requestOptions)

        try{

        const response = await fetch(url,requestOptions)
        
            if(!response.ok){
                throw new Error("Could not update student");
            }
            else{
                console.log("Student updated")
            }
            
        }
        catch(error){
            console.error(error);
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
    var e = document.getElementById("update_student_title")
    if(e != null){
        document.getElementById("id_original").innerHTML = localStorage.getItem('id')
        document.getElementById("fname_original").innerHTML = localStorage.getItem('fname');
        document.getElementById("lname_original").innerHTML = localStorage.getItem('lname');
        document.getElementById("age_original").innerHTML = localStorage.getItem('age');
        
    }
    
    });
