const e=i=>a=>{const n=(a-i.phaseChangeTimestamp)/1e3,r=i.phase;switch(i.phase){case"get-ready":i=((e,t)=>{if(t>=5){const t=["LEFT","RIGHT"];return e.prompt.innerText=t[Math.floor(Math.random()*t.length)],e.phase="prompt",e}return t>=2?(e.prompt.innerText=Math.ceil(5-t).toString(),e):t<2?(e.prompt.innerText="Get ready!",e):e})(i,n);break;case"prompt":i=((e,i)=>(e.answer===e.prompt.innerText&&(t(e.result),e.phase="result"),e.answer!==e.prompt.innerText&&"waiting-for-answer"!==e.answer&&(e.result.innerHTML='\n      <img src="https://media.giphy.com/media/l4FGuhL4U2WyjdkaY/giphy.gif" alt="">\n    ',e.phase="result"),i>3&&(e.result.innerHTML='\n      <img src="https://media.giphy.com/media/znqw31I9dBDI4QJtxP/giphy.gif" alt="">\n    ',e.phase="result"),e))(i,n);break;case"result":i=((e,t)=>(t>5&&(e.result.innerHTML="",e.phase="get-ready",e.answer="waiting-for-answer"),e))(i,n)}r!==i.phase&&(i.phaseChangeTimestamp=a),window.requestAnimationFrame(e(i))},t=e=>{const t=["https://media.giphy.com/media/ZFFVNwIbjsKtP3lHYK/giphy.gif","https://media.giphy.com/media/Y4pAQv58ETJgRwoLxj/giphy.gif","https://media.giphy.com/media/xwMxmx6cTsElW/giphy.gif","https://media.giphy.com/media/gZLl9szOpgbpS/giphy.gif","https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif","https://media.giphy.com/media/jsMoSSozkPUBWodejV/giphy.gif","https://media.giphy.com/media/eeLD68y0yAzl12KUDH/giphy.gif","https://media.giphy.com/media/5sHg1xQjMV8iI/giphy.gif","https://media.giphy.com/media/gVYk3rI8YjtAI/giphy.gif"];e.innerHTML=`\n    <img src="${t[Math.floor(Math.random()*t.length)]}" alt="">\n  `};window.onload=()=>{const t={prompt:document.getElementById("prompt"),left:document.getElementById("left"),right:document.getElementById("right"),result:document.getElementById("result"),phase:"get-ready",phaseChangeTimestamp:0,answer:"waiting-for-answer"};t.prompt.innerText="Get ready!",t.left.addEventListener("click",(()=>{"waiting-for-answer"===t.answer&&"prompt"===t.phase&&(t.answer="LEFT")})),t.right.addEventListener("click",(()=>{"waiting-for-answer"===t.answer&&"prompt"===t.phase&&(t.answer="RIGHT")})),window.requestAnimationFrame(e(t))};