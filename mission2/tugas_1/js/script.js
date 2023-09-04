class Product {
    constructor(name, price, imageSrc) {
        this.name = name;
        this.price = price;
        this.imageSrc = imageSrc;
        this.quantity = 0;
    }

    incrementQuantity() {
        this.quantity++;
    }

    decrementQuantity() {
        if (this.quantity > 0) {
            this.quantity--;
        }
    }

    updateQuantityInCard() {
        const quantityInput = this.card.querySelector(".form-control");
        quantityInput.value = this.quantity;
    }

    createProductCard() {
        const formattedPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(this.price);

        const card = document.createElement("div");
        card.className = "col p-2";
        card.innerHTML = `
            <div class="card">
                <img src="${this.imageSrc}" class="card-img-top border border-secondary" alt="foto barang">
                <div class="card-body">
                    <h5 class="card-title">${this.name}</h5>
                    <p class="card-text"> ${formattedPrice}</p>
                    <div class="d-grid gap-2 d-md-flex input-group mb-3 justify-content-md-around">
                        <button class="btn btn-primary btn-minus" type="button" disabled >-</button>
                        <input type="text" class="form-control text-center" value="${this.quantity}" aria-label="qty" aria-describedby="button-addon2" disabled readonly>
                        <button class="btn btn-primary btn-plus" type="button">+</button>
                    </div>
                    <center>
                        <button type="button" class="btn btn-success btn-add-to-cart" disabled >Tambah barang</button>
                    </center>
                </div>
            </div>
        `;

        // Menyimpan referensi card pada objek Product
        this.card = card;

        const minusButton = card.querySelector(".btn-minus");
        const plusButton = card.querySelector(".btn-plus");
        const addButton = card.querySelector(".btn-add-to-cart");

        minusButton.addEventListener("click", () => {
            this.decrementQuantity();
            card.querySelector(".form-control").value = this.quantity;
            if (this.quantity === 0) {
                minusButton.setAttribute("disabled", true);
                addButton.setAttribute("disabled", true);
            } else {
                minusButton.removeAttribute("disabled");
                addButton.removeAttribute("disabled");
            }
        });

        plusButton.addEventListener("click", () => {
            this.incrementQuantity();
            card.querySelector(".form-control").value = this.quantity;
            if (this.quantity === 0) {
                minusButton.setAttribute("disabled", true);
                addButton.setAttribute("disabled", true);
            } else {
                minusButton.removeAttribute("disabled");
                addButton.removeAttribute("disabled");
            }

        });

        addButton.addEventListener("click", () => {
            if (this.quantity !== 0) {
                cart.addToCart(this);
                this.quantity = 0
                minusButton.setAttribute("disabled", true);
                addButton.setAttribute("disabled", true);
                card.querySelector(".form-control").value = this.quantity;
                toggleMyCartSection();
            }
        });

        return card;
    }

    // Fungsi untuk menampilkan atau menyembunyikan section "My Cart" berdasarkan keranjang
    toggleMyCartSection() {
        const myCartSection = document.getElementById("myCartSection");
        const cartList = document.getElementById("cart-list");

        if (cartList.children.length === 0) {
            // Jika keranjang kosong, sembunyikan section "My Cart"
            myCartSection.style.display = "none";
        } else {
            // Jika ada barang dalam keranjang, tampilkan section "My Cart"
            myCartSection.style.display = "block";
        }
    }

}

class Cart {
    constructor() {
        this.products = [];
        this.cartListElement = document.getElementById("cart-list");
        this.receiptElement = document.getElementById("receiptModal");
        this.counter = 1;
    }

    addToCart(product) {
        this.products.push({
            product,
            quantity : product.quantity
        });
        product.updateQuantityInCard(); // Update the quantity in the product card
        this.renderCart();
    }

    addToReceipt(product) {
        this.renderReceipt();
    }

    calculateSubtotal() {
        let subtotal = 0;
        for (const product of this.products) {
            subtotal += product.product.price * product.quantity;
        }
        return subtotal;
    }

