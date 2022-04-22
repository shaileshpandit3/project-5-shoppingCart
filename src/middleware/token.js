const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization", "Bearer Token");
    if (!token)
      return res
        .status(400)
        .json({ status: false, msg: " token is not preesnt" });

    let splitToken = token.split(' ')

    let decodeToken = jwt.decode(splitToken[1], 'Group-38')
    console.log(decodeToken)
    if (!decodeToken) {
        return res.status(403).send({ status: false, message: `Invalid authentication token in request ` })
    }
    if (Date.now() > (decodeToken.exp) * 1000) {
        return res.status(404).send({ status: false, message: `Session Expired, please login again` })
    }
     let verify =  jwt.verify(splitToken[1], 'Group-38')
     console.log(verify)
    if (!verify) {
        return res.status(403).send({ status: false, message: `Invalid authentication token in request` })
    }
    req.userId = decodeToken.userId;

    next();
  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
};



module.exports={auth}