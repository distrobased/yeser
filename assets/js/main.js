
// Particle background
const canvas = document.createElement('canvas');
canvas.id='bgCanvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');
let w=canvas.width=window.innerWidth;
let h=canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight;});

class Particle{constructor(){this.x=Math.random()*w;this.y=Math.random()*h;this.size=Math.random()*3+1;this.speedX=Math.random()*1-0.5;this.speedY=Math.random()*1-0.5;this.color='rgba(0,119,255,'+Math.random()+')';}update(){this.x+=this.speedX;this.y+=this.speedY;if(this.x<0)this.x=w;if(this.x>w)this.x=0;if(this.y<0)this.y=h;if(this.y>h)this.y=0;}draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fillStyle=this.color;ctx.fill();}}
let particles=[];for(let i=0;i<100;i++){particles.push(new Particle());}
function animate(){ctx.clearRect(0,0,w,h);particles.forEach(p=>{p.update();p.draw();});requestAnimationFrame(animate);}animate();
document.addEventListener('mousemove',(e)=>{for(let i=0;i<2;i++){let p=new Particle();p.x=e.clientX;p.y=e.clientY;p.size=Math.random()*4+1;particles.push(p);}});

// Guest username system
let guestName=prompt('Enter your clan guest username:','Guest');
if(!guestName) guestName='Guest';
document.title='POG-RocketLeague Clan - '+guestName;

// Forum posts
let posts=[{title:'Welcome to POG!',content:'Introduce yourself here.'}];
function renderPosts(){const list=document.getElementById('forumList');if(!list)return;list.innerHTML='';posts.forEach(p=>{const li=document.createElement('li');li.innerHTML='<strong>'+p.title+'</strong>: '+p.content;list.appendChild(li);});}
function createPost(){const title=document.getElementById('postTitle').value;const content=document.getElementById('postContent').value;if(title && content){posts.push({title,content});renderPosts();}}
renderPosts();

// Tryouts submissions
let tryouts=[];
function submitTryout(){const name=document.getElementById('name').value;const rlname=document.getElementById('rlname').value;const rank=document.getElementById('rank').value;if(name && rlname && rank){tryouts.push({name,rlname,rank});renderTryouts();}}
function renderTryouts(){const list=document.getElementById('tryoutList');if(!list)return;list.innerHTML='';tryouts.forEach(t=>{const li=document.createElement('li');li.textContent=t.name+' ('+t.rlname+') - Rank: '+t.rank;list.appendChild(li);});}
