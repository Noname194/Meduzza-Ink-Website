'use strict'

//Variáveis sempre usadas

const body = document.querySelector('body');

(function init(){
  body.style.overflow = 'hidden';

  // Espera carregar a página inteira, incluindo imagens
  window.onload = () => {
    body.style.overflow = '';
    //após carregar chama a função para fechar a tela de load
    loadPageClose();

    // Identifica em qual page esta
    let bodyClass = body.getAttribute('class');
    switch(bodyClass) {
        case 'home-page':
          addAnimationHomePage();
        break;
        case 'artist-page':
          artistPageInit();
        break;
        case 'profile-page':
          profilePageInit();
        break;
        case 'about-page':
          aboutPageInit();
        break;
        case 'flash-page':
          flashPageInit();
        break;
    }


    //Função para abrir o menu pelo menu-icon
    $('.menu-icon').on('click', function() {

        //Liga e desliga o MENU
        const menu = document.querySelector('.menu-modal');
        if (menu.classList.contains('is-open')) {
            this.innerHTML = '';
            this.innerHTML = `<i class="fas fa-bars"></i>`;
            menu.style.display = 'none';
            menu.classList.remove('is-open');
            body.style.overflow = '';
            
        } else {
            // Aqui ele primeiro deixa em 'block' (que esta com opacidade 0)
            // depois ele adiciona 'is-open' para começar a subir a opacidade!
            this.innerHTML = '';
            this.innerHTML = `<i class="fas fa-times"></i>`;
            body.style.overflow = 'hidden';
            menu.style.display = 'block';
            setTimeout(function() {
                menu.classList.add('is-open')
            }, 1);//1ms apenas para diferenciar o display block da class is-open        
        }  
    })


    //funcao para abrir o modal de informacoes
    // esta retornando se esta aberto ou não, pode ser útil
    let infoModalIsOpen =  openCloseInfoModal();
    console.log(infoModalIsOpen);

  };
}());




//============================================
//           OPEN/CLOSE INFO MODAL
//============================================

function openCloseInfoModal () {
  let infoMordalIsOpen = false;
  const infoBtn = document.querySelectorAll('.info-toggle');
  const infoModal = document.querySelector('.info-modal');
  const infoModalContainer = document.querySelector('.info-modal-container');
  infoBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      if( infoMordalIsOpen === false) {
        body.style.overflow = 'hidden';
        infoModal.style.display = 'block';
        setTimeout( () => {
          //fundo preto
        infoModalContainer.classList.add('info-modal-container-show');
         //container de infos
        infoModal.classList.add('info-modal-open');
        infoMordalIsOpen = true;
      },1)
      } else {
        body.style.overflow = '';
        infoModal.classList.remove('info-modal-open');
        infoModalContainer.classList.remove('info-modal-container-show');
        infoMordalIsOpen = false;
        setTimeout(() => {
          infoModal.style.display = 'none';
        },300);
      }
    })

  })
  return infoMordalIsOpen;
}

//============================================
//           LOAD PAGE
//============================================

//Fecha o load-page, ele esta com z-index 10 para ficar por cima de tudo
function loadPageClose() {
  const loadPage = document.querySelector('.load-page');
  loadPage.classList.add('close-load');
  setTimeout(() => {
      loadPage.style.display = 'none'
  },800)
}



//============================================
//           HOME PAGE
//============================================

// Adiciona animação nas imagens da home page após fecha a tela de load
function addAnimationHomePage() {
        const imgContainer = document.querySelector('.img-container').children;
        imgContainer[0].classList.add('enter-right-animation');
        imgContainer[1].classList.add('enter-left-animation');
    


}



//============================================
//           ARTIST PAGE
//============================================

// Inicializa a pagina, adicionar animação do titulo da page e chamar depois as animações dos thumbs
function artistPageInit() {
  const artistContainer = document.querySelectorAll('.thumb-container');
  //thumbClick(artistContainer);
  window.onscroll = function() {
    showArtistThumb(artistContainer);
  }
  

}

