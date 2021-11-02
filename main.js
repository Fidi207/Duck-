status = "";
objecs = [];

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    console.log("Setup Ready");
}

function draw(){
    image(video, 0, 0, 400, 350);
    if(status != ""){
        modl.detect(video, URDumb);
        for(i = 0; i<objecs.length; i++){
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("num").innerHTML =  "Number Of Objects Detected : " + objecs.length; 
            nam = objecs[i].label;
            conf = floor(objecs[i].confidence * 100);
            Ob_x = objecs[i].x;
            Ob_y = objecs[i].y;
            widt = objecs[i].width;
            heig = objecs[i].height;
            if (nam == object_name) {
                video.stop();
                document.getElementById("status").innerHTML = object_name + "found!";
                speak_audio = new SpeechSynthesisUtterance(object_name + "found!");
                window.speechSynthesis.speak(speak_audio);
                fill("#FF0000");
                noFill();
                stroke("#FF0000");
                rect(Ob_x, Ob_y, widt, heig);
            }
            else {
                document.getElementById("status").innerHTML = object_name + " not found. Searching....";
            }
        }
    }
}

function loded(){
    status= true;
}


function start(){
    modl = ml5.objectDetector('cocossd', loded);
    document.getElementById("status").innerHTML = "Status: Detecting...";
    object_name = document.getElementById("object_name").value;
}

function URDumb(error, reslt){
    if (error){
        console.error(error);
    }
    else{
        objecs = reslt;
        console.log(objecs);
    }
}