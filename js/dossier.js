//////////////////////////////////////////// Fonction "Signup"
function signup() {


    var firstName = document.getElementById('firstName').value;
    var verifFirstName = verifLengh(firstName, 2);

    if (verifFirstName === true) {
        document.getElementById('verifFirstError').innerHTML = ''
    } else {
        document.getElementById('verifFirstError').innerHTML = 'First Name must have at least 5 characters';
        document.getElementById('verifFirstError').style.color = 'red';
    }

    var lastName = document.getElementById('lastName').value;
    var verifLastName = verifLengh(lastName, 2);
    if (verifLastName === true) {
        document.getElementById('verifLastError').innerHTML = ''
    } else {
        document.getElementById('verifLastError').innerHTML = 'First Name must have at least 5 characters';
        document.getElementById('verifLastError').style.color = 'red';
    }

    var email = document.getElementById('email').value;
    var verifEmail = emailVerif(email);
    //  verif if email exists
    var verifEmailExist = searchEmailExist(email);

    if (verifEmailExist === true) {
        document.getElementById('verifEmailExistError').innerHTML = 'email already exist';
        document.getElementById('verifEmailExistError').style.color = 'red';

    } else {
        document.getElementById('verifEmailExistError').innerHTML = '';

    }
    //
    if (verifEmail === true) {
        document.getElementById('verifEmailError').innerHTML = ''
    } else {
        document.getElementById('verifEmailError').innerHTML = 'Email No Valid';
        document.getElementById('verifEmailError').style.color = 'red';
    }



    var pwd = document.getElementById('pwd').value;
    var verifPwd = verifLengh(pwd, 8);
    if (verifPwd === true) {
        document.getElementById('verifPwdError').innerHTML = ''
    } else {
        document.getElementById('verifPwdError').innerHTML = 'Password No valid';
        document.getElementById('verifPwdError').style.color = 'red';
    }


    var confirmPwd = document.getElementById('confirmPwd').value;
    if (confirmPwd === pwd) {
        document.getElementById('verifConfirmPwdError').innerHTML = ''
    } else {
        document.getElementById('verifConfirmPwdError').innerHTML = 'Confirm Password No valid';
        document.getElementById('verifConfirmPwdError').style.color = 'red';

    }

    var tel = document.getElementById('tel').value;
    /*var verifTel = verifLengh(tel,8);*/
    if (tel.length === 8) {
        document.getElementById('verifTelError').innerHTML = ''
    } else {
        document.getElementById('verifTelError').innerHTML = 'telephone No valid';
        document.getElementById('verifTelError').style.color = 'red';
    }

    if (verifFirstName && verifLastName && verifEmail && verifPwd && (confirmPwd === pwd) && (tel.length === 8) && !verifEmailExist) {
        var idUsers = JSON.parse(localStorage.getItem('idUsers') || '10')    // id :base de donnée
        var user = {                                    // Object JSON (attribut: valeur, .....) objet: {}
            // (key,value en "string") ,stockage des données
            id: idUsers,                               // id :base de donnée
            firstName: firstName,
            lastName: lastName,
            email: email,
            pwd: pwd,
            confirmPwd: confirmPwd,
            tel: tel,
            role: 'user'


        }
        var users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('idUsers', idUsers + 1);     // id :base de donnée

        //location.replace('index.html');

    }

}
//////////////////////////////////////////// Fonction "searchEmailExist"
function searchEmailExist(x) {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var usExist = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === x) {
            var usExist = true;

        }
    }
    return usExist;
}
//////////////////////////////////////////// Fonction "verification Email" (syntaxe email)
function emailVerif(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

}
//////////////////////////////////////////// Fonction "verification longueur d'une chaine" (length)
function verifLengh(ch, nb) {
    if (ch.length > nb) {
        return true;

    } else {
        return false;

    }

}
/////////////////////////////////////////////Fonction "insert Admins"
function insertAdmins() {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var admin1 = { id: 1, firstName: 'Maroua', lastName: 'Zaibi', email: 'maroua@maroua.com', pwd: 'maroua12345', tel: '95734495', role: 'admin' };
    var admin2 = { id: 2, firstName: 'Walid', lastName: 'Bentemessek', email: 'walid@walid.com', pwd: 'walid12345', tel: '29506438', role: 'admin' };
    users.push(admin1);
    users.push(admin2);

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('adminAdded', 'true');       // Pour ne pas répeter tout le temps, "les admins" dans "localStorage"

}
//////////////////////////////////////////// Fonction "login"
function login() {
    var email = document.getElementById('emailLogin').value;
    var pwd = document.getElementById('pwdLogin').value;
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var findedUser; // controle "admin"/"simple user"
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].pwd === pwd) {
            findedUser = users[i];


        }

    }
    if (findedUser.role === 'admin') {
        localStorage.setItem('connectedUser', JSON.stringify(findedUser));
        location.replace('admin.html')

    } else {
        localStorage.setItem('connectedUser', JSON.stringify(findedUser));
        location.replace('shop.html');
    }

}
//////////////////////////////////////////// Fonction "display users"
function displayUsers() {
    var users = JSON.parse(localStorage.getItem('users') || '[]');
    var usersTable = `<table class="table table-striped table-hover">
    <tr>
        <th>id (position)</th>
        <th>first Name</th>
        <th>last Name</th>
        
        <th>Email</th>
        <th>Tel</th>
        <th>Actions</th>
    </tr>`;
    for (let i = 0; i < users.length; i++) {
        var usersTable = usersTable +
            `<tr>
            <td>${users[i].id}</td>
            <td>${users[i].firstName}</td>
            <td>${users[i].lastName}</td>
            
            <td>${users[i].email}</td>
            <td>${users[i].tel}</td>
            <td>
             <button class="btn btn-danger" onclick="editUsers(${users[i].id})">Edit</button>
             <button class="btn btn-success" onclick="deleteObjects(${i},'users')">Delete</button>
         </td>
        </tr>`;

    }


    var usersTable = usersTable + `</table>`
    document.getElementById('userTable').innerHTML = usersTable;

}
/////////////////////////////////////////////Fonction "addProduct()"
function addProduct() {


    var nameProduct = document.getElementById('nameProduct').value;
    //  verif if nameProduct > 6
    var verifNameProduct = verifLengh(nameProduct, 3);
    //  verif if product exists
    var verifPrExist = searchProduct(nameProduct);
    if (verifPrExist === true) {
        document.getElementById('productNameExistError').innerHTML = 'Name Product already exist';
        document.getElementById('productNameExistError').style.color = 'red';

    } else {
        document.getElementById('productNameExistError').innerHTML = '';

    }

    if (verifNameProduct === true) {
        document.getElementById('productNameError').innerHTML = '';

    } else {
        document.getElementById('productNameError').innerHTML = 'Name Product no valid'
        document.getElementById('productNameError').style.color = 'red';

    }
    //  verification "Price"
    var price = document.getElementById('price').value;
    if (price > 0) {                // OU    var verifPrice = (price > 0)
        document.getElementById('priceError').innerHTML = '';

    } else {
        document.getElementById('priceError').innerHTML = 'Price no valid';
        document.getElementById('priceError').style.color = 'red';

    }
    //  verification "stock "

    var stock = document.getElementById('stock').value;

    if (stock > 10) {                //  OU     var verifStock = (stock > 10)
        document.getElementById('stockError').innerHTML = '';

    } else {
        document.getElementById('stockError').innerHTML = 'Stock no valid';
        document.getElementById('stockError').style.color = 'red';

    }

    var category = document.getElementById('category').value;
    var verifCategory = (category.length !== 0)
    if (verifCategory) {
        document.getElementById('categoryError').innerHTML = '';

    } else {
        document.getElementById('categoryError').innerHTML = 'Category no valid';
        document.getElementById('categoryError').style.color = 'red';

    }

    if (verifNameProduct && (price > 0) && (stock > 10) && verifCategory && !verifPrExist) {
        var idProduct = JSON.parse(localStorage.getItem('idProduct') || '1') // id :base de donnée
        var product = {
            id: idProduct,  // id :base de donnée
            nameProduct: nameProduct,
            price: price,
            stock: stock,
            category: category,

        }
        var products = JSON.parse(localStorage.getItem('products') || '[]');
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
        localStorage.setItem('idProduct', idProduct + 1);     // id :base de donnée
        //location.replace('admin.html');

    }


}
//////////////////////////////////////////// Fonction "display products"
function displayProducts() {
    var products = JSON.parse(localStorage.getItem('products'));

    var productTable = `
    <table class="table table-striped">

                                        <tr>
                                        <th>id (position)</th>
										<th>Name</th>
										<th>Price</th>
										<th>Stock</th>
										<th>Category</th>
										<th>Actions</th>
									</tr>`;
    for (let i = 0; i < products.length; i++) {

        var productTable = productTable + `									
     <tr>
             <td>${products[i].id}</td>
		     <td>${products[i].nameProduct}</td>
			 <td>${products[i].price}</td>
			 <td>${products[i].stock}</td>
			 <td>${products[i].category}</td>
                <td>
                <button class="btn btn-success" onclick="displayProductDetails(${products[i].id})">Display</button>

					<button class="btn btn-info" onclick="editProduct(${products[i].id})">Edit</button>
					<button class="btn btn-danger" onclick ="deleteObjects(${i},'products')">Delete</button>
				</td>
	</tr> `;
    }

    var productTable = productTable + `</table>`;
    document.getElementById('productTable').innerHTML = productTable;

}
//////////////////////////////////////////// Fonction "searchProduct"
function searchProduct(x) {
    var products = JSON.parse(localStorage.getItem('products') || '[]');
    var prExist = false;
    for (let i = 0; i < products.length; i++) {
        if (products[i].nameProduct === x) {
            var prExist = true;

        }
    }
    return prExist;
}
//////////////////////////////////////////// Fonction "searchEvent"
function searchEvent(x) {
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    var evExist = false;
    for (let i = 0; i < events.length; i++) {
        if (events[i].event === x) {
            var evExist = true;

        }
    }
    return evExist;
}
/////////////////////////////////////////////Fonction "display events"
function displayEvents() {
    var events = JSON.parse(localStorage.getItem('events'));

    var eventTable = `
    <table class="table table-striped">

                                        <tr>
                                        <th>id (position)</th>
										<th>Event</th>
										<th>Destination</th>
										<th>Date</th>
                                        <th>Number of participate</th>
                                        <th>Price/pr</th>
										<th>Actions</th>
									</tr>`;
    for (let i = 0; i < events.length; i++) {

        var eventTable = eventTable + `									
     <tr>
             <td>${events[i].id}</td>
		     <td>${events[i].event}</td>
			 <td>${events[i].destination}</td>
			 <td>${events[i].date}</td>
             <td>${events[i].participate}</td>
             <td>${events[i].price}</td>
                <td>
                <button class="btn btn-success" onclick="displayEventDetails(${events[i].id})">Display</button>

					<button class="btn btn-info" onclick="editEvents(${events[i].id})">Edit</button>
					<button class="btn btn-danger" onclick ="deleteObjects(${i},'events')">Delete</button>
				</td>
	</tr> `;
    }

    var eventTable = eventTable + `</table>`;
    document.getElementById('eventTable').innerHTML = eventTable;

}
/////////////////////////////////////////////Fonction "add events"
function addEvent() {


    var event = document.getElementById('event').value;

    var verifEvent = verifLengh(event, 3);

    var verifEvExist = searchEvent(event);
    if (verifEvExist === true) {
        document.getElementById('eventExistError').innerHTML = 'Event already exist';
        document.getElementById('eventExistError').style.color = 'red';

    } else {
        document.getElementById('eventExistError').innerHTML = '';

    }

    if (verifEvent === true) {
        document.getElementById('eventError').innerHTML = '';

    } else {
        document.getElementById('eventError').innerHTML = 'Event no valid'
        document.getElementById('eventError').style.color = 'red';

    }
    //  verification "Price"
    var price = document.getElementById('pricePr').value;
    if (price > 0) {                // OU    var verifPrice = (price > 0)
        document.getElementById('priceError').innerHTML = '';

    } else {
        document.getElementById('priceError').innerHTML = 'Price no valid';
        document.getElementById('priceError').style.color = 'red';

    }
    //  verification "stock "

    var participate = document.getElementById('participate').value;

    if (participate > 15) {                //  OU     var verifStock = (stock > 10)
        document.getElementById('participateError').innerHTML = '';

    } else {
        document.getElementById('participateError').innerHTML = 'Number of participate no valid';
        document.getElementById('participateError').style.color = 'red';

    }

    var destination = document.getElementById('destination').value;
    var verifDestination = (destination.length > 3)
    if (verifDestination) {
        document.getElementById('destinationError').innerHTML = '';

    } else {
        document.getElementById('destinationError').innerHTML = 'Destination no valid';
        document.getElementById('destinationError').style.color = 'red';

    }
    var date = document.getElementById('date').value;

    if (verifEvent && !verifEvExist && (price > 0) && (participate > 15) && verifDestination && date) {
        var idEvent = JSON.parse(localStorage.getItem('idEvent') || '1')
        var event = {
            id: idEvent,
            event: event,
            destination: destination,
            price: price,
            participate: participate,
            date: date,

        }
        var events = JSON.parse(localStorage.getItem('events') || '[]');
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
        localStorage.setItem('idEvent', idEvent + 1);
        //location.replace('admin.html');

    }


}
/////////////////////////////////////////////Fonction "delete generale"
function deleteObjects(x, T) {
    var objects = JSON.parse(localStorage.getItem(T) || '[]');
    objects.splice(x, 1);
    localStorage.setItem(T, JSON.stringify(objects));
    location.reload();


}
/////////////////////////////////////////////Fonction "search by id" (general)
function searchById(x, T) {
    var objects = JSON.parse(localStorage.getItem(T) || '[]');
    var obj;
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id === x) {
            obj = objects[i];

        }
    }
    return obj;

}
//////////////////////////////////////////// FONCTION "Edit" (products)
function editProduct(x) {
    var pr = searchById(x, 'products');
    var editForm = `
   
	<div class="col-md-12 form-group">
	<input type="text" class="form-control" id="priceEdit" name="name" value=${pr.price} placeholder="Price" >
            </div>
            <span id="verifPriceError1"></span>
    <div class="col-md-12 form-group">
	<input type="text" class="form-control" id="stockEdit" name="name" value=${pr.stock} placeholder="Stock" >
            </div>
            <span id="verifStockError1"></span>
    <div class="col-md-12 form-group">
	<button type="submit" value="submit" onclick="validateEdit(${pr.id})" class="primary-btn">Edit product</button>
            </div>`;
    document.getElementById('editForm').innerHTML = editForm;
}
/////////////////////////////////////////////FONCTION validation et enregistrement "Edit" ("Products")
function validateEdit(id) {

    newPrice = document.getElementById('priceEdit').value;
    // var verifEditPrice = newPrice>0
    if (newPrice > 0) {
        document.getElementById('verifPriceError1').innerHTML = '';

    } else {
        document.getElementById('verifPriceError1').innerHTML = ' Edit Price no valid';
        document.getElementById('verifPriceError1').style.color = 'red';

    }



    newstock = document.getElementById('stockEdit').value;
    // var verifEditStock = newStock>10
    if (newstock > 10) {
        document.getElementById('verifStockError1').innerHTML = '';

    } else {
        document.getElementById('verifStockError1').innerHTML = 'Edit Stock no valid';
        document.getElementById('verifStockError1').style.color = 'red';

    }

    if ((newPrice > 0) && (newstock > 10)) {

        var products = JSON.parse(localStorage.getItem('products') || '[]')
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products[i].price = newPrice;
                products[i].stock = newstock;

            }

        }
        localStorage.setItem('products', JSON.stringify(products));
        location.reload();
    }
}
/////////////////////////////////////////////FONCTION "Edit" (users)
function editUsers(x) {

    var us = searchById(x, 'users')
    var editFormUsers = `<div class="col-md-12 form-group">
    <input type="email" class="form-control" id="emailEdit" name="name" value=${us.email} placeholder="Email">
</div>


<div class="col-md-12 form-group">
    <input type="text" class="form-control" id="telEdit"  name="name" value=${us.tel} placeholder="Tel">
</div>

<div class="col-md-12 form-group"> 
	<button type="submit" value="submit" class="primary-btn" onclick="validateEditUsers(${us.id})">Edit user</button>
            </div>`;

    document.getElementById('editFormUsers').innerHTML = editFormUsers;

}
/////////////////////////// /////////////////FONCTION validation et enregistrement "Edit" (users)
function validateEditUsers(id) {
    var newEmail = document.getElementById('emailEdit').value;

    var newTel = document.getElementById('telEdit').value;

    var users = JSON.parse(localStorage.getItem('users') || '[]')
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
            users[i].email = newEmail;

            users[i].tel = newTel;


        }

    }
    localStorage.setItem('users', JSON.stringify(users));
    location.reload();
}
/////////////////////////////////////////////FONCTION "Edit" (events)
function editEvents(x) {
    var ev = searchById(x, 'events');
    var editFormEvent = `
   
	<div class="col-md-12 form-group">
	<input type="text" class="form-control" id="priceEdit1" name="name" value=${ev.price} placeholder="Price" >
            </div>
            <span id="verifPriceError1"></span>
    <div class="col-md-12 form-group">
	<input type="text" class="form-control" id="participateEdit" name="name" value=${ev.participate} placeholder="Stock" >
            </div>
            <span id="verifStockError1"></span>
    <div class="col-md-12 form-group">
	<button type="submit" value="submit" onclick="validateEditEvents(${ev.id})" class="primary-btn">Edit product</button>
            </div>`;
    document.getElementById('editFormEvent').innerHTML = editFormEvent;
}
/////////////////////////////////////////////FONCTION validation et enregistrement "Edit" (events)
function validateEditEvents(id) {
    var newPrice1 = document.getElementById('priceEdit1').value;

    var newParticipate = document.getElementById('participateEdit').value;

    var events = JSON.parse(localStorage.getItem('events') || '[]')
    for (let i = 0; i < events.length; i++) {
        if (events[i].id === id) {
            events[i].price = newPrice1;

            events[i].participate = newParticipate;


        }

    }
    localStorage.setItem('events', JSON.stringify(events));
    location.reload();
}
/////////////////////////////////////////////FONCTION : "details product"
function displayProductDetails(id) {
    localStorage.setItem('idPr', id);
    location.replace("display-Products.html");

}
/////////////////////////////////////////////FONCTION  pour l'affichage de: "details product" 
function displaySearchedProducts() {
    var idPr = localStorage.getItem('idPr');

    var searchPr = searchById(Number(idPr), 'products');
    document.getElementById('prName').innerHTML = searchPr.nameProduct;
    document.getElementById('prPrice').innerHTML = searchPr.price + 'DT';
    document.getElementById('prStock').innerHTML = searchPr.stock + 'pieces';
    document.getElementById('prCategory').innerHTML = searchPr.category;


}
/////////////////////////////////////////////FONCTION : "details event"
function displayEventDetails(id) {
    localStorage.setItem('idEv', id);
    location.replace("display-events.html");

}
/////////////////////////////////////////////FONCTION pour l'affichage de: "details event" 
function displaySearchedEvents() {
    var idEv = localStorage.getItem('idEv');

    var searchEv = searchById(Number(idEv), 'events');
    document.getElementById('evEvent').innerHTML = searchEv.event;
    document.getElementById('evDestination').innerHTML = searchEv.destination;
    document.getElementById('evPrice').innerHTML = searchEv.price + 'DT';
    document.getElementById('evParticipate').innerHTML = searchEv.participate + ' ' + 'participants';
    document.getElementById('evDate').innerHTML = searchEv.date;


}
/////////////////////////////////////////////Fontion "display shop"
function displayShop() {
    var products = JSON.parse(localStorage.getItem('products'));
    var shopTable = ``;
    for (let i = 0; i < products.length; i++) {
        var shopTable = shopTable + `
        
   
    <div class="col-lg-6 col-md-6">
                                <div class="product-item">
                                    <div class="pi-pic">
                                        <img  src="img/products/product-1.png" alt="">
                                        <div class="sale pp-sale">${products[i].nameProduct}</div>
                                        
                                       
                                        <ul>
                                            <li class="w-icon active"><a onclick="reservationShop(${products[i].id})"><i class="icon_bag_alt"></i></a></li>
                                            
                                        </ul>
                                    </div>
                                    <div class="product-details">
                                    <div class="price">
                    <h4 style="color: orange; text-align: center;">Price:${products[i].price}DT</h4>
                    <h4 style="color: orange; text-align: center;">Stock:${products[i].stock}</h4>
                    <h4 style="color: orange; text-align: center;">Category:${products[i].category}</h4>
                </div>
                </div>

                                </div>
                            </div>` }
    document.getElementById('shopId').innerHTML = shopTable;

}
/////////////////////////////////////////////Fonction "Reservation d'un produit"
function reservationShop(id) {
    localStorage.setItem('idReserveProduct', id);
    location.replace('validate-product.html');

}
//////////////////////////////////////////// Fonction "display validate shop"
function displayValidateShop() {
    var idPr = localStorage.getItem('idReserveProduct');

    var searchPr = searchById(Number(idPr), 'products');
    document.getElementById('prToReserveName').innerHTML = searchPr.nameProduct;
    document.getElementById('prToReservePrice').innerHTML = searchPr.price + 'DT';
    document.getElementById('prToReserveStock').innerHTML = searchPr.stock + ' ' + 'pièces';


}
/////////////////////////////////////////////Fonction "validate shop"
function validateShop() {
    var qty = document.getElementById('prToReserveQty').value;
    var idPr = localStorage.getItem("idReserveProduct");
    var searchedPr = searchById(Number(idPr), "products");
    if ((Number(qty) <= Number(searchedPr.stock)) && (Number(qty) > 0)) {

        var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
        var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");

        var order = {
            id: idOrder,
            qty: qty,
            idPr: idPr,
            idUser: connectedUser.id
        }
        var orders = JSON.parse(localStorage.getItem("orders") || "[]");
        orders.push(order);
        localStorage.setItem("orders", JSON.stringify(orders));
        localStorage.setItem("idOrder", idOrder + 1);

        var products = JSON.parse(localStorage.getItem("products") || "[]");
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === Number(idPr)) {
                products[i].stock = Number(products[i].stock) - Number(qty);
            }
        }
        localStorage.setItem("products", JSON.stringify(products));
        location.replace('shopping-cart.html');

    } else {
        document.getElementById('qtyError').innerHTML = 'Invalid Quantity';
        document.getElementById('qtyError').style.color = 'red';
    }
}
///////////////////////////////////////////// Fonction "display de Panier de products"
function cartShop() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser === connectedUser.id) {
            myOrders.push(orders[i]);
        }
    }
    console.log('Here my orders', myOrders);
    var orderTable = `<div class="cart-table">
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th class="p-name">Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    var sum = 0;
    for (let i = 0; i < myOrders.length; i++) {
        var pr = searchById(Number(myOrders[i].idPr), 'products');
        var totalPrPrice = Number(pr.price) * Number(myOrders[i].qty);
        sum = sum + totalPrPrice;
        orderTable = orderTable +
            `<tr>
            <td class="cart-pic"><img src="img/products/product-1.png" style="width: 200px;" alt=""></td>
            <td class="cart-title">
                <h5>${pr.nameProduct}</h5>
            </td>
            <td class="p-price">${pr.price} DT</td>
            <td class="qua-col">
                <div class="quantity">
                    <div class="pro-qty">
                        <input type="text" value= ${myOrders[i].qty}>
                    </div>
                </div>
            </td>
            <td class="total-price">${totalPrPrice}</td>
           
        
        <td>
        <button class="btn btn-danger" onclick="deleteOrder(${searchObjectPosition(myOrders[i].id, 'orders')}, ${myOrders[i].id})">Delete</button>
        <button class="btn btn-info" onclick="editOrder(${myOrders[i].id})">Edit</button>
    </td>
    </tr>`

    }
    orderTable = orderTable + `
                            </tbody>
                            </table>`
    orderTable = orderTable + `
    <div class="proceed-checkout">
    <div class="row">
                        
                        <div class="col-lg-4 offset-lg-4">
                                <ul>
                                    <li class="subtotal">Subtotal <span>${sum}DT</span></li>
                                    <li class="cart-total">Total <span>${sum}DT</span></li>
                                </ul>
                                <a href="#" class="proceed-btn">PROCEED TO CHECK OUT</a>
                            </div>
                            </div>
                              
                            </div>
                             `;

    document.getElementById('orderTable').innerHTML = orderTable;
}
/////////////////////////////////////////////
function searchObjectPosition(id, T) {
    var objects = JSON.parse(localStorage.getItem(T) || "[]");
    var index;
    for (let i = 0; i < objects.length; i++) {
        if (objects[i].id === id) {
            index = i;
        }
    }
    return index;
}
/////////////////////////////////////////////
function deleteOrder(position, id) {

    var order = searchById(Number(id), 'orders');
    var qty = order.qty;
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === Number(order.idPr)) {
            products[i].stock = products[i].stock + Number(qty);
        }
    }
    localStorage.setItem('products', JSON.stringify(products));
    deleteObjects(position, 'orders');
}
///////////////////////////////////////////////Fonction "Edit des orders"
function editOrder(x) {
    /* var orders = JSON.parse(localStorage.getItem('orders' || '[]'))*/
    var order = searchById(x, 'orders');
    var editForm = `
   
    <div class="col-md-12 form-group">
	<input type="text" class="form-control" id="editQuantity" name="name" value=${order.qty} placeholder="Stock" >
            </div>
            <span id="qtyEditError"></span>
    <div class="col-md-12 form-group">
	<button type="submit" value="submit" onclick="validateEditOrder(${order.id})" class="primary-btn">Edit order</button>
            </div>`;
    document.getElementById('editFormCommande').innerHTML = editForm;
}
/////////////////////////////////////////////
function validateEditOrder(id) {
    var newQty = document.getElementById("editQuantity").value;
    var order = searchById(id, "orders");
    var product = searchById(Number(order.idPr), "products");
    var diff = Number(newQty) - order.qty;
    if (product.stock < diff) {
        document.getElementById("qtyEditError").innerHTML = "Invalid stock";
        document.getElementById("qtyEditError").style.color = "red";
    } else {
        // update order
        var orders = JSON.parse(localStorage.getItem("orders") || "[]");
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id === id) {
                orders[i].qty = Number(newQty);
            }
        }
        localStorage.setItem("orders", JSON.stringify(orders));
        // update product stock
        var products = JSON.parse(localStorage.getItem("products") || "[]");
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === Number(order.idPr)) {
                products[i].stock = products[i].stock - Number(diff);
            }
        }
        localStorage.setItem("products", JSON.stringify(products));

        location.reload();
    }
}
///////////////////////////////////////////////Fonction "order Nbr"
function ordersNbr() {
    var orders = JSON.parse(localStorage.getItem('orders' || '[]'));
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser' || '[]'));
    var orderNbr = 0;
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser === connectedUser.id) {
            orderNbr = orderNbr + 1;   ///// ou orderNbr += 1;


        }


    }
    document.getElementById('ordersNbrHTML').innerHTML = orderNbr;

}
///////////////////////////////////////////////Fonction "Search" dans le "header" 
function searchPr(event) {
    var key = event.keyCode;
    if (key === 13) {
        localStorage.removeItem('category');
        var categoryToSearch = document.getElementById('categoryToSearch').value;
        localStorage.setItem('category', categoryToSearch);
        location.replace('category.html');

    }

}
///////////////////////////////////////////////Fonction "Search by category"
function displayProductsByCategory() {
    var products = JSON.parse(localStorage.getItem('products'));
    var category = localStorage.getItem('category');
    var searchProducts = [];
    for (let i = 0; i < products.length; i++) {
        if (products[i].category === category) {
            searchProducts.push(products[i]);
        }
    }
     
    var productTable = ``;
    for (let i = 0; i < searchProducts.length; i++) {
        // alert(JSON.stringify(searchProducts[i]))
        var productTable = productTable + `							
        <div class="col-lg-4 col-md-6">
                                <div class="product-item">
                                    <div class="pi-pic">
                                        <img src="img/products/product-1.png" alt="">
                                        <div class="sale pp-sale">${searchProducts[i].nameProduct}</div>
                                        
                                        
                                        <ul>
                                            <li class="w-icon active"><a onclick="reservationShop(${searchProducts[i].id})"><i class="icon_bag_alt"></i></a></li>
                                            
                                        </ul>
                                    </div>
                                    <div class="product-details">
                                    <div class="price">
                    <h4 style="color: orange; text-align: center;">Price:${searchProducts[i].price}DT</h4>
                    <h4 style="color: orange; text-align: center;">Stock:${searchProducts[i].stock}</h4>
                    <h4 style="color: orange; text-align: center;">Category abderrahmen:${searchProducts[i].category}</h4>
                </div>
                </div>

                                </div>
                            </div> `;
    }


    document.getElementById('category').innerHTML = productTable;

}
///////////////////////////////////////////////Fonction "Cart-hover"
function cartHover() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    var myOrders = [];
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].idUser === connectedUser.id) {
            myOrders.push(orders[i]);
        }
    }
    var cartHover = `<div class="select-items">
    <table>
    <tbody>`
    var sum = 0;
    for (let i = 0; i < myOrders.length; i++) {
        var pr = searchById(Number(myOrders[i].idPr), 'products');
        sum = sum + (Number(pr.price) * Number(myOrders[i].qty));
        var cartHover = cartHover + `
            <tr>
                <td class="si-pic"><img src="img/select-product-1.jpg" alt=""></td>
                <td class="si-text">
                    <div class="product-selected">
                        <h6>${pr.nameProduct}</h6>
                        <p>Price:${pr.price} DT</p>
                        <p>Quantity:${myOrders[i].qty}</p>
                        
                    </div>
                </td>
                <td>
                <div class="select-total">
                 <span>sum:${Number(pr.price) * Number(myOrders[i].qty)} DT</span>
                 
                 </td>
                  </div>
                
            </tr>`}
    var cartHover = cartHover + `
        </tbody>
    </table>`

    var cartHover = cartHover + `

