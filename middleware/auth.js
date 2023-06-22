const { verifyAccessToken, verifyRefreshToken } = require("../utility/jwtVerifier");





// middleware to check both JWT's, one from cookie, one from headers, depending on the status of the JWT's send the error or, in case they are both valid set the user_id you get from the payload equal to the body and continue to the endpoint that is called.

const checkToken = async (req, res, next) => {


    const refreshToken = req.cookies.acp64
    const accessToken = req.header("token")


    // check if the user has both tokens

    if (!accessToken || !refreshToken) {
      res.statusMessage = "Please reauthenticate";
      return res.status(403).send("Please reauthenticate")   
    }

    // decrypt the tokens


    const { payloadAccess, expiredAccess } = await verifyAccessToken(accessToken)
    const { payloadRefresh, expiredRefresh } = await verifyRefreshToken(refreshToken)


    // For a valid access token & refreshtoken, set payload (user_id) equal to body.user

    if (payloadAccess && payloadRefresh && payloadAccess === payloadRefresh) {  // check if both refresh and accesstokens are valid and have the same user_id
      console.log('user has been set')
      req.user = payloadAccess
      return next()
    }

    // both valid tokens but different user

    if (payloadAccess && payloadRefresh && payloadAccess !== payloadRefresh) {
      console.log('tokens dont match')
      res.statusMessage = "Please reauthenticate";
      return res.status(403).send("Please reauthenticate")
    }

    // expired but valid access token

    if (expiredAccess && payloadRefresh) {
      // go to route to create new accesstoken & refreshtoken
      console.log('access expired')
      res.statusMessage = "accesstoken expired";
      return res.status(401).send("accesstoken expired")
    }

    // both expired
    if (expiredAccess && expiredRefresh) {
      console.log('both expired')
      res.statusMessage = "Please reauthenticate";
      return res.status(403).send("Please reauthenticate")
    }

    // refreshtoken expired
    if (payloadAccess && expiredRefresh) {
      console.log('refresh expired')
      res.statusMessage = "Please reauthenticate";
      return res.status(403).send("Please reauthenticate")
    } else {
      res.statusMessage = "Please reauthenticate";
      return res.status(403).send("Please reauthenticate")
    }
  }

  module.exports = { checkToken }