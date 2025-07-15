
$(document).ready(() => {
    generateCaptcha();
  

})

var voicetext = '';
function generateCaptcha() {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');
    const captchaText = generateRandomText();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    for (let i = 0; i < captchaText.length; i++) {
        const letter = captchaText[i];
        ctx.font = `${Math.floor(Math.random() * 10) + 40}px sans-serif`;
        ctx.fillStyle = getRandomColor();

        // Position and rotation for each letter
        const x = 30 + i * 40;
        const y = 40 + Math.random() * 2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.7) * 0.7); 
        ctx.fillText(letter, 0, 0);
        ctx.restore();
    }

    // Add random lines and dots for additional complexity
    drawNoise(ctx, canvas.width, canvas.height);

    // Convert canvas to data URL and set as img src
    document.getElementById('captchaCanvas').src = canvas.toDataURL();
}

function generateRandomText() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let text = '';
    for (let i = 0; i < 5; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    voicetext = text
    $("#hidgendcode").val(text);
    return text;
}

function getRandomColor() {
    const letters = '0123456789';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random())];
    }
    return color;
}

function drawNoise(ctx, width, height) {
    for (let i = 0; i < 5; i++) {
        ctx.strokeStyle = getRandomColor();
        ctx.beginPath();
        ctx.moveTo(Math.random() * width, Math.random() * height);
        ctx.lineTo(Math.random() * width, Math.random() * height);
        ctx.stroke();
    }
    for (let i = 0; i < 50; i++) {
        ctx.fillStyle = getRandomColor();
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

async function speakText() {

    try {
        
        const response = await fetch(`/Admin/speak?text=${encodeURIComponent(voicetext)}&rate=${-3}&volume=${100}`);

        if (response.ok) {
            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
 
            const audioPlayer = document.getElementById("audioPlayer");
            audioPlayer.src = audioUrl;           
            audioPlayer.play();
        } else {
            alert("Error: " + response.statusText);
        }
    } catch (error) {
        console.error("Error generating speech:", error);
    }



}


function Forgetpassword() {
    let oldpwd = $("#oldpwd").val();
    let pwd = $("#pwd").val();
    let confpwd = $("#confpwd").val();
    let username = $("#Username").val();
    let val = Validation();
    if (val == '') {

        if (pwd == confpwd) {
            $.ajax({
                url: localStorage.getItem("Url") + '/Admin/ForgetPassword',
                type: "post",                
                data: { username: username, oldpwd: oldpwd, pwd: pwd, confpwd: confpwd },
                success: (success) => {
                    $("#oldpwd").val('');
                    $("#pwd").val(''); 
                    $("#confpwd").val('');
                    $("#Username").val('');
                    alert(success)
                },
                error: (err) => {
                    alert(err.message)
                }


            });
        }
        else
            alert('Password and Confirm Password Not Match')
    } else
        alert(val);
}

