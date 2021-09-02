var express = require ("express")
var router = express.Router();
var request = require('request');



router.get('/:offset', function(req, res, next) {
    request({
      uri: 'http://gateway.marvel.com/v1/public/characters',
      qs: {
        ts: 1,
        apikey: "78b5dfec6c288aeeb34e2ff73255a539",
        hash: 'ab6c308a0a27bb3a1823723dc56900cb',
        limit: 6,
        offset: req.params.offset
      }
    }).pipe(res);
  });
module.exports=router