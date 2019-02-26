import passport from "passport-jwt";
import { passportSecretKey } from "./keys";
import User from "../models/User";

const ExtractJwt = passport.ExtractJwt;
const Strategy = passport.Strategy;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = passportSecretKey;

export default passport => {
  passport.use(
    new Strategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.error(err));
    })
  );
};
