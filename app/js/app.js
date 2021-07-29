const $={};function _createModal(t){const e=document.createElement("div");return e.classList.add("gmodal"),e.insertAdjacentHTML("afterbegin",`<div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${t.width||"600px"}">
          <div class="modal-header">
            <span class="modal-title"> ${t.title||"Окно"} </span>
            ${t.closable?'<span class="modal-close" data-close="true">&times;</span>':""}
          </div>
          <div class="modal-body" data-content>
            ${t.content||""}  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">OK</button>
            <button type="button" class="btn btn-secondary" data-close="true">Cancel</button>
          </div>
        </div>
      </div>`),document.body.appendChild(e),e}$.modal=function(t){const e=_createModal(t);let o=!1,s=!1;const a={open(){if(s)return console.log("modal is destroyed");o||e.classList.add("open")},close(){o=!0,e.classList.remove("open"),e.classList.add("hide"),setTimeout(()=>{e.classList.remove("hide"),o=!1},200)}},d=t=>{t.target.dataset.close&&a.close()};return e.addEventListener("click",d),Object.assign(a,{destroy(){e.parentNode.removeChild(e),e.removeEventListener("click",d),s=!0},setContent(t){e.querySelector("[data-content]").innerHTML=t}})};let modal=$.modal({title:"Almaz Gimaev",closable:!0,content:`
    <h4> Modal is working </h4>
    <p> Lorem ispum dolor sit. </p>
  `,width:"400px"});