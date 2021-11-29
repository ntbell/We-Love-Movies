const knex = require("../db/connection");

async function list(is_showing) {
    if (Boolean(is_showing)) {
        return knex("movies_theaters as mt")
            .join("movies as m", "mt.movie_id", "m.movie_id")
            .distinct("mt.movie_id")
            .select("m.*")
            .where({ is_showing: true });
    }
    return knex("movies").select("*");
}

async function read(movie_id) {
    return knex("movies")
        .where({ movie_id })
        .select("*")
        .first();
}

async function readReviews(movie_id) {
    return knex("reviews")
        .select("*")
        .where({ movie_id });

}

async function readCritic(critic_id) {
    return knex("critics")
        .select("*")
        .where({ critic_id })
        .first();
}

async function readTheaters(movie_id) {
    return knex("theaters")
        .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
        .where({ "movies_theaters.movie_id": movie_id })
        .select("*");
}

module.exports = {
    list,
    read,
    readReviews,
    readCritic,
    readTheaters,
}