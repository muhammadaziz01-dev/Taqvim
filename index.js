"use stric"

const drapBtn = document.querySelector('#drapdount-btn');

const drapdunt =document.querySelector('#drapdount');
const taim = document.querySelector('#taim');
const sana =document.querySelector('#sana');
const region = document.querySelector('#region');
const chengRegion = document.querySelector('#cheng-region');

//-------Vaqitlat------------------
let tong = document.querySelector('.Tong');
let quyosh = document.querySelector('.Quyosh');
let peshin = document.querySelector('.Peshin');
let asir = document.querySelector('.Asr');
let shom = document.querySelector('.Shom');
let hufton = document.querySelector('.Xufton');


//----------------------Clobol vrayblis--------

const provencie = [
    "Toshkent",
    "Farg'ona",
    "Samarqand",
    "Xorazm",
    "Navoiy",
    "Qashqadaryo",
    "Surxondaryo",
    "Andijon",
    "Namangan",
    "Jizzax",
    "Buxoro",
    "Sirdaryo",
 ];

 const URL ="https://islomapi.uz/api/present/day"

//Drapdunt btn ----------------
drapBtn.addEventListener('click', ()=>{
    drapdunt.classList.toggle('drapdount')
})
//-------------------------------------



//--------render region--------------
function rendrRegion(data) {
    drapdunt.innerHTML=''
    data.forEach((el, id) => {
        let pi = document.createElement('p');
        pi.classList.add('pi')
        pi.textContent = el ;
        pi.setAttribute("data-id", `${id}`)
        drapdunt.appendChild(pi);
    });
}
rendrRegion(provencie);
//---------------------------------------


//----------Taim --------------
function getTime (){
    const  now = new Date();
    const kun = now.getDate() < 10 ? "0" + now.getDate() : now.getDate()
    const oy = now.getMonth() < 10 ? "0" + (now.getMonth()+1) : now.getMonth();
    const yil = now.getFullYear();
    const soat =now.getHours()< 10 ? "0" + now.getHours() : now.getHours()
    const minut =now.getMinutes()< 10 ? "0" + now.getMinutes() : now.getMinutes()
    const soniya =now.getSeconds()< 10 ? "0" + now.getSeconds() : now.getSeconds()
    let oylar = [
        "yanvar",
        "febral",
       "mart",
        "aprel",
        "may",
        "iyun",
        "iyul",
        "avgust",
        "sentiyabr",
        "oktiyabir",
        "noyabr",
        "decabr"
    ];
    sana.textContent=`${kun} - ${oylar[oy -1]} ${yil} - yil`;
    taim.textContent=`${soat} : ${minut} : ${soniya}`

    //return `${soat} : ${minut}:${soniya} , ${kun}.${oy}.${yil}`

}
setInterval(()=>{
   getTime()
},1000)
//-------------------------------------


//--------------------------------------
drapdunt.addEventListener("click" , (e)=>{
    
    if(e.target.classList.contains('pi')){
        let id = e.target.getAttribute('data-id');
        region.textContent=`${provencie[id]}`
        chengRegion.textContent=`${provencie[id]} shahri`
        drapdunt.classList.toggle('drapdount')
        getTaim(provencie[id])
    }
})
//-------------------------


//------------get taim--------
async function getTaim(region) {
    let respomns = await fetch(URL+`?region=${region}`)
    let reusalt = await respomns.json()
    let timesRegion= await reusalt.times    
    console.log(timesRegion);

    tong.textContent = timesRegion.tong_saharlik;
    quyosh.textContent = timesRegion.quyosh;
    peshin.textContent = timesRegion.peshin;
    asir.textContent = timesRegion.asr;
    shom.textContent = timesRegion.shom_iftor;
    hufton.textContent = timesRegion.hufton;

}



