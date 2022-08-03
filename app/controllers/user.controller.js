const db = require('../config');
const User = db.user;
function validateName(name)
{
    var nameRegex = /^[a-zA-Z\-]+$/;
    var validfirstUsername  =name.match(nameRegex);
    if(validfirstUsername  == null){
        console.log("Your first name is not valid. Only characters A-Z, a-z and '-' are  acceptable.");
        return false;
}
else
{
    console.log("Your first name is  valid");

    return true;
}
}
function validateAge(age)
{
    const ag=age.parseInt();
    if(ag>20)
    console.log("correcte");
    else
    console.log("incorrecte");
}
function validatemail(email)
{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var mailvalid= email.match(mailformat)
    if(mailvalid == null)
    {
        console.log("mail malformated values missing @ or misplaced characters");
        return false;
    }
    else
    {
        console.log("valid email ");
        return true;
    }
}



exports.create=(req,res) =>
{
    if(!req.body.name)
    {
        res.status(400).send({message:"nom obligatoire"});
        return;
    }
   else if( !validateName(req.body.name))
    {
        res.status(400).send({message:"nom doit être uniquement des caractéres!"});
        return;
    }
   
   else if(!validatemail(req.body.email))
    {
        res.status(400).send({message:"le mail doit être valide!"});
        return;
    }
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age


    });
    user
    .save(user)
    .then((data)=>{
        res.send(data);
    }
    )
    .catch((err) => 
    res.status(500).send({
        message: err.message || "error while adding",
    }))
};
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name
      ? { name: { $regex: new RegExp(name), $options: "i" } }
      : {};
    User.find(condition)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving users.",
        });
      });
  };
  exports.findOne = (req, res) => { const id = req.params.id; 
    User.findById(id) 
    .then(data => { 
      if (!data)
      res.status(404).send({ message: "Not found users with id " + id }); 
      else 
      res.send(data); 
    }) .catch(err => { res .status(500) .send({ message: "Error retrieving users with id=" + id }); 
  }); 
  };
  exports.update = (req, res) => { 
    if (!req.body) { 
      return res.status(400).send({ message: "Data to update can not be empty!" }); 
    } 
    const id = req.params.id; 
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false }) 
    .then(data => { 
      if (!data) { 
    res.status(404).send({ 
    message: `Cannot update users with id=${id}. Maybe users was not found!`}
    );
   } 
   else res.send({ 
    message: "users was updated successfully." }); 
  }) 
  .catch(err => { 
    res.status(500).send({ message: "Error updating users with id=" + id });
  }); 
  };
  exports.delete = (req, res) => { 
    const id = req.params.id; 
    User.findByIdAndRemove(id) 
    .then(data => { if (!data) 
    { 
    res.status(404).send({ 
    message: `Cannot delete User with id=${id}. Maybe User was not found!`}); 
    } 
    else 
    { 
      res.send({ message: "User was deleted successfully!" }); 
    } 
  }) 
  .catch(err => { 
    res.status(500).send({ 
      message: "Could not delete User with id=" + id }); 
    }); 
  };
  exports.deleteAll = (req, res) => { 
    User.deleteMany({}) 
    .then(data => { 
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!` }); 
      }) 
      .catch(err => { 
        res.status(500).send({ 
      message: err.message || "Some error occurred while removing all Users."}); 
    }); 
  };
  