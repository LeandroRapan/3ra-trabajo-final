
const socket = io();

let user = null;

if(!user){
    Swal.fire({
        title: '¡Welcome to chat!',
        text: 'Insert your username here',
        input: 'text',
        inputValidator: (value)=>{
            if(!value){
                return 'Your username is required'
            }
        }
    }).then((input)=>{
        user = input.value;
        socket.emit('newUser', user);
    });
};

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', () =>{
   let a= socket.emit('chat:message', {
        user,
        message: message.value
    });
    message.value = '';
    
});

socket.on('messages', (data)=>{
    actions.innerHTML = '';
    console.log(data)
    const chatRender =  data.map((msg)=>{
        return `<p><strong>${msg.user}: ${msg.message}<strong></p>`
    }).join(' ')
    output.innerHTML = chatRender
});

socket.on('newUser', (user)=>{
    Toastify({
        text: `🟢 ${user} is logged in`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        // style: {
        //     background: "linear-gradient(to right, #00b09b, #96c93d)"
        // }
        // onClick: ()=>{}
    }).showToast();
});

message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', user);
});

socket.on('chat:typing', (data)=>{
    actions.innerHTML = `<p> ${data} is writting a message... </p>`
})