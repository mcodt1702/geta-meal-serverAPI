const AuthService = require("../Auth/authService");

function requireAuth(req, res, next) {
  const authToken = req.get("Authorization") || "";
  let basicToken;
  if (!authToken.toLowerCase().startsWith("basic ")) {
    return res.status(401).json({ error: "Missing basic token" });
  } else {
    basicToken = authToken.slice("basic ".length, authToken.length);
  }

  const [tokenUserName, tokenPassword] = AuthService.parseBasicToken(
    basicToken
  );

  if (!tokenUserName || !tokenPassword) {
    return res.status(401).json({ error: "Unauthorized request" });
  }

  AuthService.getUserWithUserNameConsumers(
    req.app.get("db"),
    loginUser.user_name
  )
    .then((dbUser) => {
      if (!dbUser)
        return res.status(400).json({
          error: "Incorrect user_name or password",
        });

      return AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      ).then((compareMatch) => {
        if (!compareMatch)
          return res.status(400).json({
            error: "Incorrect user_name or password",
          });

        res.send("ok");
      });
    })
    .catch(next);
}

module.exports = {
  requireAuth,
};
