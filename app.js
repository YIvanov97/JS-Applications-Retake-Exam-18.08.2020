import {getHome} from './controllers/home.js'
import {getRegister, postRegister, getLogin, postLogin, getLogout} from './controllers/user.js'
import {getCreate, postCreate, getDetails, getEdit, postEdit, getDelete, getJoin} from './controllers/shoes.js'

const app = Sammy("main", function () {
    this.use("Handlebars", "hbs");

    this.get('#/home', getHome);

    this.get('#/register', getRegister)
    this.post('#/register', postRegister)

    this.get('#/login', getLogin)
    this.post('#/login', postLogin)

    this.get('#/logout', getLogout)

    this.get('#/details/:id', getDetails)

    this.get('#/create', getCreate)
    this.post('#/create', postCreate)

    this.get('#/edit/:id', getEdit)
    this.post('#/edit/:id', postEdit)

    this.get('#/delete/:id', getDelete)

    this.get('#/buy/:id', getJoin)

  
});
app.run('#/home');