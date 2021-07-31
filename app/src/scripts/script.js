let rooms = [
  {id: 1, title: 'Living-room', price: 13000, img: "../src/img/light/Living-Room.jpg"},
  {id: 2, title: 'Dinnig-room', price: 11000, img: "../src/img/light/Dinnig-Room.jpg"},
  {id: 2, title: 'Dinnig-room', price: 11000, img: "../src/img/light/Dinnig-Room.jpg"},
  {id: 2, title: 'Dinnig-room', price: 11000, img: "../src/img/light/Dinnig-Room.jpg"},
  {id: 2, title: 'Dinnig-room', price: 11000, img: "../src/img/light/Dinnig-Room.jpg"},
  {id: 2, title: 'Dinnig-room', price: 11000, img: "../src/img/light/Dinnig-Room.jpg"},
  {id: 2, title: 'Dinnig-room', price: 11000, img: "../src/img/light/Dinnig-Room.jpg"},
  {id: 2, title: 'Dinnig-room', price: 11000, img: "../src/img/light/Dinnig-Room.jpg"},
  {id: 3, title: 'Second-Room', price: 15000, img: "../src/img/light/Second-Room.jpeg"}
]

const toHtml = room => `
  <div class="col-xl-3 col">
    <div class="card" style="width: 18rem;">
      <img src="${room.img}" class="card-img-top img-size" alt="${room.title}">
      <div class="card-body">
        <h5 class="card-title">${room.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${room.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${room.id}">Удалить</a>
      </div>
    </div>
  </div>
`

function render() {
  // const html = rroms.map(room => toHtml(room))
  const html = rooms.map(toHtml).join('')
  document.querySelector('#rooms').innerHTML = html
}

render()

const priceModal = $.modal({
  title: 'Цена аппартаментов',
  closable: true,
  width: "400px",
  footerButtons: [
    {text: 'Close', type: 'primary', handler() {
      priceModal.close()
    }}
  ]
})

document.addEventListener('click', event => {
  event.preventDefault()
  const btnType = event.target.dataset.btn
  const id = +event.target.dataset.id
  const room = rooms.find(r => r.id === id)

  if (btnType === 'price') {
    priceModal.setContent(`
      <p> Price for ${room.title}: <strong>${room.price} rub</strong></p>
    `)
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Your delete room: <strong>${room.title}</strong></p>`
    })
    .then(() => {
      rooms = rooms.filter(r => r.id !== id)
      render()
    }).catch(() => {
      console.log('cancel');
    })

  }
})