<div class="select-button">
    <ul>
     <li class="subtotal" style="text-align: center;">TOTAL: <span>${sum}DT</span></li>
    </ul>
    <br>
    <a href="./shopping-cart.html" class="primary-btn view-card">VIEW CARD</a>
    <a href="./shop.html" class="primary-btn checkout-btn">CHECK OUT</a>
    
</div>`

    document.getElementById('cartHover').innerHTML = cartHover;
}
///////////////////////////////////////////////Fonction "events page"
function eventsPage() {
    var events = JSON.parse(localStorage.getItem('events'));
    var eventTable = ``;
    var idBtn = localStorage.getItem('idBtn') || '0';
    console.log('idBtn from LS', idBtn);
    for (let i = 0; i < events.length; i++) {
        var disabledBtn = false;

        if (idBtn === `btn${events[i].id}`) {
            console.log('btn${events[i].id}', events[i].id);
            disabledBtn = true;
        }

        if (disabledBtn) {
            // disabled='${disabledBtn}'
            var eventTable = eventTable + `
        
   
    <div class="col-lg-6 col-md-6">
                                <div class="">
                                  
                                        

                         <img  src="img/products/event-1.jpg" style="width: 200px;" alt="">
                                        
                                        
            
                                   
                                    <div class="product-details">
                    <h2 style="font-weight:bold; color:red;">${events[i].event}</h2>                
                    <h4>Price:${events[i].price}</h4>
                    <h4>Destination:${events[i].destination}</h4>
                    <h4>Date:${events[i].date}</h4>
                     
                
                </div>
                <br>
                
