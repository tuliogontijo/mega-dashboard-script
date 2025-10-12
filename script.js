/*****************
*  Tela de Login
*****************/
const labelEmail = "Usuário";
const labelPassword = "Senha";
const urlImageBackgroundLogin = "https://s3.129.213.96.47.nip.io/chatwoot/branding%2Ffundo.png";
const logoSize = 4; // Padrão é 4

/*****************
*  Tela de Chat
*****************/
const urlImageBackgroundChat = "https://s3.129.213.96.47.nip.io/chatwoot/branding%2Ffundo.png";
const bubbleOutgoingMessageColor = "#144d37"; // cor dos balões de mensagens enviadas


/**********************************************************************************************/

const isLoginPage = window.location.pathname.includes('/app/login');

function injectCSS(css, id) {
  const existingStyle = document.getElementById(id);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  const style = document.createElement('style');
  style.id = id;
  style.textContent = css;
  document.head.appendChild(style);
  console.log(`🎨 CSS injetado: ${id}`);
}

const tasksLogin = [
  {
    name: 'changeLabelEmail',
    selector: 'label[for="email_address"]',
    action: (elemento) => elemento.innerHTML = labelEmail,
    done: false
  },
  {
    name: 'changeLabelPassword',
    selector: 'label[for="password"]',
    action: (elemento) => elemento.innerHTML = labelPassword,
    done: false
  },
  {
    name: 'removeSSO',  
    selector: 'a[href="/app/login/sso"]',
    action: (elemento) => elemento.closest('.flex.flex-col')?.remove(),
    done: false
  },
  {
    name: 'changeBackgroundLogin',
    selector: 'main',
    action: (elemento) => elemento.style.backgroundImage = `url('${urlImageBackgroundLogin}')`, // CORRIGIDO: Adicionada sintaxe url()
    done: false
  },
  {
    name: 'changeLogoSize',
    selector: 'main > section img',
    action: (elemento) => elemento.forEach(el => el.style.setProperty('height', `${logoSize}rem`, 'important')),
    multiple: true,
    done: false
  },
];

const tasksChat = [
  // {
  //   name: 'changeBackgroundChat',
  //   selector: 'ul.conversation-panel',
  //   action: (elemento) => {
  //     elemento.style.backgroundImage = `url('${urlImageBackgroundChat}')`; // CORRIGIDO: Adicionada sintaxe url()
  //     elemento.style.backgroundSize = "contain";
  //   },
  //   done: false
  // },
  // {
  //   name: 'changeBubbleOutgoingMessageColor',
  //   selector: 'div[id^="message"].justify-end div[data-bubble-name="text"]',
  //   action: (elementos) => elementos.forEach(el => el.style.backgroundColor = bubbleOutgoingMessageColor), // CORRIGIDO: Para múltiplos elementos
  //   done: false,
  //   multiple: true // ADICIONADO: Flag para indicar múltiplos elementos
  // },
];

if (isLoginPage) {
  const loginCSS = `
    /* Estilos específicos de login podem ir aqui */
  `;
  if (loginCSS.trim()) {
    injectCSS(loginCSS, 'login-styles');
  }
  
} else {
  const chatCSS = `
    /* Background do painel de conversa */
    ul.conversation-panel {
      background-image: url('${urlImageBackgroundChat}') !important;
      background-size: contain !important;
    }
    
    /* Cor das mensagens enviadas - aplicado automaticamente */
    div[id^="message"].justify-end div[data-bubble-name="text"] {
      background-color: ${bubbleOutgoingMessageColor} !important;
    }
  `;
  
  injectCSS(chatCSS, 'chat-styles');
}

const tasks = isLoginPage ? tasksLogin : tasksChat;

const observer = new MutationObserver(() => {
  tasks.forEach(task => {
    if (!task.done) {
      if (task.multiple) {
        const elementos = document.querySelectorAll(task.selector);
        if (elementos.length > 0) {
          task.action(elementos);
          task.done = true;
        }
      } else {
        const elemento = document.querySelector(task.selector);
        if (elemento) {
          task.action(elemento);
          task.done = true;
        }
      }
    }
  });

  if (tasks.every(t => t.done)) {
    observer.disconnect();
  }
});

observer.observe(document.body, { childList: true, subtree: true });
