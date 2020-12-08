
    let localStream = null;

    //webカメラのデバイスIDの一覧取得して格納しておく変数
    let cameraDeviceIds = [/* {deviceId, label} */];
    let streamname = ["myStream", "myStream2"];


    function listCamera(){
        navigator.mediaDevices.enumerateDevices()
        .then(function(deviceInfos){
            for(let i=0; i!== deviceInfos.length; ++i){
                let deviceInfo = deviceInfos[i];

                if(deviceInfo.kind == 'videoinput'){
                    let deviceId = deviceInfo.deviceId;
                    let label = deviceInfo.label;
                    cameraDeviceIds.push({deviceId, label});
                    console.log(cameraDeviceIds[i].deviceId);
                    document.getElementById('console_log').innerHTML += deviceId + " " + label + "<br>"
                    let settings = setConstraints(i);
                    getCamera(settings,streamname[i]);




                }
             }

        });
    }




    function setConstraints(num){

        let setDeviceId = cameraDeviceIds[num].deviceId;

        console.log(setDeviceId);

        let constraints ={
            audio: false,
            video: true,
            video: {deviceId:{exact:cameraDeviceIds[num].deviceId,}}
            //video: {deviceId:{exact:setDeviceId,}}
        };

        return constraints
    }


    function getCamera(constraints,streamvideo){
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
                const videoElement = document.getElementById(streamvideo)
                videoElement.srcObject = stream;
        }).catch(function (error){
            console.error('media device err',error);
            return;
        });
    }

    function funcCamera(){
        listCamera();

     //   var init = setConstraints(0);
     //   var start = getCamera(init);
    }

    function getListCamera(){

        navigator.mediaDevices.getUserMedia({audio:false,video:true});
        navigator.mediaDevices.enumerateDevices()
        .then(function(deviceInfos){
            for(let i=0; i!== deviceInfos.length; ++i){
                let deviceInfo = deviceInfos[i];
                if(deviceInfo.kind == 'videoinput'){
                    let deviceId = deviceInfo.deviceId;
                    let label = deviceInfo.label;
                    console.log(deviceId);
                    document.getElementById('console_log').innerHTML += deviceId + " " + label + "<br>"
                }
            }
        })

    }

    document.getElementById("button1").onclick = () =>{
        funcCamera();
        //getListCamera();
    }
