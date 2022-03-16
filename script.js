//Au chargement du DOM
window.onload = InitApp;

function InitApp() {
    getDataFromAPI();
}
        
function getDataFromAPI() {
    fetch('https://sdmecaflexapi.azurewebsites.net/api/Products')
        .then(response => { // => Fonction Anonyme ES6 Non compatible IE idem :  ".then(function (response) {"
            return response.json();
        })
        .then(ShowProducts).catch(function (err) {
            console.log(err);
        }); 
}

function CreateTableRow (product) {
    var render = "<tr>"
    var properties = Object.getOwnPropertyNames(product);
    var tds = properties.map(function(property) {
        if (property == "image"){
            return "<td class='align-middle'> <img width='100px' src='data:image/png;base64,"+product[property]+"'/></td>";
        }
        return "<td class='align-middle'>"+product[property]+"</td>";
    });
    render += tds.join("");
    render += "</tr>"
    return render;
} 

function CreateTableHeadRow (product){
    var render = "<tr>"
    var properties = Object.getOwnPropertyNames(product);
    var ths = properties.map(function(property){
        return "<th>"+product[property]+"</th>";
    });
    render += tds.join("");
    render += "</tr>"
    return render;
}

function GenerateRow(product) {    
    return CreateTableRow(product);          
}

function CreateTableRows(products){
    var rows = products.map(GenerateRow);
    return rows;
}

function CreateTableColumns(product){
    var columns = product.map(GenerateColumn);
    return columns;
}

function ShowProducts(products) {   
    var productsTable = document.getElementById("productsTable");
    var columns = CreateTableColumns(product);
    var rows = CreateTableRows(products);
    productsTable.innerHTML = rows.join("");
    document.getElementById("spinner").style.display = "none";
}  
