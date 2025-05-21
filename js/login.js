import api from "./api.js";

const btnEntrar = document.getElementById("abrir-login");
const btnSair = document.getElementById("btn-sair");
const modalLogin = document.getElementById("modal-login");
const cancelarLogin = document.getElementById("cancelar-login");
const formLogin = document.getElementById("form-login");
const erroLogin = document.getElementById("login-erro");
const usuarioLogado = document.getElementById("usuario-logado");

function setUsuario(usuario, refreshToken = null) {
  if (usuario) {
    localStorage.setItem("usuario", usuario);
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  } else {
    localStorage.removeItem("usuario");
    localStorage.removeItem("refreshToken");
  }
  atualizarLoginUI();
}
function getUsuario() {
  return localStorage.getItem("usuario");
}
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
function atualizarLoginUI() {
  const usuario = getUsuario();
  const linkNovaCriatura = document.getElementById("link-nova-criatura");
  const principalTipos = document.getElementById("formulario-crud-tipos");
  const btn_edit_tipos = document.getElementById("btn-edit-modal");
  const principalFormas = document.getElementById("formulario-crud-formas");
  const principalOrigens = document.getElementById("formulario-crud-origens");
  const btn_edit_elementos = document.getElementById("btn-editar-modal");
  const linkNovoElemento = document.getElementById("add_novo_elemento");
  const linkNovaLenda = document.getElementById("adicionar-lenda");
  const btn_edit_criatura = document.getElementById("botao-criatura-editar");
  const linkNovaFoto = document.getElementById("add-nova-foto");

  if (usuario) {
    usuarioLogado.textContent = usuario;
    usuarioLogado.style.display = "";
    if (btnEntrar) btnEntrar.style.display = "none";
    if (btnSair) btnSair.style.display = "";
    if (linkNovaCriatura) linkNovaCriatura.style.display = "";
    if (principalTipos) principalTipos.style.display = "";
    if (btn_edit_tipos) btn_edit_tipos.style.display = "";
    if (principalFormas) principalFormas.style.display = "";
    if (principalOrigens) principalOrigens.style.display = "";
    if (btn_edit_elementos) btn_edit_elementos.style.display = "";
    if (linkNovoElemento) linkNovoElemento.style.display = "";
    if (linkNovaLenda) linkNovaLenda.style.display = "";
    if (btn_edit_criatura) btn_edit_criatura.style.display = "";
    if (linkNovaFoto) linkNovaFoto.style.display = "";
    atualizarClasses();
  } else {
    usuarioLogado.textContent = "";
    usuarioLogado.style.display = "none";
    if (btnEntrar) btnEntrar.style.display = "";
    if (btnSair) btnSair.style.display = "none";
    if (linkNovaCriatura) linkNovaCriatura.style.display = "none";
    if (principalTipos) principalTipos.style.display = "none";
    if (btn_edit_tipos) btn_edit_tipos.style.display = "none";
    if (principalFormas) principalFormas.style.display = "none";
    if (principalOrigens) principalOrigens.style.display = "none";
    if (btn_edit_elementos) btn_edit_elementos.style.display = "none";
    if (linkNovoElemento) linkNovoElemento.style.display = "none";
    if (linkNovaLenda) linkNovaLenda.style.display = "none";
    if (btn_edit_criatura) btn_edit_criatura.style.display = "none";
    if (linkNovaFoto) linkNovaFoto.style.display = "none";
  }
}

function atualizarClasses() {
  const mainTipos = document.getElementById("main-tipos");
  const mainFormas = document.getElementById("main-formas");
  const mainOrigens = document.getElementById("main-origens");
  const principalTipos = document.getElementById("formulario-crud-tipos");
  const principalFormas = document.getElementById("formulario-crud-formas");
  const principalOrigens = document.getElementById("formulario-crud-origens");

  if (mainTipos && principalTipos) {
    if (principalTipos.style.display === "none") {
      mainTipos.classList.add("main_tipos_centralizado");
      mainTipos.classList.remove("main_tipos_lista");
    } else {
      mainTipos.classList.remove("main_tipos_centralizado");
      mainTipos.classList.add("main_tipos_lista");
    }
  }

  if (mainFormas && principalFormas) {
    if (principalFormas.style.display === "none") {
      mainFormas.classList.add("main_centralizado");
      mainFormas.classList.remove("main_formas_lista");
    } else {
      mainFormas.classList.remove("main_centralizado");
      mainFormas.classList.add("main_formas_lista");
    }
  }

  if (mainOrigens && principalOrigens) {
    if (principalOrigens.style.display === "none") {
      mainOrigens.classList.add("main_centralizado");
      mainOrigens.classList.remove("main_origens_lista");
    } else {
      mainOrigens.classList.remove("main_centralizado");
      mainOrigens.classList.add("main_origens_lista");
    }
  }
}

// Abrir/fechar modal
if (btnEntrar) {
  btnEntrar.addEventListener("click", () => {
    erroLogin.style.display = "none";
    modalLogin.classList.remove("invisivel");
    formLogin.reset();
  });
}
if (cancelarLogin) {
  cancelarLogin.addEventListener("click", () => {
    modalLogin.classList.add("invisivel");
  });
}
if (modalLogin) {
  modalLogin.addEventListener("click", (e) => {
    if (e.target === modalLogin) {
      modalLogin.classList.add("invisivel");
    }
  });
}

// Login
if (formLogin) {
  formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    erroLogin.style.display = "none";
    const usuario = document.getElementById("login-usuario").value;
    const senha = document.getElementById("login-senha").value;
    try {
      const data = await api.login({ username: usuario, password: senha });
      if (data.access && data.refresh) {
        setUsuario(usuario, data.refresh);
        modalLogin.classList.add("invisivel");
        // window.location.href = "index.html";
      } else {
        erroLogin.textContent = data.error || "Credenciais inválidas";
        erroLogin.style.display = "";
      }
    } catch {
      erroLogin.textContent = "Erro ao tentar logar. Tente novamente.";
      erroLogin.style.display = "";
    }
  });
}

// Logout
if (btnSair) {
  btnSair.addEventListener("click", async () => {
    const refresh = getRefreshToken();
    if (refresh) {
      await api.logout(refresh);
      atualizarClasses();
    }
    setUsuario(null);
    window.location.href = "index.html";
  });
}

atualizarLoginUI();
