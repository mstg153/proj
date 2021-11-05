// const hamb = document.getElementById('hamburger');
// const navBg = document.getElementById('nav-bg');
// const navList = document.getElementById('nav-list');
// // console.log(hamb.children);
// hamb.addEventListener('click', ()=> {
//     // console.log('clicked');
//     if(hamb.children[0].classList.length<=1){
//         hamb.children[0].classList.add('bar1-change');
//         hamb.children[1].classList.add('bar2-change');
//         hamb.children[2].classList.add('bar3-change');
//         navBg.classList.add('nav-bg-change');
//         setTimeout(()=>{
//             navList.classList.add('nav-list-change');
//         },300)
//     }else{
//         hamb.children[0].classList.remove('bar1-change');
//         hamb.children[1].classList.remove('bar2-change');
//         hamb.children[2].classList.remove('bar3-change');
//         navList.classList.remove('nav-list-change');
//         setTimeout(() => {
//             navBg.classList.remove('nav-bg-change')
//         },300);
        
//     }
    
// })


const hamb = document.getElementById('hamburger');
const navBg = document.getElementById('nav-bg');
const navList = document.getElementById('nav-list');
// console.log(hamb.children);
hamb.addEventListener('click', ()=> {
    // console.log('clicked');
    if(hamb.children[0].classList.length<=1){
        hamb.children[0].classList.add('bar1-change');
        hamb.children[1].classList.add('bar2-change');
        hamb.children[2].classList.add('bar3-change');
        // navBg.classList.add('nav-bg-change');
        // setTimeout(()=>{
        navList.classList.add('nav-list-change');
        // },300)
    }else{
        hamb.children[0].classList.remove('bar1-change');
        hamb.children[1].classList.remove('bar2-change');
        hamb.children[2].classList.remove('bar3-change');
        setTimeout(() => {
            navList.classList.remove('nav-list-change');
        },300);
        
    }
    
})



document.body.style.position = 'fixed';

const prel =document.getElementById('preloader');
window.addEventListener('load',() => {
    setTimeout(()=> {
        prel.parentElement.removeChild(prel.parentElement.children[0]);
        document.body.style.position = '';
    },500);
});
