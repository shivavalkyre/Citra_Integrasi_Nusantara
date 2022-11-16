const hitungumur = (request,response) =>{
    //collect input from HTML form and convert into date format  
    var userinput = request.params.dob; 
    console.log('userinput:',userinput)
    var new_format_date = userinput.substring(6,10) + '-' + userinput.substring(3,5) +'-' + userinput.substring(0,2)
    console.log(new_format_date)
    var dob = new Date(new_format_date);  
    console.log('dob:',dob)
    //check user provide input or not  
    if(userinput==null || userinput==''){  
        response.status(400).json({result:'harap input tanggal'})
    }   
      
    //execute if the user entered a date   
    else {  
    //extract the year, month, and date from user date input  
    var dobYear = dob.getFullYear();  
    var dobMonth = dob.getMonth();  
    var dobDate = dob.getDate();  
      
    //get the current date from the system  
    var tanggal = request.body.tanggal_saat_ini
    var format_tanggal = tanggal.substring(6,10) + '-' + tanggal.substring(3,5) +'-' + tanggal.substring(0,2)
    var now = new Date(format_tanggal);  
    //extract the year, month, and date from current date  
    var currentYear = now.getFullYear();  
    var currentMonth = now.getMonth();  
    var currentDate = now.getDate();  
      
    //declare a variable to collect the age in year, month, and days  
    var age = {};  
    var ageString = "";  
    
    //get years  
    console.log('currentYear:',currentYear)
    console.log('dob:',dobYear)

    yearAge = currentYear - dobYear;  
    console.log('yearAge:',yearAge)

    //get months  
    if (currentMonth >= dobMonth)  
      //get months when current month is greater  
      var monthAge = currentMonth - dobMonth;  
    else {  
      yearAge--;  
      var monthAge = 12 + currentMonth - dobMonth;  
    }  
  
    //get days  
    if (currentDate >= dobDate)  
      //get days when the current date is greater  
      var dateAge = currentDate - dobDate;  
    else {  
      monthAge--;  
      var dateAge = 31 + currentDate - dobDate;  
  
      if (monthAge < 0) {  
        monthAge = 11;  
        yearAge--;  
      }  
    }  
    //group the age in a single variable  
    age = {  
    years: yearAge,  
    months: monthAge,  
    days: dateAge  
    };  
        console.log('age:',age)
        
   
    var obj={"umur":{
        "year":0,
        "month":0,
        "day":0
    }}

    obj.umur.year = age.years
    obj.umur.month = age.months
    obj.umur.day = age.days
    
    response.status(200).json(obj)        
  }  
}  

module.exports.hitungumur = hitungumur;