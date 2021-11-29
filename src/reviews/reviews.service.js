const knex = require("../db/connection");

async function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first();
}

async function update(newReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: newReview.review_id })
        .update(newReview)
        .then((data) => data[0]);
}

async function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

async function readCritic(critic_id) {
    return knex("critics")
        .select("*")
        .where({ critic_id })
        .first();
}

module.exports = {
    read,
    update,
    delete: destroy,
    readCritic,
}