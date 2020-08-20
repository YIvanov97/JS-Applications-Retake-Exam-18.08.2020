import commonPartial from './partials.js';
import {setHeader} from './auth.js';
import {create, get, update, close} from '../models/shoes.js';

export function getDetails(ctx) {
    setHeader(ctx);
    const id = ctx.params.id;
    get(id)
    .then(res => {
        const shoe = {...res.data(), id: res.id};
        ctx.isOrganizer = shoe.organizer === sessionStorage.getItem('user');
        ctx.shoe = shoe;
        ctx.loadPartials(commonPartial).partial('./view/shoes/details.hbs')
    }).catch(err => console.log(err))
}

export function getCreate(ctx) {
    setHeader(ctx)
    ctx.loadPartials(commonPartial).partial('./view/shoes/create.hbs')
}

export function postCreate(ctx) {
    const {title, price, imageUrl, description, brand} = ctx.params;
    const organizer = sessionStorage.getItem('user')
    create({title, price, imageUrl, description, brand, organizer, buy: 0})
    .then(res => {
        console.log(res);
        ctx.redirect('#/home');
    }).catch(err => console.log(err));
}

export function getEdit(ctx) {
    const id = ctx.params.id;
    get(id)
    .then(res => {
        const shoe = {...res.data(), id: res.id};
        ctx.shoe = shoe;
        ctx.loadPartials(commonPartial).partial('./view/shoes/edit.hbs')
    }).catch(err => console.log(err))
}

export function postEdit(ctx) {
    const {title, price, imageUrl, description, brand} = ctx.params;
    const id = ctx.params.id;
    update(id, {title, price, imageUrl, description, brand})
    .then(res => {
        ctx.redirect(`#/details/${id}`);
    }).catch(err => console.log(err))
}

export function getClose(ctx) {  //delete
    const id = ctx.params.id;
    close(id).then( res => {
        ctx.redirect('#/home')
    }).catch(err => console.log(err))
}

export function getJoin(ctx) {
    const id = ctx.params.id;
    get(id)
    .then(res => {
        const shoe = res.data();
        const buy = shoe.buy + 1;
        update(id, {buy})
            .then( () => {
            ctx.redirect(`#/details/${id}`);
            }).catch(err => console.log(err));
    }).catch(err => console.log(err))
}