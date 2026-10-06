import type { Destination } from "./Destination";

const URL = "https://petrik-utazas-default-rtdb.europe-west1.firebasedatabase.app/travelDestinations.json"
const kiiratas = document.getElementById("kiiratas") as HTMLDivElement
const exportButton = document.getElementById("exportButton") as HTMLButtonElement
const exportArea = document.getElementById("exportArea") as HTMLTextAreaElement


let data: Destination[];

function init(){
  loadData()
}

async function loadData(){
  const response = await fetch(URL)
  data = await response.json() as Destination[]
  console.log(data)
  renderData()
}

function renderData(){

  kiiratas.textContent = ""
  
  data.forEach(element => {
    
    const card = document.createElement("div")
    card.classList.add("card")
    card.style = "width: 18rem"
    
    const cardImg = document.createElement("img")
    cardImg.classList.add("card-im-top")
    cardImg.src = element.img
    
  const cardBody = document.createElement("div")
  cardBody.classList.add("card-body")
  
  const cardTitle = document.createElement("h5")
  cardTitle.classList.add("card-title")
  cardTitle.textContent = element.title
  
  const cardContent = document.createElement("p")
  cardContent.classList.add("card-text")
  cardContent.textContent = element.content
  
  
  kiiratas.appendChild(card)
  card.appendChild(cardImg)
  card.appendChild(cardBody)
  cardBody.appendChild(cardTitle)
  cardBody.appendChild(cardContent)
});
}

const destinationForm = document.getElementById("destinationForm") as HTMLFormElement
const title = document.getElementById("title") as HTMLInputElement
const content = document.getElementById("content") as HTMLInputElement


destinationForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const imgRadio = document.querySelector('input[name="imgRadio"]:checked') as HTMLInputElement
  const selectedValue = imgRadio ? imgRadio.value : null;
  
  console.log(selectedValue)

  const rekord = {
    content: content.value,
    img: selectedValue!,
    title: title.value
  }
  data.push(rekord)
  renderData()
  destinationForm.reset()
})

exportButton.addEventListener("click", () => {
  exportArea.textContent = JSON.stringify(data, null, 2)
})

document.addEventListener("DOMContentLoaded", init)