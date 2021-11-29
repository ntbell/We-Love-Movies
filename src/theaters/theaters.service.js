const knex = require("../db/connection");

async function list() {
    return knex("theaters").select("*");
}

async function listMovies(theater_id) {
    return knex("movies_theaters as mt")
        .join("movies as m", "m.movie_id", "mt.movie_id")
        .where({ theater_id })
        .select("m.*", "mt.is_showing", "mt.theater_id");
}

module.exports = {
    list,
    listMovies,
}