<div class="col-md-12 form-group">
	<button type="submit" id='btn${events[i].id}' disabled  value="submit" onclick="goToParticipate(${events[i].id});" class="btn btn-outline-danger">Participate</button>
            </div> 
                                </div>
                                
                            </div>`
        } else {
            // disabled='${disabledBtn}'
            var eventTable = eventTable + `
        
   
    <div class="col-lg-6 col-md-6">
                                <div class="">
                                  
                                        

                         <img  src="img/products/event-1.jpg" style="width: 200px;" alt="">
                                        
                                        
            
                                   
                                    <div class="product-details">
                    <h2 style="font-weight:bold; color:red;">${events[i].event}</h2>                
                    <h4>Price:${events[i].price}</h4>
                    <h4>Destination:${events[i].destination}</h4>
                    <h4>Date:${events[i].date}</h4>
                    
                
                </div>
                <br>
                
<div class="col-md-12 form-group">
	<button type="submit" id='btn${events[i].id}'   value="submit" onclick="goToParticipate(${events[i].id});" class="btn btn-outline-danger">Participate</button>
            </div> 
                                </div>
                                
                            </div>`
        }
    }

    document.getElementById('eventId').innerHTML = eventTable;


}
///////////////////////////////////////////////Fonction "go to participate"
function goToParticipate(id) {
    localStorage.setItem('idParticipate', id);
    localStorage.setItem('idBtn', `btn${id}`);
    location.replace('participation.html');

}
///////////////////////////////////////////////Fonction "display participate event"
function displayParticipateEvent() {
    var idParticipate = JSON.parse(localStorage.getItem('idParticipate'));
    var searchEv = searchById(Number(idParticipate), 'events');
    document.getElementById('eventName').innerHTML = searchEv.event;
    document.getElementById('eventDestination').innerHTML = searchEv.destination;
    document.getElementById('eventDate').innerHTML = searchEv.date


}
///////////////////////////////////////////////Fonction "validate Event"
function validateEvent() {
    var idParticipate = JSON.parse(localStorage.getItem('idParticipate'));
    var searchEv = searchById(Number(idParticipate), 'events');
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    if (searchEv) {


        var idOrderEvent = JSON.parse(localStorage.getItem("idOrderEvent") || "1");

        var orderEvent = {
            id: idOrderEvent,
            idEv: idParticipate,
            idUser: connectedUser.id,
        }
        var orders1 = JSON.parse(localStorage.getItem("orders1") || "[]");
        orders1.push(orderEvent);
        localStorage.setItem("orders1", JSON.stringify(orders1));
        localStorage.setItem("idOrderEvent", idOrderEvent + 1);

        var events = JSON.parse(localStorage.getItem("events") || "[]");
        for (let i = 0; i < events.length; i++) {
            if (events[i].id === Number(idParticipate)) {
                events[i].participate = Number(events[i].participate) - 1;
            }
        }
        localStorage.setItem("events", JSON.stringify(events));
        /*localStorage.setItem("alreadyParticipate","true");*/
        location.replace('confirm-participation.html');

    }
}
///////////////////////////////////////////////Fonction "Confirm participation"
function confirmParticipation() {
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser'));
    var orders1 = JSON.parse(localStorage.getItem("orders1") || "[]");
    var myOrders1 = [];
    for (let i = 0; i < orders1.length; i++) {
        if (orders1[i].idUser === connectedUser.id) {
            myOrders1.push(orders1[i]);
        }
    }

    var orderTableEvent = `<div class="cart-table">
    <table>
        <thead>
            <tr>
                <th>Image</th>
                <th class="p-name">Event</th>
                <th>Date</th>
                <th>Price/pr</th>
                <th>Participate</th>
                <th>Name of participate</th>
                <th>Email</th>
                <th>Telephone</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>`;

    for (let i = 0; i < myOrders1.length; i++) {
        var ev = searchById(Number(myOrders1[i].idEv), 'events');
        var us = searchById(Number(myOrders1[i].idUser), 'users');


        orderTableEvent = orderTableEvent +
            `<tr>
            <td class="cart-pic"><img src="img/cart-page/camping.png" alt=""></td>
            <td class="cart-title">
                <h5>${ev.event}</h5>
                <td>${ev.date}</td>
            </td>
            <td class="p-price">${ev.price} DT</td>
            <td>1</td>
            <td>${us.firstName + ' ' + us.lastName}</td>
            <td>${us.email}</td>
            <td>${us.tel}</td>
           
        
        <td>
        <button class="btn btn-danger" onclick="deleteOrder1(${searchObjectPosition(myOrders1[i].id, 'orders1')}, ${myOrders1[i].id})">Delete</button>
        
    </td>
    </tr>`

    }
    orderTableEvent = orderTableEvent + `
                            </tbody>
                            </table>`


    document.getElementById('orderTableEvent').innerHTML = orderTableEvent;
}
///////////////////////////////////////////////Fonction "Delete Order1"
function deleteOrder1(position, id) {

    var order1 = searchById(Number(id), 'orders1');

    var events = JSON.parse(localStorage.getItem("events") || "[]");
    for (let i = 0; i < events.length; i++) {
        if (events[i].id === Number(order1.idEv)) {
            events[i].participate = events[i].participate + 1;
        }
    }
    localStorage.setItem('events', JSON.stringify(events));
    deleteObjects(position, 'orders1');
}
////////////////////////////////////////////////Fonction "Order Nbr1"
function ordersNbr1() {
    var orders1 = JSON.parse(localStorage.getItem('orders1' || '[]'));
    var connectedUser = JSON.parse(localStorage.getItem('connectedUser' || '[]'));
    var orderNbr1 = 0;
    for (let i = 0; i < orders1.length; i++) {
        if (orders1[i].idUser === connectedUser.id) {
            orderNbr1 = orderNbr1 + 1;   ///// ou orderNbr += 1;


        }


    }
    document.getElementById('ordersNbrHTML1').innerHTML = orderNbr1;

}
////////////////////////////////////////////////Fonction "LogOut"
function logout() {
    localStorage.removeItem("connectedUser");
    location.reload();
}
////////////////////////////////////////////////Fonction "Set header"
function setHeader() {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    if (connectedUser) {

        if (connectedUser.role === 'admin') {
            var header = `<li class="active"><a href="./index.html">Home</a></li>
        <li><a href="./shop.html">Shop</a></li>
        <li><a href="./events.html">Events</a></li>
        
        <li><a href="./contact.html">Contact</a></li>
        <li><a href="./admin.html">Admin</a>
           <ul class="dropdown">
             <li><a href="./add-products.html">Add Products</a></li>
              <li><a href="./add-events.html">Add Events</a></li>
        </ul>
        </li>  
        <li><a onclick="logout()">Logout</a></li>
        <li class="nav-item"><a class="nav-link" id="connectedUserName"></a></li>`;
            document.getElementById("headerId").innerHTML = header;
            document.getElementById("connectedUserName").innerHTML =
                connectedUser.firstName + " " + connectedUser.lastName;

        } else {
            var header = `<li class="active"><a href="./index.html">Home</a></li>
        <li><a href="./shop.html">Shop</a></li>
        <li><a href="./events.html">Events</a></li>
        
        <li><a href="./contact.html">Contact</a></li>
        
        <li><a onclick="logout()">Logout</a></li>
        <li class="nav-item"><a class="nav-link" id="connectedUserName"></a></li>`;
            document.getElementById("headerId").innerHTML = header;
            document.getElementById("connectedUserName").innerHTML =
                connectedUser.firstName + " " + connectedUser.lastName;
        }

    } else {
        var header = `
  <li class="active"><a href="./index.html">Home</a></li>
  <li><a href="./shop.html">Shop</a></li>
  <li><a href="./events.html">Events</a></li>
  
  <li><a href="./contact.html">Contact</a></li>
  <li><a href="./login.html">Login</a></li>
<li class="nav-item"><a class="nav-link" href="./register.html">Register</a></li>`;
        document.getElementById("headerId").innerHTML = header;

    }


}
////////////////////////////////////////////////Fonction "disable Button"
function disableButton(btn) {
    document.getElementById(btn.id).disabled = true;
    alert("Button has been disabled.");
}

