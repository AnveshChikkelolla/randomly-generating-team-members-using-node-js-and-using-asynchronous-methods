let prompt = require('prompt');
let properties = [
    {
      name: 'filename', 
      validator: /^[a-zA-Z].*.json/,                                                //it takes valid jsonfile
	  required: true,
      warning: '!!!!!!!!!!please enter valid json file!!!!!! '
    },
    {
      name: 'number_of_teams',
      validator: /^[1-9]/,                                                     //it takes valid number of teams
	  required: true,
	  warning: '!!!!!!please enter valid NO OF TEAMS !!!!!!! '
	  
    }
  ];
prompt.start();
prompt.get(properties, function (err, result)
{
    if (err) { return onErr(err); }
    console.log('------you entered---- ');
    console.log('  Filename: ' + result.filename);                                  
    console.log('  number_of_teams: ' + result.number_of_teams);
	let input_file=result.filename;
	let no_of_teams=result.number_of_teams;
	const fs = require('fs');
	fs.exists(input_file, function(exists) {                                  //it checks for  given json file exist or not
    console.log("file exists ? " + exists);
	if(exists==true)
	 {     
       fs.readFile(input_file, 'utf8', function (err,data) {                  // here we are reading a file 
       if (err) {
       return console.log(err);}
       //console.log(data);
       let parsed = JSON.parse(data);
       let student_data = [];
       for(let x in parsed.students){
       student_data.push(parsed.students[x]); }
       let shuffle = require('shuffle-array');
       shuffle(student_data);
	   console.log(student_data);
       let i=0;
       let count=0;
       while(student_data[i++]!=null){                                      //it finds the number of students in a given json file 
	   count++;
	   }
       console.log("no of students in given file are "+count);
       let total_students=count;
       let min_studentsofeachteam=parseInt(total_students/no_of_teams);
       if(min_studentsofeachteam!=0)                                        //it checks for number of teams exceeded the number of students
	   {                                    
             let exta_members=total_students%no_of_teams;  
             let z=0;
             let team_no=1;
 	         let sizeofteam=1;
             let temp=0;
	         fs.writeFile('output.txt',"team no:"+team_no+"\n",function(err){                     //if it is a first time , open a file in wirte mode otherwise open in append mode  to keep update a outfile    
             if(err) throw err;});
	         team_no++;
	         while (z<total_students)                                        //it runs upto number of  students written into output file  
			             {               
		                     if(sizeofteam<=min_studentsofeachteam){
								 fs.appendFile('output.txt',JSON.stringify(student_data[z])+"\n",function(err){
									 if(err) throw err;
                                  });
									  z++;                                  //z is used to calculate how many members taken from Total Student
			                      sizeofteam++;
		                       }
		                    else if(exta_members!=0){                      //'else if' loop used to add the extra members to each team.it adds only one member to some teams only 
							      fs.appendFile('output.txt',JSON.stringify(student_data[z])+"\n",function(err){
                                  if(err) throw err;
                                  });
			    			    z++;
							    exta_members--;
			                    temp=exta_members;
			                    exta_members=0;
			                   }
							   else {
			                      fs.appendFile('output.txt',"team no:"+team_no+"\n",function(err){
                                  if(err) throw err;
                                  });
                                team_no++;
			                   sizeofteam=1;
			                   exta_members=temp;	  
	                         }
		  
		 
		  
	                     }
  
	   }
	   else{
         console.log("\n we could not find because  number of teams exceeded the number of students ");}
    });	
   }
   else{
		console.log("!!!!!Sorry ...WE COULD NOT FIND ENTERED FILE!!!!!!!!!");
	   }
  });
	
});
			 
			  