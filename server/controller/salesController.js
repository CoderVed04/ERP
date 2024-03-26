var salesDB = require('../model/sales');

var currentdate = new Date();

// create and save new sale
exports.createSale = (req,res)=>{

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

    // new sale
    const sale = new salesDB({
        orderid : req.body.orderid,
        wsname: req.body.wsname,
        type : req.body.type,
        quantity: req.body.quantity,
        price : req.body.price,
        date: datetime,
        totalprice: ((req.body.quantity)*(req.body.price))
    })

    // save sale in the database
    sale
        .save(sale)
        .then(data => {
            res.send(data)
            // res.redirect('/adminSales');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all sales/ retrive and return a single sale
exports.findSale = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        salesDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found sale with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving sale with id " + id})
            })

    }else{
        salesDB.find()
            .then(sale => {
                res.send(sale)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving sale information" })
            })
    }

    
}

// Update a new idetified sale by sale id
exports.updateSale = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    salesDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update sale with ${id}. Maybe sale not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update sale information"})
        })
}

// Delete a sale with specified sale id in the request
exports.deleteSale = (req, res)=>{
    const id = req.params.id;

    salesDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Sale was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Sale with id=" + id
            });
        });
}