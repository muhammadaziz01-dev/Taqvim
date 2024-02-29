"use stric"

const drapBtn = document.querySelector('#drapdount-btn');

const drapBtn2 = document.querySelector('#drapdount-btn2');


const drapdunt =document.querySelector('#drapdount');
const taim = document.querySelector('#taim');
const sana =document.querySelector('#sana');
const sana2 =document.querySelector('#sana2');
const haftaKuni = document.querySelector('#hafta-kuni');
const hijriSana = document.querySelector('#hijri-sana');
const region = document.querySelector('#region');
const chengRegion = document.querySelector('#cheng-region');
const chengRegion2 = document.querySelector('#cheng-region2');

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
    "Andijon",
    "Namangan",
    "Jizzax",
    "Buxoro",
 ];

 const URL ="https://islomapi.uz/api/present/day"

//Drapdunt btn ----------------
drapBtn.addEventListener('click', ()=>{
    drapdunt.classList.toggle('drapdount')
})
//-------------------------------------

//Drapdunt btn2 ----------------
drapBtn2.addEventListener('click', ()=>{
    drapdunt.classList.toggle('drapdount')
    drapBtn2.classList.toggle('open')
    
    if(drapBtn2.classList.contains('open')){
        drapBtn2.innerHTML = `<img src="./assets/imgs/close.svg" alt="icon">`
    }else{
        drapBtn2.innerHTML = `<img src="./assets/imgs/map-location.png" alt="icon">`

    }
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
    sana2.textContent=`${kun} - ${oylar[oy -1]}`;
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
        chengRegion.textContent=`${provencie[id]} shahri`;
        chengRegion2.textContent=`${provencie[id]} shahri`
        drapdunt.classList.toggle('drapdount')
        getTaim(provencie[id])
        drapBtn2.classList.toggle('open')
        drapBtn2.innerHTML = `<img src="./assets/imgs/map-location.png" alt="icon">`
    }
})
//-------------------------


//------------get taim--------
async function getTaim(region) {
    let respomns = await fetch(URL+`?region=${region}`)
    let reusalt = await respomns.json()
    console.log(reusalt);
    haftaKuni.textContent = reusalt.weekday;
    hijriSana.textContent = `${reusalt.hijri_date.day} ${reusalt.hijri_date.month} , 1444`
    
    let timesRegion= await reusalt.times;    

    tong.textContent = timesRegion.tong_saharlik;
    quyosh.textContent = timesRegion.quyosh;
    peshin.textContent = timesRegion.peshin;
    asir.textContent = timesRegion.asr;
    shom.textContent = timesRegion.shom_iftor;
    hufton.textContent = timesRegion.hufton;

}



