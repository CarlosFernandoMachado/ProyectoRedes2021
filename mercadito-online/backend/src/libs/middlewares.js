import express from 'express';
import cors from 'cors';
module.exports = app =>{
    app.set('port', process.env.PORT || 9000);

    //middlewares
    app.use(express.json());
    app.use(cors());
}