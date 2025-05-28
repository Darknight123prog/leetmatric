document.addEventListener("DOMContentLoaded",function(){
let userinput=document.querySelector("#input");
let search_button=document.querySelector("#input2");
let circle_easy=document.querySelector(".round1");
let circle_medium=document.querySelector(".round2");
let circle_hard=document.querySelector(".round3");
let circle_1=document.querySelectorAll(".round");
let easyLabel=document.querySelector("#easyLabel");
let mediumLabel=document.querySelector("#mediumLabel");
let hardLabel=document.querySelector("#hardLabel");
let appear1=document.querySelector("#appear1");
let appear2=document.querySelector("#appear2");
let appear3=document.querySelector("#appear3");

//fetch the user data when user click on search button

function validateUserName(username){
if(username=="")
{
alert("username is empty :)");
return false;
}
const regex=/^[a-zA-Z0-9_]+$/;
if(!regex.test(username)){
    alert("Invalid user INPUT");
    return false;
}
return true;
}
async function fetchUserData(username) {
    try {
        search_button.textContent = "Searching...";
        search_button.disabled = true;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("x-cors-api-key", "temp_c166d265e102c4c211aa342fc1bdd437");

        const graphql = JSON.stringify({
            query: `
                query userSessionProgress($username: String!) {
                  matchedUser(username: $username) {
                    submitStatsGlobal {
                      acSubmissionNum {
                        difficulty
                        count
                      }
                    }
                  }
                }
            `,
            variables: { username }
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
        };

        const response = await fetch("https://proxy.cors.sh/https://leetcode.com/graphql", requestOptions);

        if (!response.ok) {
            throw new Error("Unable to fetch user details");
        }

        const parsedData = await response.json();
        console.log("Logging data: ", parsedData);
        displayUserData(parsedData);
        
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to fetch user data.");
    } finally {
        search_button.textContent = "Search";
        search_button.disabled = false;
    }
}
function updateCircle2(solved,total,circle,label,app){
    let progressCircle=(solved/total)*100;
    label.textContent=`${solved}/${total}`;
    circle.style.setProperty("--progress-degree",`${progressCircle*3.6}deg`)
    app.textContent=`
    The medium question solved : ${solved}

                        The Total medium question exist is : ${total}
                        `
   
}
function updateCircle3(solved,total,circle,label,app){
    let progressCircle=(solved/total)*100;
    label.textContent=`  ${solved}/${total}`;
    circle.style.setProperty("--progress-degree",`${progressCircle*3.6}deg`)
    app.textContent=`The hard question solved : ${solved}

                        The Total hard question exist is : ${total}
                        `
   
}
function updateCircle1(solved,total,circle,label ,totalCount,app){
    let progressCircle=(solved/total)*100;
    label.textContent=`${solved}/${total}`;
    circle.style.setProperty("--progress-degree",`${progressCircle*3.6}deg`)
    app.textContent=`The total solved question is : ${totalCount}

                        The easy question solved : ${solved}

                        The Total easy question exist is : ${total}
                        `
   
}
function displayUserData(parsedData){
    let totalCount=parsedData.data.matchedUser.submitStatsGlobal.acSubmissionNum[0].count;
    let easyCount=parsedData.data.matchedUser.submitStatsGlobal.acSubmissionNum[1].count;
    let mediumCount=parsedData.data.matchedUser.submitStatsGlobal.acSubmissionNum[2].count;
    let hardCount=parsedData.data.matchedUser.submitStatsGlobal.acSubmissionNum[3].count;
    let totalEasy=878;
    let totalMedium=1849;
    let totalHard=838;
     updateCircle1(easyCount,totalEasy,circle_easy,easyLabel,totalCount,appear1);
       updateCircle2(mediumCount,totalMedium,circle_medium,mediumLabel,appear2);
         updateCircle3(hardCount,totalHard,circle_hard,hardLabel,appear3);

}



search_button.addEventListener("click",function(){
    let username=userinput.value;
    console.log(username);
  
   if(validateUserName(username)){
        fetchUserData(username);
   }

})


});