var moldDB = require('../model/molding');

var currentdate = new Date();

exports.createMold = (req, res)=>{
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

    // new mold
    const mold = new moldDB({
        orderid : req.body.orderid,
        mname: req.body.mname,
        gquantity: req.body.gquantity, //given quantity
        tquantity: req.body.tquantity, //taken quantity
        cost: req.body.cost,           //cost per unit
        date: datetime,
        totalCost: ((req.body.gquantity) * (req.body.cost)),
        wastage: ((req.body.gquantity) - (req.body.tquantity))
    })

    // save mold in the database
    mold
        .save(mold)
        .then(data => {
            res.send(data)
            // res.redirect('/adminMold');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });
}

// retrieve and return all mold/ retrive and return a single mold
exports.findMold = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        moldDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found mold with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving mold with id " + id})
            })

    }else{
        moldDB.find()
            .then(mold => {
                res.send(mold)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving mold information" })
            })
    }

    
}

// Update a new idetified mold by mold id
exports.updateMold = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    moldDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update mold with ${id}. Maybe mold not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update mold information"})
        })
}

// Delete a mold with specified mold id in the request
exports.deleteMold = (req, res)=>{
    const id = req.params.id;

    moldDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Mold was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete Mold with id=" + id
            });
        });
}