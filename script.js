const fileInput = document.getElementById('avatar'); // input da imagem onde vai ser inserido o frame do anime
const imgContent = document.getElementById('imagemcontent') // local onde o gif vai aparecer

const imagem = document.getElementById('imagem')
const dados = [] // array onde fica os dados da busca
async function searchAnimeByVideo(file) {
  const apiUrl = 'https://api.trace.moe/search'; // busca na api
  const formData = new FormData();
  formData.append("image/png, image/jpeg", file)

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formData
  })

  const data = await response.json();
  dados.push(data.result[0]) // pega o primeiro da lista pois o primeiro é o anime mais próximo da pesquisa
  let video = data.result[0].video // variavl para receber o video
  nameclean = data.result[0].filename.replace(".mp4", "").slice(0, -24) // tratamento de nome do anime que vem da api, pois em algumas buscas vem com o nome zoado
  imagem.innerHTML = `<video src=${video} autoplay loop controls muted width='auto' height='auto' style="border-radius: 7px; box-shadow: 0px 0px 51px -3px rgba(158,46,158,1); display:flex; justify-content:center; align-items:center; border:none; background-color: #2E4F4F;">`
  //inserindo o nome e o video do anime na tela
  const animeName = document.getElementById('animeName').innerHTML = `${nameclean}`

}

imagem.addEventListener('load', (e) => { // um evento que acontece quando é carregado a imagem e tira o estilo de none do <p>
  imgContent.style.removeAttribute('style')
})

fileInput.addEventListener('change', () => { // função pra fazer a busca
  const file = fileInput.files[0];
  searchAnimeByVideo(file);
});


