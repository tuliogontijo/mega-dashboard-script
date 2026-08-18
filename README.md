# Mega Dashboard Script - Personalização do Chatwoot

Este repositório contém um script para personalizar a tela de login e o dashboard do Chatwoot/Mega com estilos, traduções automáticas e ajustes de usabilidade.

## Funcionalidades

- Personalização da tela de login: labels, tamanho da logo e plano de fundo por tema
- Personalização do dashboard: plano de fundo por tema e cores dos balões (entrada/saída)
- Troca do favicon (vale para a tela de login e para o dashboard)
- Renomeação da aba do Kanban e opção de esconder os "Aplicativos do painel"
- Tradução automática de datas e horários para PT-BR
- Ajuste de foco no input de mensagem em dispositivos mobile
- Loader nos áudios enquanto o arquivo ainda não está pronto para tocar
- Exibição das barras de rolagem nos menus de navegação
- Correção do clique fora do menu sanduíche no mobile, que acionava o botão embaixo do menu
- Recolhimento automático do menu lateral no mobile ao escolher uma opção
- Aplicação dinâmica em SPA via MutationObserver

## Instalação

### 1. Copie o script

1. Acesse [script.html](https://github.com/tuliogontijo/mega-dashboard-script/blob/main/script.html)
2. Copie todo o conteúdo do arquivo

### 2. Abra o Super Admin do Mega

1. Entre no Super Admin
2. No painel lateral esquerdo, acesse Dashboard Scripts
3. Inclua um novo

### 3. Cole no campo Dashboard Scripts

1. Cole o conteúdo do script no campo Content
2. Escolha um nome
3. Salve as alterações

### 4. Ajuste as configurações do script

Altere as variáveis no início do script conforme sua necessidade:

```javascript
/*****************
*  Tela de Login
*****************/
const labelEmail = "Usuário";
const labelPassword = "Senha";
const backgroundLogin = {
  keepStandard: true,
  light: "INSIRA A URL DA IMAGEM DE FUNDO PARA O TEMA CLARO",
  dark: "INSIRA A URL DA IMAGEM DE FUNDO PARA O TEMA ESCURO"
};
const logoSize = 10; // Padrão é 4

/*****************
*  Dashboard
*****************/
const labelKanban = "";
const hideDashboardApps = false;
const translateMessageTimeToPTBR = true;
const removeAutoFocusChatInputAtMobile = true;
const showAudioLoaderUntilReady = true;
const audioLoaderMaxWait = 10000;
const audioLoadErrorMessage = "Não foi possível carregar este áudio";
const showNavScrollbars = false;
const fixMobileSidebarClickThrough = true;
const closeMobileSidebarOnNavigate = true;
const favicon = {
  change: false,
  href: "INSIRA A URL DO NOVO FAVICON"
};
const backgroundChat = {
  keepStandard: true,
  light: "INSIRA A URL DA IMAGEM DE FUNDO PARA O TEMA CLARO",
  dark: "INSIRA A URL DA IMAGEM DE FUNDO PARA O TEMA ESCURO"
};
const bublleMessageColor = {
  keepStandard: false,
  outgoing: {
    light: "#d9fdd3",
    dark: "#144d37"
  },
  incoming: {
    light: "#ffffff",
    dark: "#242626"
  }
};
```

## Como usar as opções

- `backgroundLogin.keepStandard`: `true` mantém o fundo padrão na tela de login; `false` aplica a imagem configurada
- `backgroundChat.keepStandard`: `true` mantém o fundo padrão no dashboard; `false` aplica a imagem configurada
- `bublleMessageColor.keepStandard`: `true` mantém as cores padrão dos balões; `false` aplica as cores definidas em `outgoing` e `incoming`
- `logoSize`: altura da logo em `rem`
- `favicon.change`: `true` troca o favicon pelo endereço em `favicon.href`; `false` mantém o padrão
- `labelKanban`: novo nome da aba do Kanban. Deixe vazio (`""`) para manter "Kanban"
- `hideDashboardApps`: `true` esconde o item "Aplicativos do painel" no menu lateral
- `translateMessageTimeToPTBR`: `true` traduz datas, horários e tooltips para o PT-BR
- `removeAutoFocusChatInputAtMobile`: `true` impede que o teclado abra sozinho ao entrar numa conversa no celular
- `showAudioLoaderUntilReady`: `true` mostra um loader no lugar do botão de play enquanto o áudio ainda está carregando
- `audioLoaderMaxWait`: tempo máximo, em milissegundos, que o loader fica girando antes de devolver o botão de play normal
- `audioLoadErrorMessage`: aviso mostrado na bolha quando o áudio não carrega. Deixe vazio (`""`) para não mostrar aviso nenhum
- `showNavScrollbars`: `true` exibe as barras de rolagem dos menus de navegação (o Chatwoot as esconde por padrão)
- `fixMobileSidebarClickThrough`: `true` faz o clique fora do menu sanduíche mobile apenas fechar o menu, sem acionar o botão que está embaixo
- `closeMobileSidebarOnNavigate`: `true` recolhe o menu lateral no mobile assim que você escolhe uma opção; itens com subitens continuam mantendo o menu aberto, para dar acesso ao submenu

### Sobre o clique fora do menu mobile

No celular, o menu sanduíche abre por cima do conteúdo sem nenhum fundo bloqueando a tela. Tocar
fora fecha o menu, mas o toque também chega ao botão que estava embaixo e executa a ação dele — o
usuário fecha o menu e acaba abrindo outra coisa. Com `fixMobileSidebarClickThrough` ativo, um
fundo transparente cobre a tela enquanto o menu está aberto: o toque para nesse fundo e só fecha o
menu. Para escurecer o conteúdo atrás do menu, troque o `background: transparent` da regra por algo
como `rgba(0, 0, 0, 0.4)`.

### Sobre o loader dos áudios

O Chatwoot exibe o botão de play antes de o arquivo de áudio ficar disponível. O usuário clica,
não ouve nada e acha que está quebrado. Com `showAudioLoaderUntilReady` ativo, o botão vira um
loader e fica bloqueado até o áudio estar pronto para tocar.

Quando o áudio **não consegue** carregar — formato que o aparelho não decodifica (arquivos `.ogg`
no iPhone, por exemplo) ou arquivo indisponível —, o app limpa o endereço do áudio, tenta de novo
algumas vezes e desiste. Nesse caso o loader não tem como terminar sozinho, então ele desiste junto
depois de `audioLoaderMaxWait`, devolve o botão de play normal e mostra o aviso de
`audioLoadErrorMessage` embaixo do player. Aumente o tempo se a sua equipe usa conexões lentas e o
loader estiver sumindo cedo demais.

## Traduções automáticas

- Separadores de data: `13 October 2025 14:15` -> `13 de Outubro de 2025, 14:15`
- Horários de mensagens: `Oct 13, 11:15 PM` -> `13 Out, 23:15`
- Tooltips de tempo em popovers/poppers

## Notas importantes

- O script funciona na tela de login e no dashboard
- As alterações são aplicadas automaticamente após salvar
- Compatível com instalações self-hosted do Chatwoot/Mega
