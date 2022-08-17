// const { authenticate } = require('passport')

// const localStrategy = require('passport-local').Strategy
// function initialize(passport){
//     const authenticateUser = (email, password, done)=> {
//         const user = getUserByEmail(email)
//         if(user == null){
//             return done(null, false, {message:"No user"})
//         }
//         try{
//                 if(await bcrypt.compare(password, user.password))
//                 {
//                     return done(null, user)
//                 }
//                 else{
//                     return done(null, false, {message:"Password doesn't match"})
//                 }
//         }catch(err){
//             return done(err)
//         }
//     }
    
//     passport.use(new localStrategy({
//         usernameField:'email'
//     }),
//     authenticateUser
//     )
//     passport.serialzeUser((user, done) => {})
//     passport.deserialzeUser((id, done) => {})
// }
//  module.exports = initialize