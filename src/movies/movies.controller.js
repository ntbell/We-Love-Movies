const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function idExists(req, res, next) {
    const movie_id = req.params.movieId;
    const movie = await service.read(movie_id);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: "Movie cannot be found." });
}

async function read(req, res) {
    res.json({ data: res.locals.movie });
}

async function readReviews(req, res) {
    const reviews = await service.readReviews(res.locals.movie.movie_id);
    for (let review of reviews) {
        review["critic"] = await service.readCritic(review.critic_id);
    }
    res.json({ data: reviews });
}

async function readTheaters(req, res) {
    res.json({ data: await service.readTheaters(res.locals.movie.movie_id) });
}

async function list(req, res) {
    const { is_showing = false } = req.query;
    res.json({ data: await service.list(is_showing) })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(idExists), asyncErrorBoundary(read)],
    readReviews: [asyncErrorBoundary(idExists), asyncErrorBoundary(readReviews)],
    readTheaters: [asyncErrorBoundary(idExists), asyncErrorBoundary(readTheaters)],
}