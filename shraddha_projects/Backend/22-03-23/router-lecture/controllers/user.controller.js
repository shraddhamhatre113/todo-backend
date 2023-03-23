import { db } from "../server.js";
import createError from "http-errors";
//REGISTER
export const addUser = async (req, res, next) => {
    try {
        const newUser = {
            ...req.body,
            id: db.data.users.slice(-1)[0]?.id + 1 || 1,
        };
        //check required fields
        if (!newUser.username || !newUser.password) {
            return next(createError(400, "required fields are missed! :siren:"))
            // return res
            //     .status(400)
            //     .json({ message: "required fields are missed! :siren:" });
            // ** creating error manually **
            // const err = newError("required fields are missed! :siren:")
            // err.status = 400;
            // throw err;
        }
        //add newUser to array of users in db
        db.data.users.push(newUser);
        await db.write();
        //remove password from newUser for security
        delete newUser.password;
        res.status(200).json({
            message: "successful register! :white_tick:",
            user: newUser,
        });
    } catch (err) {
        next(err);
    }
};
/* ---------------------------------------------------------------- */
//PROFILE
export const getUser = async (req, res, next) => {
    try{
  const userid = parseInt(req.params.uid);
  //check if uid is valid
  if (isNaN(userid)) {
    return next(createError(400, "userid in url is not valid. :siren:"))
    //res.status(400).json({ message: "userid in url is not valid. :siren:" });
  }
  //find user with given uid
  const user = db.data.users.find((u) => u.id === userid);
  if (!user) {
    return next(createError(404, "There is no user with given userid. :siren:"))
  //  res
   //   .status(404)
    //  .json({ message: "There is no user with given userid. :siren:" });
  }
  res.status(200).json({ message: "user fetched! :white_tick:", user: user });
}catch(err){
    next(err)
}};
/* ---------------------------------------------------------------- */
//UPDATE PROFILE
export const updateUser = async (req, res, next) => {
    try{
  const userid = parseInt(req.params.uid);
  //check if uid is valid
  if (isNaN(userid)) {
    return next(createError(400, "userid in url is not valid. :siren:"))
   // res.status(400).json({ message: "userid in url is not valid. :siren:" });
  }
  //find user with given uid
  const userIndex = db.data.users.findIndex((u) => u.id === userid);
  if (userIndex === -1) {
    return next(createError(404,"There is no user with given userid. :siren:"))
   // res
   //   .status(404)
   //   .json({ message: "There is no user with given userid. :siren:" });
  }
  //update user
  db.data.users[userIndex] = { ...db.data.users[userIndex], ...req.body };
  await db.write();
  res
    .status(200)
    .json({ message: "successful update! :white_tick:", user: db.data.users[userIndex] });
}catch(err){
    next(err)
}};
/* ---------------------------------------------------------------- */
//DELETE PROFILE
export const deleteUser = async (req, res, next) => {
    try{
  const userid = parseInt(req.params.uid);
  //check if uid is valid
  if (isNaN(userid)) {
    return next(createError(400,"userid in url is not valid. :siren:"));
   // res.status(400).json({ message: "userid in url is not valid. :siren:" });
  }
  //find user with given uid
  const userIndex = db.data.users.findIndex((u) => u.id === userid);
  if (userIndex === -1) {
    return next(createError(404,"There is no user with given userid. :siren:" ));
     //res
     // .status(404)
     // .json({ message: "There is no user with given userid. :siren:" });
  }
  //delete user from array users
  db.data.users.splice(userIndex, 1);
  await db.write();
  res.status(200).json({ message: "User deleted! :white_tick:" });
}catch(err){
    next(err)
}};
/* ---------------------------------------------------------------- */
//LOGIN
export const login = async (req, res, next) => {
    try{
  const { username, password } = req.body;
  if (!username || !password) {
    return next(createError(400,"Please provide username and password! :siren:"));
    //res
    //  .status(400)
    //  .json({ message: "Please provide username and password! :siren:" });
  }
  const user = db.data.users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return next(createError(404,"There is no user with given credentials. :siren:"))
    //res
    //  .status(404)
    //  .json({ message: "There is no user with given credentials. :siren:" });
  }
  delete user.password;
  res.status(200).json({ message: "login success! :white_tick:", user: user });
}catch(err){
    next(err)
}};