    calculateTotal() {
        let total = 0;
        
        total = this.calculateSubtotal();
        return total;
    }

    generateFormattedNumber() {
        let currentYear = new Date().getFullYear().toString();
        let currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
        let currentDate = new Date().getDate().toString().padStart(2, '0');

        let formattedNumber = `${currentDate}.${currentMonth}.${currentYear.slice(-2)}.${this.counter.toString().padStart(4, '0')}`;
        this.counter++;

        return formattedNumber;
    }
    

    generateFormattedDateTime() {
        let currentYear = new Date().getFullYear();
        let currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
        let currentDate = new Date().getDate().toString().padStart(2, '0');
        let currentHour = new Date().getHours().toString().padStart(2, '0');
        let currentMinute = new Date().getMinutes().toString().padStart(2, '0');
    
        let formattedDateTime = `${currentDate}/${currentMonth}/${currentYear} ${currentHour}:${currentMinute}`;
        return formattedDateTime;
    }

    renderCart() {
        this.cartListElement.innerHTML = `
        <table class="table table-borderless ">
        <tbody class="text-lg-end">
          <tr>
            <th scope="row">Total Pembelian</th>
            <td id="totalPembelian"></td>
          </tr>
          <tr>
            <th scope="row">Pajak 11%</th>
            <td id="pajak"></td>
          </tr>
          <tr>
            <th scope="row">Total Bayar</th>
            <td id="totalBayar"></td>
          </tr>
        </tbody>
      </table>
        `;

        for (const product of this.products) {
            const cartItem = document.createElement("li");
            cartItem.className = "list-group-item d-flex justify-content-between align-items-start";

            const formattedPrice = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(product.product.price);

            const formattedSubtotal = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(product.product.price * product.quantity);

            cartItem.innerHTML = `
                <img src="${product.product.imageSrc}" class="card-img-top border border-secondary" alt="foto barang" style="width: 50px;">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${product.product.name}</div>
                    <div class="price d-flex justify-content-evenly">
                        <p> ${formattedPrice} x ${product.quantity}</p>
                    </div>
                </div>
                <span class="subtotal my-auto"><b> ${formattedSubtotal}</b></span>
            `;

            this.cartListElement.prepend(cartItem);
        }

        const totalPembelian = this.calculateTotal();
        const pajak = totalPembelian * 0.11;
        const totalBayar = totalPembelian + pajak;

        this.totalPembelianElement = document.getElementById("totalPembelian");
        this.pajakElement = document.getElementById("pajak");
        this.totalBayarElement = document.getElementById("totalBayar");

        const formattedTotalPembelian = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(totalPembelian);

        const formattedPajak = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(pajak);

        const formattedTotalBayar = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(totalBayar);

        this.totalPembelianElement.textContent = formattedTotalPembelian;
        this.pajakElement.textContent = formattedPajak;
        this.totalBayarElement.textContent = formattedTotalBayar;
    }

