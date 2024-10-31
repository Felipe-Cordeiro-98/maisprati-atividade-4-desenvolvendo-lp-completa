// configuration swiper

const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
    },

    effect: "fade",

    fadeEffect: {
        crossFade: true,
    },

    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});

// configuration AOS.js

AOS.init({
    duration: 1200,
});

// Custom javascript

// produtos

const productContainer = document.querySelector(".product-container");

fetch("https://fakestoreapi.com/products?limit=6")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erro na requisição: " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data);

        data.forEach((product) => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");

            const itemImage = document.createElement("div");
            itemImage.classList.add("item-image");

            const productImage = document.createElement("img");
            productImage.src = product.image;
            itemImage.appendChild(productImage);

            productItem.appendChild(itemImage);

            const itemInfo = document.createElement("div");
            itemInfo.classList.add("item-info");

            const productTitle = document.createElement("h3");
            productTitle.textContent = product.title;

            itemInfo.appendChild(productTitle);

            const productPrice = document.createElement("span");
            productPrice.textContent =
                "R$ " + product.price.toFixed(2).replace(".", ",");

            itemInfo.appendChild(productPrice);

            const productDescription = document.createElement("p");
            const maxCaracteres = 50; // Define o limite de caracteres

            if (product.description.length > maxCaracteres) {
                productDescription.textContent =
                    product.description.substring(0, maxCaracteres) + "...";
            }

            itemInfo.appendChild(productDescription);

            productItem.appendChild(itemInfo);
            productContainer.appendChild(productItem);
        });
    })
    .catch((error) => {
        console.error("Erro:", error);
    });

// configuration emailjs

// https://dashboard.emailjs.com/admin/account
emailjs.init({
    publicKey: "4zUSZpd1RuJ4eCXVq",
});

window.onload = function () {
    document
        .getElementById("contact-form")
        .addEventListener("submit", function (event) {
            event.preventDefault();
            // these IDs from the previous steps
            emailjs.sendForm("service_hgnhbmg", "template_kryu6ld", this).then(
                (response) => {
                    console.log(
                        "E-mail enviado com sucesso!",
                        response.status,
                        response.text
                    );
                    alert("Mensagem enviada com sucesso!");
                    this.reset(); // Reseta o formulário após o envio
                },
                (error) => {
                    console.error("Erro ao enviar o e-mail:", error);
                    alert(
                        "Ocorreu um erro ao enviar a mensagem. Tente novamente."
                    );
                }
            );
        });
};
