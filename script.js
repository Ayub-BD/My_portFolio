(function(){
  var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
  var KEY="b_XICBiaTMdjejEmd",SERVICE="service_5h12h9e",TEMPLATE="template_jhr1wom";

  /* split hero text into letters */
  $$("[data-split]").forEach(function(el,row){
    var t=el.textContent;el.textContent="";
    t.split("").forEach(function(c,i){var s=document.createElement("span");s.className="ch";s.style.setProperty("--i",row*3+i);s.textContent=c;el.appendChild(s)});
  });

  /* marquee loop */
  var mq=$("#mq");mq.innerHTML+=mq.innerHTML+mq.innerHTML+mq.innerHTML;mq.innerHTML=mq.innerHTML;

  /* scroll reveal + count-up */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    if(!e.isIntersecting)return;e.target.classList.add("in");io.unobserve(e.target);
    $$("[data-to]",e.target).forEach(count);
  })},{threshold:.15});
  $$(".rv").forEach(function(el){io.observe(el)});
  function count(el){var to=+el.dataset.to,n=0,step=Math.max(1,Math.ceil(to/30));
    var t=setInterval(function(){n=Math.min(to,n+step);el.textContent=n;if(n>=to)clearInterval(t)},45)}

  /* rotating role */
  var words=["clean websites","Django apps","smooth animations","useful tools"],w=0,r=$("#role");
  setInterval(function(){r.classList.add("out");setTimeout(function(){w=(w+1)%words.length;r.textContent=words[w];r.classList.remove("out")},400)},2600);

  /* scroll progress */
  var bar=$("#bar");
  function prog(){var h=document.documentElement;bar.style.transform="scaleX("+(h.scrollTop/(h.scrollHeight-h.clientHeight||1))+")"}
  addEventListener("scroll",prog,{passive:true});prog();

  /* custom cursor + hero glow */
  var cur=$("#cur"),cx=0,cy=0,tx=0,ty=0;
  addEventListener("mousemove",function(e){tx=e.clientX;ty=e.clientY;
    var hero=$("#home");hero.style.setProperty("--mx",e.clientX+"px");hero.style.setProperty("--my",e.clientY+"px")});
  (function loop(){cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;cur.style.transform="translate("+cx+"px,"+cy+"px)";requestAnimationFrame(loop)})();
  $$("a,button,.ph").forEach(function(el){
    el.addEventListener("mouseenter",function(){cur.classList.add("big")});
    el.addEventListener("mouseleave",function(){cur.classList.remove("big")})});

  /* magnetic buttons */
  $$("[data-mag]").forEach(function(b){
    b.addEventListener("mousemove",function(e){var r=b.getBoundingClientRect();
      b.style.transform="translate("+(e.clientX-r.left-r.width/2)*.25+"px,"+(e.clientY-r.top-r.height/2)*.35+"px)"});
    b.addEventListener("mouseleave",function(){b.style.transform=""})});

  /* project accordion */
  $$(".pr").forEach(function(p){$(".ph2",p).addEventListener("click",function(){
    var was=p.classList.contains("open");$$(".pr.open").forEach(function(o){o.classList.remove("open")});
    if(!was)p.classList.add("open")})});

  /* contact form (EmailJS) */
  var form=$("#form"),msg=$("#msg");
  if(window.emailjs)emailjs.init({publicKey:KEY});
  form.addEventListener("submit",function(ev){
    ev.preventDefault();var btn=$("button",form);
    msg.className="";msg.textContent="Sending…";btn.disabled=true;
    var d={user_name:$("#n").value.trim(),user_email:$("#e").value.trim(),user_message:$("#m").value.trim(),
           from_name:$("#n").value.trim(),from_email:$("#e").value.trim(),message:$("#m").value.trim(),reply_to:$("#e").value.trim()};
    if(!window.emailjs){msg.textContent="Email service didn’t load. Please write to abuayubminhaz290@gmail.com";btn.disabled=false;return}
    emailjs.send(SERVICE,TEMPLATE,d).then(function(){
      msg.className="ok";msg.textContent="✓ Thank you! Your message was sent. I’ll reply soon.";form.reset();
    }).catch(function(err){
      console.error("EmailJS error:",err);
      msg.textContent="✕ Couldn’t send. Please email abuayubminhaz290@gmail.com  [Error "+((err&&err.status)||"")+": "+((err&&(err.text||err.message))||"unknown")+"]";
    }).finally(function(){btn.disabled=false});
  });
})();