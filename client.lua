function ScarNotify(msg,typ,audio,time)
	SendNUIMessage({
		action="ScarNotify->Message",
        message=msg,
        options={
            type=typ or "info",
            timeout=time or 5000,
            audio=audio or true,
        }
	});
end
exports("ScarNotify",ScarNotify)

RegisterNetEvent("ScarNotify->Trigger")
AddEventHandler("ScarNotify->Trigger",function(msg,typ,audio,time)
	return ScarNotify(msg,typ,audio,time);
end)


RegisterCommand("testo",function(source,args)
	--ScarNotify("SCAR Scripts on #1","info",true,7000);
	TriggerEvent("ScarNotify->Trigger","SCAR Scripts on #1","info",true,7000)
end,false)




--exports.freeroamR_notify:Info("Vehicle successfully spawned!");