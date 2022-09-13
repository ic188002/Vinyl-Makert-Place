//User Require Models
const {Record} = require("../models/Record");
const {User} = require("../models/User");
var SpotifyWebApi = require('spotify-web-api-node');
const axios = require('axios')

// Require Moment Library
const moment = require('moment');
const { application } = require("express");

// CRUD

// CREATE
// HTTP GET - Load Record From
exports.record_create_get = (req, res) => {
    User.find()
    .then((users) => {
        if(!req.query){
            res.render("records/sell", {users})
        } else {
            let populateSell = req.query
            res.render("records/sell", {users, populateSell})
        }
    })
    .catch((err) => {
        console.log(err);
    })
}

// HTTP POST - Record
exports.record_create_post = (req, res) => {
    // Saving the data into the Database
    let record = new Record(req.body);
    record.save()
    .then(() => {
        console.log(req.body.user);
            User.findById(req.body.user, (error, user) => {
                user.record.push(record);
                user.save();
            })
        res.redirect("/records/index");
    })
    .catch((err) => {
        console.log(err);
        res.send("Please try again later!!!");
    })
}


// HTTP GET - Record Index API
exports.record_index_get = (req, res) => {
    Record.find().populate('user')
    .then(records => {
        res.render("records/index", {records: records, moment})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP GET - Record By Id
exports.record_show_get = (req, res) => {
    console.log(req.query.id);
    // Find the record by ID
    Record.findById(req.query.id).populate('user')
    .then(record => {
        res.render("records/detail", {record, moment})
    })
    .catch(err => {
        console.log(err)
    })
}

// UPDATE
// HTTP GET - Load Record Edit Form
exports.record_edit_get = (req, res) => {
    Record.findById(req.query.id)
    .then((record) => {
        res.render("records/edit", {record})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP PUT - Record Update
exports.record_update_put = (req, res) => {
    console.log(req.body.id);

    Record.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
        res.redirect("/records/index");
    })
    .catch(err => {
        console.log(err)
    })
}

// DELETE
// HTTP DELETE - Record
exports.record_delete_get = (req, res) => {
    console.log(req.query.id);

    Record.findByIdAndDelete(req.query.id)
    .then(() => {
        res.redirect("/records/index");
    })
    .catch(err => {
        console.log(err);
    })
}

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.spotifyID,
    clientSecret: process.env.spotifySecret,
    redirectUri: `http://localhost:${process.env.PORT}`
  });

spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('Your Spotify access token expires in ' + data.body['expires_in'] + ' seconds');
    //   console.log('The access token is ' + data.body['access_token']);
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
);

// HTTP POST - Record Search
exports.record_search_post = (req, res) => {
    spotifyApi.searchAlbums(req.body.search, { limit: 20, offset: req.query.offset })
    .then(function(data) {
        // console.log('Album information', data.body)
        res.render("records/search", {data})
    })
    .catch(err => {
        console.log(err);
    })
}

// HTTP POST - Record Next
exports.record_next_post = (req, res) => {
        axios.get(req.body.next, { headers: { 'Authorization': 'Bearer' + ' ' + spotifyApi._credentials.accessToken } })
        .then(response => {
              const data = response.data;
              res.render("records/page", {data});
        }).catch(err => {
              console.error(err);
        })
}

// HTTP POST - Record Next
exports.record_prev_post = (req, res) => {
    axios.get(req.body.prev, { headers: { 'Authorization': 'Bearer' + ' ' + spotifyApi._credentials.accessToken } })
    .then(response => {
          const data = response.data;
          res.render("records/page", {data});
    }).catch(err => {
          console.error(err);
    })
}