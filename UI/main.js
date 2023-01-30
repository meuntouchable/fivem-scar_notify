const template=document.querySelector("#notification-template");
const imageTemplate=document.querySelector("#notification-image-template");
const container=document.querySelector("#ScarNotifyMain");
const audio=document.createElement("audio");

const icons={
    "info": "fa-info-circle", 
    "warn": "fa-exclamation-triangle",
    "error": "fa-bug",
}
const titles={
    "info": "Information",
    "warn": "Warning", 
    "error": "Error",
}

container.setAttribute("style","top: 200pt");


window.addEventListener("message",function(datas){
	const action=datas.data.action;
	
	if(action=="ScarNotify->Message"){
		const options=datas.data.options || {};
		const message=datas.data.message || "Null content";
	
		AddNotification(message,options);
	}
});




function AddNotification(message,options){
	const timeout=options.timeout;
	const type=options.type;
	const useAudio=options.audio;
	
	const node=options.image?CreateImageNotificationNode(message,type,options.image):CreateNotificationNode(message,type);
	container.prepend(node);
	node.classList.add("--"+type);
	
	if (useAudio && audio.paused){
		audio.setAttribute("src","sounds/"+type+".mp3");
		audio.volume=0.2;
		audio.currentTime=0;
		audio.play();
	}
	
	setTimeout(()=>{
		node.classList.add("slide-out");
		setTimeout(()=>{
			container.removeChild(node);
		},500);
	}, timeout);
}

function CreateNotificationNode(message,type){
    var clone=template.content.firstElementChild.cloneNode(true);
    var p=clone.querySelector("p");
    p.textContent=message;
	
    const icon=clone.querySelector("i");
    icon.classList.add(icons[type]);
	
    const title=clone.querySelector("h1");
    title.textContent=titles[type];
	
    return clone;
}

/*function CreateImageNotificationNode(message, type, b64Image) {
    var clone = imageTemplate.content.firstElementChild.cloneNode(true);
    var p = clone.querySelector("p");
    p.textContent = message;
    const img = clone.querySelector("img");
    img.setAttribute("src", b64Image);
    const title = clone.querySelector("h1");
    title.textContent = titles[type]
    return clone;
}*/