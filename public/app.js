let config;
const MediaType = {
    KME: 1,
    Live: 201,
};

function toggleInstructions(elm) {
    document.getElementById('instructions-content').classList.toggle("hide");
    if(document.getElementById('instructions-content').classList.contains('hide')) {
        elm.textContent = "Show Info";
    } else {
        elm.textContent = "Hide Info";
    }
}
// Load the Chat and Collaboration application
function loadCnc(options) {
    // Load the legal text locally from the public directory 
    let legalTextUrl = "legaltext.txt";
    let translationsUrl = "en.json";
    const floaterConfig = {
        consent: {
            legalTextUrls: {
                en: legalTextUrl,
            },
            defaultSettings: {
                receiveNotifications: true,
                showFullName: true,
                allowChatAndCollaboration: true,
            },
            cookieConsent: true,
        },
        server: {
            jwtToken: options.jwt,
            serviceUrl: "https://chat.nvp1.ovp.kaltura.com/api_v3",
        },
        theme: {
            Common: {
                FontFamily: "cursive",
            },
        },
        ui: {
            toastTimeout: "5000",
            zIndex: 999,
            position: {
                right: "24px",
            },
            locale: "en",
            customTranslationUrl: translationsUrl,
            groupChat: {
                enabled: true,
                mode: "groupChat",
                reactions: true,
                reply: true,
            },
            instanceOptions: {
                enableChat: true,
                enableSearch: true,
            },
        },
        helpLink: "/help",
        moderation: {
            ui: {
                label: "",
                message: "",
                name: "",
                ctaButton: {
                    type: "chatWithExpert", //chatWithExpert = Q&A is shown moderatorOff = Q&A is hidden
                    label: "",
                },
            },
        },
        reactions: {
            mode: "on",
            sourceUrl: `https://cdnapisec.kaltura.com/p/${options.partnerId}/embedPlaykitJs/uiconf_id/${options.reactionUiConfid}`,
            endpointUrl: "https://analytics.kaltura.com",
            ks: options.ks, //This is the ks we created
        },
    };

    // Initiate and render the CNC Floater
    function initiateFloater() {
        floater =
            KalturaEventsPlatform.collaboration.widgets.floater.new(
                floaterConfig
            );
        floater.render();
    }
    initiateFloater();
}

// Fetch user data from the server
async function initData() {
    //GET user from URL

    const userId = document.getElementById('userId').value;
    const first = document.getElementById('firstname').value;
    const last = document.getElementById('lastname').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const entryId = document.getElementById('entryId').value;
    const virtualEventId = document.getElementById('virtualEventId').value;
    const setAsModerator = document.getElementById('setAsModerator').checked;

    // mandatory fields:
    if(!userId) {
        console.log("missing user ID");
        const heading = document.querySelector("#name");
        heading.textContent = "User ID is mandatory...";
        heading.classList.remove('hide');
        return;
    }

    const formInfo = {
        userId,
        firstname: first,
        lastname: last,
        company,
        email,
        entryId,
        virtualEventId,
        setAsModerator
    }
    // debugger;
    window.sessionStorage.setItem('cnc-demo-app-form-values', JSON.stringify(formInfo));
    //Fetch library data, uses the /embed-cnc/get-lib-data route
    let startTime = Date.now();
    var libData = await fetch(
        window.location.origin + "/embed-cnc/get-lib-data"
    );
    const getLibDataTime = Date.now()-startTime;
    //Load Chat and Collaboration
    startTime = Date.now();
    var data = await fetch(
        window.location.origin +
        `/embed-cnc/init-all-data?userId=${userId}&first=${first}&last=${last}&company=${company}&email=${email}&entryId=${entryId}&virtualEventId=${virtualEventId}&setAsModerator=${setAsModerator}`
    );
    const xhrMessages = data.headers.get('x-xhr-messages');
    
    const getAllDataTime = Date.now() - startTime;
    var logContent = `<ul><li>get-lib-data: ${getLibDataTime}ms</li><li>init-all-data: ${getAllDataTime}ms</li>`;
    logContent += '<li>object cache status:<ul>';
    if(xhrMessages) {
        const arr = JSON.parse(xhrMessages);
        for(let i in arr) {
            logContent += '<li>'+i+": "+arr[i]+'</li>';
        }
    }
    logContent += '</ul></li></ul>';
    document.getElementById('xhrlog').innerHTML = logContent;
    //Load Libraries for Player and CNC in header
    libconfig = await libData.json();

    config = await data.json();
    console.log("CONFIG: " + JSON.stringify(config));

    await loadLibs(libconfig);
}

