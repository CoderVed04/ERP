var purchaseDB = require('../model/purchase');

var currentdate = new Date();

// create and save new purchase
exports.createPurchase = (req,res)=>{

    var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new purchase
    const purchase = new purchaseDB({
        orderid : req.body.orderid,
        type : req.body.type,
        sellername: req.body.sellername,
        quantity: req.body.quantity,
        price : req.body.price,
        date: datetime,
        totalcost: ((req.body.quantity) * (req.body.price)),
    })

    // save purchase in the database
    purchase
        .save(purchase)
        .then(data => {
            res.send(data)
            // res.redirect('/adminPurchase');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all purchases/ retrive and return a single purchase
exports.findPurchase = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        purchaseDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found purchase with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving purchase with id " + id})
            })

    }else{
        purchaseDB.find()
            .then(purchase => {
                res.send(purchase)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving purchase information" })
            })
    }

    
}

// Update a new idetified purchase by purchase id
exports.updatePurchase = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    purchaseDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update purchase with ${id}. Maybe purchase not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update purchase information"})
        })
}

// Delete a purchase with specified purchase id in the request
exports.deletePurchase = (req, res)=>{
    const id = req.params.id;

    purchaseDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Purchase was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Purchase with id=" + id
            });
        });
}