    renderReceipt() {
        this.receiptElement.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header container-sm d-flex justify-content-center ">
                    <h1 class="modal-title fs-4" id="receiptModalLabel">LupaBapak</h1>
                    <h2 class="modal-subtitle fs-5">Serra Valley, Bandung</h2>
                    <p id="phoneNumber">0851 - 2222 - 1010</p>
                    <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
                </div>
                <div class="modal-body">
                    <table class="table table-borderless" id="receiptHeader">
                        <thead>
                            <tr>
                                <th>No#</th>
                                <td id="receiptNo"></td>
                            </tr>
                            <tr>
                                <th>Tgl</th>
                                <td id="receiptDate"></td>
                            </tr>
                            <tr>
                                <th>Kasir</th>
                                <td>Admin</td>
                            </tr>
                        </thead>
                    </table>
                    <table class="table" id="receiptContent">
                        <thead>
                            <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Harga</th>
                                <th scope="col">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                    <table class="table table-borderless ">
                        <tbody class="text-lg-end">
                            <tr>
                                <th scope="row">Total Pembelian</th>
                                <td id="receiptTotalPembelian"></td>
                            </tr>
                            <tr>
                                <th scope="row">Pajak 11%</th>
                                <td id="receiptPajak"></td>
                            </tr>
                            <tr>
                                <th scope="row">Total Bayar</th>
                                <td id="receiptTotalBayar"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kembali</button>
                    <button type="button" class="btn btn-primary" id="btn-refresh">Bayar</button>
                </div>
            </div>
        </div>
        `;

        const tbodyElement = this.receiptElement.querySelector('#receiptContent tbody');

        for (const product of this.products) {
            const receiptItem = document.createElement("tr");

            const formattedPrice = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(product.product.price);

            const formattedSubtotal = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
            }).format(product.product.price * product.quantity);

            receiptItem.innerHTML = `
                <td>${product.product.name}</td>
                <td>${product.quantity}</td>
                <td>${formattedPrice}</td>
                <td>${formattedSubtotal}</td>
            `;

            tbodyElement.appendChild(receiptItem);
        }

        const totalPembelian = this.calculateTotal();
        const pajak = totalPembelian * 0.11;
        const totalBayar = totalPembelian + pajak;

        this.noStrukElement = document.getElementById("receiptNo");
        this.tanggalElement = document.getElementById("receiptDate");
        this.totalPembelianElement = document.getElementById("receiptTotalPembelian");
        this.pajakElement = document.getElementById("receiptPajak");
        this.totalBayarElement = document.getElementById("receiptTotalBayar");

        const formattedTotalPembelian = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(totalPembelian);

        const formattedPajak = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(pajak);

        const formattedTotalBayar = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(totalBayar);

        this.noStrukElement.textContent = this.generateFormattedNumber();
        this.tanggalElement.textContent = this.generateFormattedDateTime();
        this.totalPembelianElement.textContent = formattedTotalPembelian;
        this.pajakElement.textContent = formattedPajak;
        this.totalBayarElement.textContent = formattedTotalBayar;

        const checkoutButton = document.getElementById("btn-checkout");;

        checkoutButton.addEventListener("click", () => {
            cart.addToReceipt(this);
        });

        const refreshButton = document.getElementById("btn-refresh");

        refreshButton.addEventListener("click", () => {
            location.reload();
        });

    }

}


// Create product instances
const iphone13 = new Product("iPhone 13 Pro Max 512GB", 21499000, "assets/img/01-APPLE-8DVPHAPP0-APPMLLH3ID-A-GoldRevSS.jpg");
const iphone14 = new Product("iPhone 14 Pro Max 128GB", 19999000, "assets/img/01-APPLE-8DVPHAPPA-APPMQ9P3ID-A-Space Black1.jpg");
const airpodMax = new Product("Airpods Max - Sky Blue", 9499000, "assets/img/01-APPLE-846HPAPP0-APPMGYL3ID-A-SkyBlueRevSS.jpg");
const airpodsPro = new Product("Airpods Pro Gen 2", 4299000, "assets/img/01-APPLE-846EAAPP0-Airpods-Pro-2nd-Gen-White.jpg");
const macbookPro = new Product("Macbook Pro M1 16 inch 1TB", 39799000, "assets/img/01-APPLE-8DVLPAPP0-APPMK193ID-A-SpaceGrayRevSS.jpg");
const appleWatch = new Product("Apple Watch S8", 7999000, "assets/img/01-APPLE-8DVWAAPP0-APPLE-WATCH-S8-41-MID-AL-MID-SP-GPS-IND-Midnight.jpg");

// Render product cards
const productGrid = document.getElementById("product-grid");
productGrid.appendChild(iphone13.createProductCard());
productGrid.appendChild(iphone14.createProductCard());
productGrid.appendChild(airpodMax.createProductCard());
productGrid.appendChild(airpodsPro.createProductCard());
productGrid.appendChild(macbookPro.createProductCard());
productGrid.appendChild(appleWatch.createProductCard());


// Create cart instance
const cart = new Cart();

// Render the initial cart state
cart.renderCart();
cart.renderReceipt();