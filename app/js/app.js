const $={};function noop(){}function _createModalFooter(e=[]){if(0===e.length)return document.createElement("div");const o=document.createElement("div");return o.classList.add("modal-footer"),e.forEach(e=>{const t=document.createElement("button");t.textContent=e.text,t.classList.add("btn"),t.classList.add(`btn-${e.type||"secondary"}`),t.onclick=e.handler||noop,o.appendChild(t)}),o}function _createModal(e){const t=document.createElement("div");t.classList.add("gmodal"),t.insertAdjacentHTML("afterbegin",`<div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${e.width||"600px"}">
          <div class="modal-header">
            <span class="modal-title"> ${e.title||"Окно"} </span>
            ${e.closable?'<span class="modal-close" data-close="true">&times;</span>':""}
          </div>
          <div class="modal-body" data-content>
            ${e.content||""}  
          </div>
        </div>
      </div>`);const o=_createModalFooter(e.footerButtons);return o.appendAfter(t.querySelector("[data-content]")),document.body.appendChild(t),t}Element.prototype.appendAfter=function(e){e.parentNode.insertBefore(this,e.nextSibling)},$.modal=function(e){const t=_createModal(e);let o=!1,n=!1;const i={open(){if(n)return console.log("modal is destroyed");o||t.classList.add("open")},close(){o=!0,t.classList.remove("open"),t.classList.add("hide"),setTimeout(()=>{t.classList.remove("hide"),o=!1,"function"==typeof e.onClose&&e.onClose()},200)}},a=e=>{e.target.dataset.close&&i.close()};return t.addEventListener("click",a),Object.assign(i,{destroy(){t.parentNode.removeChild(t),t.removeEventListener("click",a),n=!0},setContent(e){t.querySelector("[data-content]").innerHTML=e}})},$.confirm=function(n){return new Promise((e,t)=>{const o=$.modal({title:n.title,width:"400px",closable:!0,content:n.content,onClose(){o.destroy()},footerButtons:[{text:"Cancel",type:"secondary",handler(){o.close(),t()}},{text:"Delete",type:"danger",handler(){o.close(),e()}}]});setTimeout(()=>{o.open()},100)})};let rooms=[{id:1,title:"Living-room",price:13e3,img:"../src/img/light/Living-Room.jpg"},{id:2,title:"Dinnig-room",price:11e3,img:"../src/img/light/Dinnig-Room.jpg"},{id:3,title:"Second-Room",price:15e3,img:"../src/img/light/Second-Room.jpeg"}];const toHtml=e=>`
  <div class="col-xl-3 col">
    <div class="card" style="width: 18rem;">
      <img src="${e.img}" class="card-img-top img-size" alt="${e.title}">
      <div class="card-body">
        <h5 class="card-title">${e.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${e.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${e.id}">Удалить</a>
      </div>
    </div>
  </div>
`;function render(){var e=rooms.map(toHtml).join("");document.querySelector("#rooms").innerHTML=e}render();const priceModal=$.modal({title:"Цена аппартаментов",closable:!0,width:"400px",footerButtons:[{text:"Close",type:"primary",handler(){priceModal.close()}}]});document.addEventListener("click",e=>{e.preventDefault();var t=e.target.dataset.btn;const o=+e.target.dataset.id;e=rooms.find(e=>e.id===o);"price"===t?(priceModal.setContent(`
      <p> Price for ${e.title}: <strong>${e.price} rub</strong></p>
    `),priceModal.open()):"remove"===t&&$.confirm({title:"Вы уверены?",content:`<p>Your delete room: <strong>${e.title}</strong></p>`}).then(()=>{rooms=rooms.filter(e=>e.id!==o),render()}).catch(()=>{console.log("cancel")})});