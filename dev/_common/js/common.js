const banner = document.getElementById('banner')
const size = {w:banner.offsetWidth, h:banner.offsetHeight}

gsap.defaults({
  ease: "power2.out"
});



const READ = {
	t1: 3.5,
	t2a: 2.8,
	t2b: 2.3,
}



const {w, h} = size




	
function init(){	
	const tl = new TimelineMax({onComplete:()=>{
		if(document.getElementById("legalBtn")){			
			TweenLite.set("#legalBtn", {display:"block"})
			document.getElementById("banner").addEventListener('mouseover', mouseover)
		}
	}})
	tl.set(".frame1", {opacity:1})
	return tl
}


let data_ = {}


function start(data){
	
	data_ = {manScale:true, olgY:80, ball_time:.5, ball_ease:4.5, ...data}
	console.log(data_);
	const {manScale, olgY, ball_time, ball_ease} = data_
	
	const tl = init()
	
	if(manScale){
		gsap.to(".man", {scale:1.07, duration:5})	
	}
	


	logo()	
	
	tl.from(".t1", {duration:.3, opacity:0, x:"-=100"}, "+=.75")
	tl.add("t1", `+=${READ.t1}`)
	tl.to([".t1", ".man"], {duration:.2, opacity:0}, "t1")

	

	tl.add(hand(), "+=.3")



	const tlHideOLG = new TimelineMax()
	tlHideOLG.set(['#triangleRed'], {attr:{points:"5.76 240.21 17.19 240.26 55.04 240.26 5.76 240.21"}, duration: 0.01, delay:0});
	tlHideOLG.set('#GL_playForOntario', {opacity:0})
	tlHideOLG.set(['.group-O'], { y:olgY})
	tlHideOLG.set(['.group-L'], { y:olgY})
	tlHideOLG.set(['.group-G'], { y:olgY})

	tl.add(tlHideOLG, "-=.7")
	
	tl.add("test")
	tl.to("#GL_blueWedge", {y:olgY, duration:.13}, "-=.4")
	tl.to("#GL_blueWedge", {y:0, duration:.5})	
	tl.add(logo(), "-=.4")

	
	tl.set(".frame2", {opacity:1}, "-=.8")
	tl.from(".txt-get-started", {duration:.5, opacity:0}, "-=.8")
	tl.from(".olg-ca", {duration:.3, opacity:0}, "+=.5")	
	tl.from(['#EF_cta'], 0.5, {opacity:0, y:"+=20'", onComplete:mouseover}, '+=.25');

	// tl.play("test")
}


function hand(){
	var tl = new TimelineMax()	
	const obj = size.w>size.h ? {y:`+=${size.h}`}: {x:`+=${size.w}`}

	tl.from(".hand", {duration:.3, ...obj }, 0)
	tl.from(".t2a", {duration:.4,  x:`-=${size.w}`}, 0)
	tl.to(".t2a", {duration:.3, opacity:0, x:"+=100"}, `+=${READ.t2a}`)
	tl.from(".t2b", {duration:.4, opacity:0, x:"-=100"})

	tl.add("t2", `+=${READ.t2b}`)
	tl.to(".t2b", {duration:.45, opacity:0, ...obj}, "t2")
	tl.to(".hand", {duration:.35, opacity:0, ...obj}, "t2")
	return tl
}

function mouseover(e){	
	gsap.to(['#EF_cta'], {duration:.4,yoyo:true, scale:.535, repeat:1,
		onComplete:
		function () {
			// viewport.addEventListener('mouseover', mouseover)
		}
	});
}

function logo1(){

}

function logo(){
	const {manScale, olgY, ball_time, ball_ease} = data_

	gsap.set([ '#GL_logo' ], {y:-6, x:1});
	var tl = new TimelineMax()
	tl.set('#GL_playForOntario', {opacity:0})
	tl.set(['.group-O'], { y:olgY})
	tl.set(['.group-L'], { y:olgY})
	tl.set(['.group-G'], { y:olgY})	
	tl.set(['#triangleRed'], {attr:{points:"5.76 240.21 17.19 240.26 55.04 240.26 5.76 240.21"}, duration: 0.01, delay:0});
	tl.to('#triangleRed', {delay:0.25, duration:.5, attr:{points:"17.19 202.41 17.19 240.26 55.04 240.26 17.19 202.41"}});

	var tlBall = new TimelineMax()
	
	

	tlBall.to(['.group-O'], {duration:ball_time, y:0, ease:`back.out(${ball_ease})`})
	tlBall.to(['.group-L'], {duration:ball_time, y:0, ease:`back.out(${ball_ease})`}, '-=0.45')
	tlBall.to(['.group-G'], {duration:ball_time, y:0, ease:`back.out(${ball_ease})`}, '-=0.45')
	
	tlBall.to(['#GL_playForOntario'], {opacity:1, duration:0.4, }, .6)
	tl.add(tlBall, .2)
		
	return tl

}





export {size, init, start}