// Fetch the library data
async function loadLibs(libconfig) {
    return new Promise((resolve, reject) => {
        const cncScript = document.createElement("script");
        cncScript.type = "text/javascript";
        cncScript.src = `https://cdnapisec.kaltura.com/p/${libconfig.partnerId}/embedPlaykitJs/uiconf_id/${libconfig.cncPlayerID}`;
        cncScript.onload = () => loadCnc(config);

        const playerScript = document.createElement("script");
        playerScript.type = "text/javascript";
        playerScript.src = `https://cdnapisec.kaltura.com/p/${libconfig.partnerId}/embedPlaykitJs/uiconf_id/${libconfig.uiconfid}`;
        playerScript.onload = () => loadContent(config);

        document.head.appendChild(cncScript);
        document.head.appendChild(playerScript);
    });
}

// Load the Kaltura Player
async function loadPlayer(options) {
    try {
        var kalturaPlayer = KalturaPlayer.setup({
            targetId: "player",
            provider: {
                partnerId: +options.partnerId, //partner id
                uiConfId: +options.uiconfid, //player id
                ks: +options.ks, //this is the ks we created
            },
        });
        kalturaPlayer.loadMedia({ entryId: options.entry.id });
    } catch (e) {
        console.error(e.message);
    }
}

// Load Kaltura Meeting Experience(KME)
async function loadKME(kmeDataInput) {
    try {
        var form = document.getElementById("my-form");
        for (var key in kmeDataInput.kmeRoomLti[0]) {
            var input = document.createElement("input"); // Create a new input element
            input.type = "hidden"; // Set the type attribute to "text"
            input.name = key; // Set the name attribute to the current input name
            input.value = kmeDataInput.kmeRoomLti[0][key]; // Set the value attribute to the current input value

            form.appendChild(input); // Add the input element to the form
        }

        var input1 = document.createElement("input"); // Create a new input element
        input1.type = "hidden"; // Set the type attribute to "text"
        input1.name = "oauth_signature"; // Set the name attribute to the current input name
        input1.value = kmeDataInput.kmeRoomLti[1]; // Set the value attribute to the current input value
        form.appendChild(input1); // Add the input element to the form

        form.style.display = "none";
        form.submit();
    } catch (e) {
        console.error(e.message);
    }
}

// Determines the type of media to be displayed (KME or Live) based on the configuration data. If the media type is KME, it calls the loadKME() function, and if it is Live, it calls the loadPlayer() function
async function loadContent(config) {
    console.log("******* Source type" + config.entry.sourceType);
    console.log("******* Source MediaType.Live" + MediaType.Live);
    console.log("******* Source MediaType.KME" + MediaType.KME);

    if (config.entry.type === 'room.room' && config.kmeRoomLti[0] !== null) {
        console.log("Entry type: KME");
        loadKME(config);
        var kmeContainer = document.getElementById("kme-parent-container");
        kmeContainer.classList.remove('hide');
    } else if (config.entry.mediaType === MediaType.Live || config.kmeRoomLti[0] === null) {
        console.log("Entry type: LIVE");
        console.log("Entry type: VOD");
        var parentContainer = document.getElementById("player-container");
        parentContainer.classList.remove('hide');
        loadPlayer(config);
    }

    // Determines the type of media to be displayed (KME or Live) based on the configuration data. If the media type is KME, it calls the loadKME() function, and if it is Live, it calls the loadPlayer() function
}

function onLoad() {
    const formInfoStr = window.sessionStorage.getItem('cnc-demo-app-form-values');
    if(formInfoStr) {
        const formInfo = JSON.parse(formInfoStr);
        if(formInfo) {
            for(let key in formInfo) {
                document.getElementById(key).value = formInfo[key];
                if(key === 'setAsModerator') {
                    document.getElementById(key).checked = formInfo[key];
                }
            }
        }
    }
}
onLoad();