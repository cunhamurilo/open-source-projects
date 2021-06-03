  // Access public
  exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  // Access only users logged
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  // Access only admin
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  