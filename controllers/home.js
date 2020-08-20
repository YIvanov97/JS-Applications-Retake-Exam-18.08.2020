import commonPartial from './partials.js';
import {setHeader} from './auth.js';
import {getAll} from '../models/shoes.js';

export function getHome(ctx){
    setHeader(ctx);
    getAll()
    .then (res => {
        const shoes = res.docs.map(doc => doc = {...doc.data(), id: doc.id});
        ctx.shoes = shoes;
        ctx.loadPartials(commonPartial).partial('./view/home.hbs')
    })
};