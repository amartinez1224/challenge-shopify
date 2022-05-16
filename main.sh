#!/bin/sh
npm install --prefix back/ &
npm install --prefix front/ &
wait
npm start --prefix back/ &
npm start --prefix front/ &