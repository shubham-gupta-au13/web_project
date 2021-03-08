/* Express Server */
const express = require("express");
const router = express.Router();

/* Express Validator */
const { check, validationResult } = require('express-validator');

/* Middleware */
const {validUser,validEmail} = require("../middleware/validation")
const auth = require("../middleware/auth")

/* Controller */

const signupController = require("../controller/registraion")
const loginController = require("../controller/identification")
const dashboard = require("../controller/dashboard")
const passwordCategory = require("../controller/passwordCategory")
const passwordDetails = require("../controller/passwordDetails")

/* Routes */

/* Signup Get Routes */
router.get("/signup",signupController.getSignup);

/* Signup Post  Routes */
router.post("/signup",validUser,validEmail,signupController.postSignup);

/* Login  Get Routes */
router.get("/",loginController.getLogin);

/* Login Post Routes */
router.post("/",loginController.postLogin)

/* Logout Routes */
router.get("/logout",auth,loginController.logout);

/* Dashboard Routes */
router.get("/dashboard",auth, dashboard.getDashboard);

/* display-new-category Page */
router.get("/add-new-category",auth,passwordCategory.showCategory)

/* Add-new-category Post Routes */
router.post("/add-new-category",auth, [check("passwordCategory","Enter Password Category Name").isLength({min:1})],passwordCategory.addCategory)

/* View all the added password Category */
router.get("/passwordCategory",auth,passwordCategory.viewCategory);

/* Delete the added password Category */
router.get("/passwordCategory/delete/:id",auth,passwordCategory.deleteCategory);

/* Edit the added password Category */
 router.get("/passwordCategory/edit/:id",auth,passwordCategory.editCategory);

/* Update the added password Category (POST) */
 router.post("/passwordCategory/edit/:cat",auth, [check("passwordCategory","Enter Password Category Name").isLength({min:1})],passwordCategory.updateCategory);

/* display password details Page */    
router.get("/add-new-password", auth,passwordDetails.showPassword)

/*add  password details Page */ 
router.post("/add-new-password", auth, passwordDetails.addPassword)

/* view  password details page  */ 
router.get("/view-all-password", auth, passwordDetails.viewPassDetails)

/* delete password details  */
router.get("/password-detail/delete/:id", auth, passwordDetails.deletePassDetails)

/* display edit  password details Page  */
router.get("/password-detail/edit/:id", auth, passwordDetails.editPassDetails)

/*  update  password details   */
router.post("/password-detail/edit", auth, passwordDetails.updatePassDetails)

module.exports = router;

