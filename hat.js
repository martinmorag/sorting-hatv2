const TEAMS = {
    GRYFFINDOR : {id:1,color:'#740001',name:'rojo'},
    SLYTHERIN : {id:2,color:'#1A472A',name:'verde'}
}

let CURRENT_TEAM = null;
class Hat {

    static THOUGHTS = [
        {
            thought: "¿Te estas sintiendo valiente?",
            team: TEAMS.GRYFFINDOR
        },
        {
            thought : "Pareces ser alguien travieso",
            team : TEAMS.GRYFFINDOR
        },
        {
            thought : "¡Un sinfin de ambiciones!",
            team : TEAMS.SLYTHERIN
        },
        {
            thought : "Tu orgullo puede ser tu caida",
            team : TEAMS.SLYTHERIN
        }
    ]



    intialize(scene = null, animation = "none", ANIM_TIME = 1){
        let hat = document.getElementById("hat-main");
        let hatBackground = document.getElementById("hat-bg");
        let hatEyeLeft = document.getElementById("hat-eye-left")
        let hatEyeRight = document.getElementById("hat-eye-right")
        let hatMouth = document.getElementById("hat-mouth")

        hat.style.display="block";
        hatBackground.style.animation=`${ANIM_TIME}s initialize-hat forwards`;
        hatEyeLeft.style.animation=`${ANIM_TIME}s  initialize-hat-eyes forwards 1s`;
        hatEyeRight.style.animation=`${ANIM_TIME}s  initialize-hat-eyes forwards 1s`;
        hatMouth.style.animation=`${ANIM_TIME}s  initialize-hat-mouth forwards 1.5s`;

        if(scene != null && animation !="none"){
            scene.style.animation = animation;
        }
    } 
    
    float(ANIM_TIME) {
        let hat = document.getElementById("hat-main");
        hat.style.animation= `hat-floating ${ANIM_TIME}s ease-in-out infinite`
    }

    stopThinking(){
        setTimeout(()=>this.displayBadgePage(CURRENT_TEAM.color,CURRENT_TEAM.name),2000);
    }

    displayBadgePage(color,name){
        let badgePage = document.getElementsByTagName('body')[0];
        badgePage.style.animation= "";
        badgePage.style.backgroundColor='';
        document.getElementById('landing').innerHTML= ``;
        let badgeDiv = document.createElement('div');
        badgeDiv.setAttribute("class","badge-div");
        badgeDiv.style.backgroundColor=color;
        // Badge Image
        let badgeImage = document.createElement('img');
        badgeImage.src = `./pics/${name}.png`;
        badgeImage.setAttribute("class","badge-image");
        badgeImage.innerHTML=`<img src="https://github.com/prafulla-codes/sorting-hat/blob/master/pics/hufflepuff_badge.gif" width="200px">
        </img>`;
        badgeDiv.appendChild(badgeImage);
        // Congratulations Text
        let congratsText = document.createElement('h2');
        congratsText.setAttribute("class","congrats hp");
        congratsText.innerText = '¡Felicidades!';
        badgeDiv.appendChild(congratsText);
        // Badge Alert
        let badgeAlert = document.createElement('div');
        badgeAlert.setAttribute("class","badge-alert");
        badgeAlert.innerHTML =`<p> Has sido sorteado para ser del <strong>${name.charAt(0).toUpperCase() + name.slice(1)} </p>`
        // badge
        let badge = document.createElement('img');
        badge.src =`./pics/${name}_badge.png`;
        badge.title = 'Copy to clipboard';
        badge.setAttribute("class","badge");
        // Copied
        let copied = document.createElement('div');
        copied.setAttribute('class','copied');
        copied.innerText = ` Copied !`;

        badge.addEventListener('click',(e)=>{
            badgeAlert.appendChild(copied);

               
               document.getElementsByClassName("badge")[0].title = "Copied!";
            navigator.clipboard.writeText(`<img src="https://github.com/prafulla-codes/sorting-hat/blob/master/pics/${name}_badge.gif" width="200px">`);
        })
        badge.addEventListener('mouseout',()=>  {
            badgeAlert.removeChild(copied);
      
            badge.title = 'Copy to clipboard' });
        badgeAlert.appendChild(badge);
        badgeDiv.appendChild(badgeAlert)
        
        

        badgeDiv.style.animation= "0.5s appear1 3s forwards";

        document.getElementById('landing').appendChild(badgeDiv);
        document.documentElement.style.setProperty("--page-color", color);

        badgePage.style.animation = "3s appear forwards ease";
        setTimeout(()=> {
            confetti.start()
            confetti.speed = 1;
        },3000);
    }
    
    assignHouse(name) {
        // List of names that are assigned to Gryffindor
        const gryffindorNames = ['alicia araujo', 'priscila araujo', 'elias rotta', 'maria luz de moura', 'lara burnika', 'ramiro burnika'];
    
        // Convert the name to lowercase for case-insensitive comparison
        const lowerCaseName = name.toLowerCase();
    
        // Check if the name is in the list of Gryffindor names
        if (gryffindorNames.includes(lowerCaseName)) {
            return TEAMS.GRYFFINDOR;
        } else {
            return TEAMS.SLYTHERIN; // Assign to Slytherin if the name is not in the list
        }
    }



    think(ANIM_TIME, name){
        let thoughts = document.getElementById("thoughts");
        let randomThought = this.getRandomThought();
        thoughts.innerText = Hat.THOUGHTS[randomThought].thought;
        CURRENT_TEAM = this.assignHouse(name);
        thoughts.style.animation = `type ${ANIM_TIME}s forwards`;
        setTimeout(()=> this.think(ANIM_TIME),ANIM_TIME*1000)
        
    }
    

    getRandomThought() {
    let min = 0;
    let max = Hat.THOUGHTS.length - 1;
    let index = Math.floor(Math.random() * (max - min + 1) + min); 
    return index;
    }
      

}