// Pega o ponto que esta o window e compara com a distancia de cada elemento
function showArtistThumb(artistContainer) {
  // pega a posição do window no documento
  const currentWinPosition = window.pageYOffset + window.innerHeight * 0.75; //windo.innerheight *0.75 ver isso!
  artistContainer.forEach(element => {
    // .offsetTop é a distancia do elemento até o topo do documento.
    if (currentWinPosition > element.offsetTop) {
      element.style.display = 'block';
      element.classList.add('artist-show-up');
    }
  })
}


//============================================
//           PROFILE PAGE
//============================================

function profilePageInit() {
  sliderInit();
  showArtistPhoto();
  scrollPageAnimate();
  arrowMenuList();
}
// Faz a foto aparecer de cima quando carrega a página
function showArtistPhoto() {
  const artistPhoto = document.querySelector('.artist-photo');
  artistPhoto.classList.add('animate');
}


// essta função é chamada no scrollPageAnimate pq pelo que entendi ele não entende dois window.scroll
function showSocialLinks(currentWinPosition) {
  const socialLinks = document.querySelectorAll('[data-social]');
  const socialLinksContainer = document.querySelector('.social-media-container');;
  let links = 0;
  if (currentWinPosition > socialLinksContainer.offsetTop) {
    const interval = setInterval(() => {
      socialLinks[links].classList.add('animate');
      links++;
      if (links === socialLinks.length) {
        clearInterval(interval);
      }
    }, 200);
  }
  
}

function arrowMenuList() {
  const arrow = document.querySelector('.arrow');
  const menu = document.querySelector('[data-menu]');
  let menuIsOpen = false;

  arrow.addEventListener('click', () => {
    if (menuIsOpen === true) {
      menu.dataset.menu = 'close';
      menuIsOpen = false;
    } else {
      menu.dataset.menu = 'open';
      menuIsOpen = true;
    }
  })
}


//Função para iniciar o slider
function sliderInit() {
  $(document).ready(function(){
      $('.responsive').slick({
          autoplay: 200,
          // Corrigir as setas e estudar um pouco mais elas;
          nextArrow: '<i class="fa fa-arrow-right" style="color: white; float: right; position: absolute; top: 50%; right: 10px;"></i>',
          prevArrow: '<i class="fa fa-arrow-left" style="color: white; float: right; position: absolute; top: 50%; left: 10px; z-index: 1;"></i>',
          dots: true,
          infinite: true,
          speed: 300,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 680,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
          
      });
  });
}

//============================================
//                ABOUT PAGE
//============================================

// Adiciona a classe animate nos [data-anime]
function aboutPageInit() {
  scrollPageAnimate();
  
}



//============================================
//           FLASH DAY PAGE
//============================================

function flashPageInit() {
  scrollPageAnimate();
}

//============================================
//           LOCATION PAGE
//============================================

let map;
function initMap() {
    const styles = [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ]

    // constructor creates a new map - only center and zoom are required
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -22.890411, lng: -47.047446},
        zoom: 17,
        styles: styles
    });
    const meduzza = {lat: -22.890411, lng: -47.047446};
    const marker = new google.maps.Marker({
        position: meduzza,
        map: map,
    })
}


//============================================
//           SCROLLPAGE ANIMATE FUNCTION
//============================================

function scrollPageAnimate() {
  let bodyClass = body.getAttribute('class');
  window.onscroll = function() {
    let currentWinPosition = window.pageYOffset + window.innerHeight * 0.75;

    const target = document.querySelectorAll('[data-anime]');
    const animationClass = 'animate';

    target.forEach((element) => {
      if (currentWinPosition > element.offsetTop) {
        element.classList.add(animationClass);
      }
    })
    //verifica se esta na página de profiles
    if (bodyClass === 'profile-page') {
      showSocialLinks(currentWinPosition);
    }
    
  }
}



//============================================
//           TESTE FETCH
//============================================


  /* fetch('https://api.unsplash.com/search/photos?page=1&query=flowers', {
      headers: {
          Authorization: 'Client-ID 11d1f7aff21667d24dfd259c0df99f342d683c634c7a30d8f46277badb0a6f05'
      }
  }).then((response) => {
      console.log(response);
      return response.json();
  }).then(addImage).catch(function errorRequest(error) {
      console.log('deu merda!');
  })




  function addImage(data) {
      console.log(data);
  }
 */

