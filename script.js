/*
  CONFIGURAÇÃO RÁPIDA:
  1. Troque SEU_NUMERO_WHATSAPP pelo número da loja com DDI + DDD.
     Exemplo: 5541999999999
  2. Troque os links do Instagram/Facebook no index.html.
*/

const WHATSAPP_NUMBER = "SEU_NUMERO_WHATSAPP";

function whatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function openWhatsApp(message) {
  if (WHATSAPP_NUMBER === "SEU_NUMERO_WHATSAPP") {
    alert("Antes de publicar, troque SEU_NUMERO_WHATSAPP pelo WhatsApp da loja no arquivo script.js.");
    return;
  }
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}

// Botões de produtos e combos: cada item gera uma mensagem personalizada.
document.querySelectorAll(".order-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    openWhatsApp(`Olá! 😍 Quero pedir:\n\n${product}\n\nPode me passar as opções de pagamento e entrega?`);
  });
});

// Montador de açaí.
const totalPrice = document.getElementById("total-price");
const extras = [...document.querySelectorAll(".extra-option input")];
const base = document.querySelector('input[name="base"]:checked');
const builderButton = document.getElementById("builder-whatsapp");

function updateBuilder() {
  const baseInput = document.querySelector('input[name="base"]:checked');
  let total = Number(baseInput.dataset.price);

  extras.forEach((extra) => {
    if (extra.checked) total += Number(extra.dataset.price);
  });

  totalPrice.textContent = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

extras.forEach((extra) => extra.addEventListener("change", updateBuilder));
document.querySelectorAll('input[name="base"]').forEach((input) => {
  input.addEventListener("change", updateBuilder);
});

builderButton.addEventListener("click", () => {
  const baseInput = document.querySelector('input[name="base"]:checked');
  const selectedExtras = extras.filter((extra) => extra.checked).map((extra) => extra.value);
  let total = Number(baseInput.dataset.price) + selectedExtras.length * 5.5;

  const extrasText = selectedExtras.length
    ? selectedExtras.map(item => `• ${item}`).join("\n")
    : "• Nenhum adicional";

  const message =
`Olá! 😍 Quero montar meu açaí!

🥤 Base: ${baseInput.value}
✨ Adicionais:
${extrasText}

💰 Total: ${total.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}

Pode me passar as opções de pagamento e entrega?`;

  openWhatsApp(message);
});

// Botões principais de WhatsApp.
document.querySelectorAll(".whatsapp-main").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (WHATSAPP_NUMBER === "SEU_NUMERO_WHATSAPP") {
      event.preventDefault();
      alert("Antes de publicar, troque SEU_NUMERO_WHATSAPP pelo WhatsApp da loja no arquivo script.js.");
      return;
    }

    link.href = whatsappUrl("Olá! 😍 Quero pedir um açaí. Pode me enviar o cardápio e as opções disponíveis?");
  });
});

// Menu mobile.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Animações no scroll.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Ano automático.
document.getElementById("year").textContent = new Date().getFullYear();

// Pequeno feedback visual no montador.
document.querySelectorAll(".extra-option").forEach((option) => {
  option.addEventListener("click", () => {
    setTimeout(updateBuilder, 0);
  });
});

updateBuilder();
