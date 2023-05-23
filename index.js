// const { request, response } = require("express");
const express = require("express");
const uuid = require("uuid");
const port = 3001;
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());




//Query Params
// app.get("/users", (request, response) => {

//     // console.log(request.query);
//     const {name, age} = request.query;

//     return response.json({name: name, age: age});
// });

//Route Params

// app.get("/users/:id", (request, response) => {

//     const {id} = request.params;
//     //console.log(id);

//     return response.json({id});
// });



//Body Params
// app.get("/users", (request, response) => {

//     const {name, age} = request.body;
//     // console.log(request.body);

//     return response.json({name, age});
// });





const orders = [];


//Middleware

const checkOrderId = (request, response, next) => {

    const {id} = request.params;

    const index = orders.findIndex(order => order.id === id);

    if(index < 0){
        return response.status(404).json({error: "User not found!"});
    }

    request.orderIdex = index;
    request.orderId = id;

    next();
}

//Listar Usuarios

app.get("/orders", (request, response) => {

    return response.json(orders);
});


//Criar Usuarios

app.post("/orders", (request, response) => {

    const {name, order} = request.body;
    const orded = {id: uuid.v4(), name, order};
    
    orders.push(orded);

    return response.status(201).json(orded);
});


//Atualizar Usuarios

app.put("/orders/:id", checkOrderId, (request, response) => {

    const {name, order} = request.body;
    const index = request.orderIdex;
    const id = request.orderId;
    const updateOrder = {id, name, order};

    orders[index] = updateOrder;

    return response.json(updateOrder);
});

//Deletar

app.delete("/orders/:id", checkOrderId, (request,response) => {

    const index = request.orderIdex;
    orders.splice(index, 1);

    return response.status(204).json("Order deleted with success!");

});

app.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`);
});